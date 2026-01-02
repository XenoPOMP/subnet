'use client';

import { v4 as uuid } from 'uuid';
import { create } from 'zustand';

import { Address, Network } from '@/utils/ip';

export interface INetworkStore {
  root: Network | null;
  updateRootNetwork: (net: Network) => void;

  subnets: Array<{
    id: string;
    network: Network;
  }>;
  createSubnet: () => string;
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

  subnets: [],

  // eslint-disable-next-line jsdoc/require-jsdoc
  createSubnet() {
    const id = uuid();
    const previousSubnets = get().subnets;
    previousSubnets.push({
      id,
      network: get().root ?? new Network(new Address(127, 0, 0, 1), 24),
    });

    set({
      subnets: previousSubnets,
    });

    return id;
  },

  // eslint-disable-next-line jsdoc/require-jsdoc
  removeSubnet(id) {
    const prevSubnets = get().subnets;
    const newSubnets = prevSubnets.filter(n => n.id !== id);
    set({
      subnets: newSubnets,
    });
  },

  // eslint-disable-next-line jsdoc/require-jsdoc
  updateSubnet(id, net) {
    const prevSubnets = get().subnets;
    const newSubnets = prevSubnets.map(n =>
      n.id === id
        ? {
            id,
            network: net,
          }
        : n,
    );

    set({
      subnets: newSubnets,
    });
  },
}));
