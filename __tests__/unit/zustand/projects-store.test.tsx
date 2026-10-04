import { beforeEach, describe, expect, test } from 'vitest';

import { Address, Network } from '@/utils/ip';
import { useNetworkStore, useProjectsStore } from '@/zustand';

// eslint-disable-next-line jsdoc/require-jsdoc
const projects = () => useProjectsStore.getState();
// eslint-disable-next-line jsdoc/require-jsdoc
const network = () => useNetworkStore.getState();

describe('ProjectsStore', () => {
  beforeEach(() => {
    // Start every test with single empty project.
    projects().deleteProject(projects().activeId);
    for (const { id } of projects().projects.slice(1)) {
      projects().deleteProject(id);
    }
  });

  test('There is always at least one project', () => {
    expect(projects().projects).toHaveLength(1);

    projects().deleteProject(projects().activeId);

    expect(projects().projects).toHaveLength(1);
  });

  test('Switching keeps working state of every project', () => {
    const first = projects().activeId;
    network().updateRootNetwork(new Network(new Address(10, 0, 0, 0), 16));
    const subnetId = network().createSubnet();
    network().setValue(subnetId, '10.0.1.0/24');

    const second = projects().createProject();
    // New project is empty.
    expect(network().subnets).toHaveLength(0);
    expect(network().root).toBeNull();

    projects().switchProject(first);

    expect(network().root?.cidr()).toBe('10.0.0.0/16');
    expect(network().subnets.map(s => s.id)).toEqual([subnetId]);
    expect(network().form[subnetId]?.input).toBe('10.0.1.0/24');

    projects().switchProject(second);
    expect(network().subnets).toHaveLength(0);
  });

  test('Project info can be updated', () => {
    const id = projects().activeId;
    projects().updateProject(id, { name: 'Lab', emoji: '🧪' });

    expect(projects().projects[0]).toMatchObject({ name: 'Lab', emoji: '🧪' });
  });

  test('Deleting active project activates neighbour', () => {
    const first = projects().activeId;
    const second = projects().createProject();

    projects().deleteProject(second);

    expect(projects().activeId).toBe(first);
    expect(projects().projects).toHaveLength(1);
  });
});
