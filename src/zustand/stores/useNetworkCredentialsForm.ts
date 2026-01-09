import lodashSet from 'lodash.set';
import type { LenientAutocomplete } from 'xenopomp-essentials';
import { create } from 'zustand';

export const useNetworkCredentialsForm = create<
  INetworkCredentialsForm & Actions
>((set, get) => ({
  root: {
    name: '',
    color: '',
  },

  actions: {
    // eslint-disable-next-line jsdoc/require-jsdoc
    setValue(target, key, value) {
      set(lodashSet(get(), `${target}.${key}`, value));
    },
  },
}));

type INetworkCredentialsForm = {
  [x in LenientAutocomplete<'root'>]?: {
    name?: string;
    color?: string;
  };
};

interface Actions {
  actions: {
    setValue: <
      Name extends keyof INetworkCredentialsForm,
      Key extends keyof INetworkCredentialsForm[Name],
      Value extends INetworkCredentialsForm[Name][Key],
    >(
      target: Name,
      key: Key,
      value: Value,
    ) => void;
  };
}
