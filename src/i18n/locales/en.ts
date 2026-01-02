import type { RecursiveKeyValuePair } from 'tailwindcss/types/config';

export const en = {
  hello: 'Hello, world!',
  errors: {
    required: 'This field is required',
    net: {
      wrongFormat:
        'Wrong format of address (the correct one is "192.168.0.1/{1-31}")',
      wrongMask: 'Mask must be an integer (1-31)',
    },
  },
} satisfies RecursiveKeyValuePair;
