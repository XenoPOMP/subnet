'use client';

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import cn from 'classnames';
import { ChevronDown, Pencil, Plus, Trash2 } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';

import { For } from '@/components/layout';
import { Button } from '@/components/ui/kit';
import { useTranslations } from '@/i18n';
import { useProjectsBootstrap, useProjectsStore } from '@/zustand';

import { ProjectDialog } from './ProjectDialog';

/**
 * Header control for switching between saved network maps (projects).
 * Also mounts persistence of projects.
 */
export const ProjectSwitcher: FC = () => {
  const { t } = useTranslations();
  useProjectsBootstrap();

  const {
    projects,
    activeId,
    createProject,
    switchProject,
    updateProject,
    deleteProject,
  } = useProjectsStore();
  const [editingId, setEditingId] = useState<string | null>(null);

  const active = projects.find(project => project.id === activeId);
  const editing = projects.find(project => project.id === editingId) ?? null;

  return (
    <>
      <Popover className={cn('relative')}>
        <PopoverButton
          as={Button}
          aria-label={t.projects.heading}
          className={cn('max-w-[28rem]')}
        >
          <span aria-hidden>{active?.emoji}</span>
          <span className={cn('truncate')}>
            {active?.name || t.projects.untitled}
          </span>
          <ChevronDown size='1.6rem' />
        </PopoverButton>

        <PopoverPanel
          anchor='bottom end'
          className={cn(
            'z-40 mt-[0.8rem] w-[34rem] max-w-[calc(100vw-3.2rem)]',
            'border-[1px] border-divider bg-primary-bg',
          )}
        >
          {({ close }) => (
            <div className={cn('flex flex-col')}>
              <ul className={cn('max-h-[40rem] overflow-y-auto')}>
                <For each={projects}>
                  {project => (
                    <li
                      key={project.id}
                      className={cn(
                        'flex items-center gap-[0.8rem] p-[0.8rem]',
                        'border-b-[1px] border-b-divider',
                        {
                          'bg-input-bg': project.id === activeId,
                        },
                      )}
                    >
                      <button
                        type='button'
                        className={cn(
                          'flex min-w-0 flex-1 items-center gap-[1.2rem]',
                          'p-[0.4rem] text-left',
                        )}
                        aria-current={project.id === activeId}
                        onClick={() => {
                          switchProject(project.id);
                          close();
                        }}
                      >
                        <span className={cn('text-[2.4rem]')}>
                          {project.emoji}
                        </span>
                        <span className={cn('flex min-w-0 flex-col')}>
                          <span className={cn('truncate text-[1.6rem]')}>
                            {project.name || t.projects.untitled}
                          </span>
                          <span
                            className={cn(
                              'truncate text-[1.4rem] text-shallow',
                            )}
                          >
                            {project.description || t.projects.noDescription}
                          </span>
                        </span>
                      </button>

                      <Button
                        square
                        leadingIcon={Pencil}
                        aria-label={t.projects.edit}
                        onClick={() => {
                          setEditingId(project.id);
                          close();
                        }}
                      />
                      <Button
                        square
                        variant='danger'
                        leadingIcon={Trash2}
                        aria-label={t.projects.delete}
                        onClick={() => {
                          // eslint-disable-next-line no-alert
                          if (window.confirm(t.projects.deleteConfirm)) {
                            deleteProject(project.id);
                          }
                        }}
                      />
                    </li>
                  )}
                </For>
              </ul>

              <div className={cn('p-[0.8rem]')}>
                <Button
                  leadingIcon={Plus}
                  className={cn('w-full')}
                  onClick={() => {
                    // Let user name the project right away.
                    setEditingId(createProject());
                    close();
                  }}
                >
                  {t.projects.newProject}
                </Button>
              </div>
            </div>
          )}
        </PopoverPanel>
      </Popover>

      <ProjectDialog
        project={editing}
        onClose={() => setEditingId(null)}
        onSave={updateProject}
      />
    </>
  );
};
