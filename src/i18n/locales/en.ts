import type { RecursiveKeyValuePair } from 'tailwindcss/types/config';

export const en = {
  hello: 'Hello, world!',
  errors: {
    required: 'This field is required',
    net: {
      wrongFormat:
        'Wrong format of address (the correct one is "192.168.0.1/{1-31}")',
      wrongMask: 'Mask must be an integer (0-32)',
      subnetOutsideRoot: 'Address is outside root network.',
    },
  },
  placeholders: {
    network: {
      name: 'Unnamed',
    },
  },
  pages: {
    dashboard: {
      headings: {
        rootNet: 'Root network',
        subnets: 'Subnets',
        netMap: 'Network map',
      },
    },
  },
  copyTextMessages: {
    defaultOne: 'Copied!',
    shareNetwork: {
      shared: 'Network link copied!',
    },
  },
  poolInfo: {
    headings: {
      subnet: 'Subnet',
      hosts: 'Hosts',
    },
    labels: {
      network: 'Network',
      broadcast: 'Broadcast',
      mask: 'Mask',
      totalHosts: 'Hosts count',
    },
  },
  projects: {
    untitled: 'Untitled project',
    heading: 'Projects',
    newProject: 'New project',
    edit: 'Edit project',
    delete: 'Delete project',
    confirmDelete: 'Confirm deletion',
    noDescription: 'No description',
    dialog: {
      title: 'Project details',
      emoji: 'Icon',
      name: 'Name',
      description: 'Description',
      descriptionPlaceholder: 'What is this network map for?',
      save: 'Save',
      cancel: 'Cancel',
    },
  },
  seo: {
    root: {
      title: 'Network map',
      desc: 'Small utility for visually mapping networks.',
    },
  },
} satisfies RecursiveKeyValuePair;
