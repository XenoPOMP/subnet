'use client';

import { v4 as uuid } from 'uuid';

import { compressJson } from '@/utils/compression';
import { createStorageKey } from '@/utils/misc';
import { createPersistentStore } from '@/zustand/utils';

import type { NetworkSnapshot } from './useNetworkStore';
import { useNetworkStore } from './useNetworkStore';

export const DEFAULT_PROJECT_EMOJI = '🌐';

export interface Project {
  id: string;
  /** Empty string means that project is untitled (UI shows localized name). */
  name: string;
  emoji: string;
  description: string;
  updatedAt: number;
  snapshot: NetworkSnapshot;
}

export type ProjectInfo = Pick<Project, 'name' | 'emoji' | 'description'>;

interface ProjectsStore {
  projects: Project[];
  activeId: string;

  /** Writes current network working state into active project. */
  saveActive: () => void;
  /** Creates empty project and makes it active. Returns its id. */
  createProject: () => string;
  /** Saves active project, then loads another one into working state. */
  switchProject: (id: string) => void;
  updateProject: (id: string, info: Partial<ProjectInfo>) => void;
  deleteProject: (id: string) => void;
  /** Loads active project into network store (call after hydration). */
  loadActive: () => void;
}

// eslint-disable-next-line jsdoc/require-jsdoc
const emptySnapshot = (): NetworkSnapshot => ({
  root: compressJson(null),
  subnets: compressJson([]),
  form: { root: { input: '' } },
});

// eslint-disable-next-line jsdoc/require-jsdoc
const createEmptyProject = (): Project => ({
  id: uuid(),
  name: '',
  emoji: DEFAULT_PROJECT_EMOJI,
  description: '',
  updatedAt: Date.now(),
  snapshot: emptySnapshot(),
});

const initialProject = createEmptyProject();

export const useProjectsStore = createPersistentStore<ProjectsStore>(
  (set, get) => ({
    projects: [initialProject],
    activeId: initialProject.id,

    // eslint-disable-next-line jsdoc/require-jsdoc
    saveActive() {
      const snapshot = useNetworkStore.getState().getSnapshot();

      set(state => ({
        projects: state.projects.map(project =>
          project.id === state.activeId
            ? { ...project, snapshot, updatedAt: Date.now() }
            : project,
        ),
      }));
    },

    // eslint-disable-next-line jsdoc/require-jsdoc
    createProject() {
      get().saveActive();

      const project = createEmptyProject();
      set(state => ({
        projects: [...state.projects, project],
        activeId: project.id,
      }));
      useNetworkStore.getState().loadSnapshot(project.snapshot);

      return project.id;
    },

    // eslint-disable-next-line jsdoc/require-jsdoc
    switchProject(id) {
      if (id === get().activeId) return;

      const target = get().projects.find(project => project.id === id);
      if (!target) return;

      get().saveActive();
      set({ activeId: id });
      useNetworkStore.getState().loadSnapshot(target.snapshot);
    },

    // eslint-disable-next-line jsdoc/require-jsdoc
    updateProject(id, info) {
      set(state => ({
        projects: state.projects.map(project =>
          project.id === id ? { ...project, ...info } : project,
        ),
      }));
    },

    // eslint-disable-next-line jsdoc/require-jsdoc
    deleteProject(id) {
      const { projects, activeId } = get();
      const index = projects.findIndex(project => project.id === id);
      if (index === -1) return;

      const rest = projects.filter(project => project.id !== id);

      // There is always at least one project.
      if (rest.length === 0) {
        const fresh = createEmptyProject();
        set({ projects: [fresh], activeId: fresh.id });
        useNetworkStore.getState().loadSnapshot(fresh.snapshot);
        return;
      }

      if (id !== activeId) {
        set({ projects: rest });
        return;
      }

      // Deleting active project: fall back to its neighbour.
      const next = rest[Math.min(index, rest.length - 1)]!;
      set({ projects: rest, activeId: next.id });
      useNetworkStore.getState().loadSnapshot(next.snapshot);
    },

    // eslint-disable-next-line jsdoc/require-jsdoc
    loadActive() {
      const { projects, activeId } = get();
      const active = projects.find(project => project.id === activeId);

      // Stored data may be corrupted: fall back to the first project.
      if (!active) {
        const [first] = projects;
        if (!first) return;
        set({ activeId: first.id });
        useNetworkStore.getState().loadSnapshot(first.snapshot);
        return;
      }

      useNetworkStore.getState().loadSnapshot(active.snapshot);
    },
  }),
  {
    name: createStorageKey('projects'),
    // eslint-disable-next-line jsdoc/require-jsdoc
    partialize: state =>
      ({
        projects: state.projects,
        activeId: state.activeId,
      }) as ProjectsStore,
  },
);
