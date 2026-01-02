'use client';

import deepmerge from 'deepmerge';
import { v4 as uuid } from 'uuid';
import { create } from 'zustand';

import type { Network } from '@/utils/ip';

export interface INetworkStore {
  root: Network | null;
  updateRootNetwork: (net: Network) => void;

  subnets: Record<string, Network>;
  createSubnet: (net: Network) => string;
  removeSubnet: (id: string) => void;
  updateSubnet: (id: string, net: Network) => void;
}

export const useNetworkStore = create<INetworkStore>((set, get) => ({
  root: null,

  // eslint-disable-next-line jsdoc/require-jsdoc
  updateRootNetwork(root) {
    set({
      root,
    });
  },

  subnets: {},

  // eslint-disable-next-line jsdoc/require-jsdoc
  createSubnet(net) {
    const id = uuid();
    const prevSubnets = get().subnets;
    const newSubnets = deepmerge<Record<string, Network>>(prevSubnets, {
      [id]: net,
    });
    set({
      subnets: newSubnets,
    });
    return id;
  },

  // eslint-disable-next-line jsdoc/require-jsdoc
  removeSubnet(id) {
    const prevSubnets = get().subnets;
    const newObjects = Object.entries(prevSubnets).filter(
      ([index]) => index !== id,
    );
    set({
      subnets: Object.fromEntries(newObjects),
    });
  },

  // eslint-disable-next-line jsdoc/require-jsdoc
  updateSubnet(id, net) {
    set({
      subnets: {
        [id]: net,
      },
    });
  },
}));
