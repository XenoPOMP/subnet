'use client';

import lodashSet from 'lodash.set';
import { v4 as uuid } from 'uuid';
import type { Lenient } from 'xenopomp-essentials';
import { create } from 'zustand';

import { Address, Network } from '@/utils/ip';

export const useNetworkStore = create<INetworkStore & NetworkFormDelegate>(
  (set, get) => ({
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

    // FIXME When removing items, networks are reset on other items.
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

    form: {
      root: {
        input: '',
        error: undefined,
      },
    },

    // eslint-disable-next-line jsdoc/require-jsdoc
    setValue: (target, newValue) => {
      set({
        form: lodashSet(get().form, `${target}.input`, newValue),
      });
    },

    // eslint-disable-next-line jsdoc/require-jsdoc
    setError: (target, newError) => {
      set({
        form: lodashSet(get().form, `${target}.error`, newError),
      });
    },

    // eslint-disable-next-line jsdoc/require-jsdoc
    clearError: target => {
      set({
        form: lodashSet(get().form, `${target}.error`, undefined),
      });
    },
  }),
);

interface INetworkStore {
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

interface FormInput {
  input: string;
  error?: string;
}

interface NetworkForm {
  form: {
    root: FormInput;
  } & Partial<Record<Lenient<string>, FormInput>>;
}

type Target = keyof NetworkForm['form'];

interface NetworkFormMethods {
  setValue: (target: Target, newValue: string) => void;
  setError: (target: Target, newError: string | undefined) => void;
  clearError: (target: Target) => void;
}

type NetworkFormDelegate = NetworkForm & NetworkFormMethods;
