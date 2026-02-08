import type { LanguageResource } from './default';

export const ru: LanguageResource = {
  hello: 'Привет, мир!',
  errors: {
    required: 'Это поле обязательное!',
    net: {
      wrongFormat: 'Неправильный формат адреса (правильный - "192.168.0.1/24")',
      wrongMask: 'Маска подсети должна быть числом от 1 до 31',
      subnetOutsideRoot: 'Введенный адрес выходит за рамки корневой сети.',
    },
  },
  placeholders: {
    network: {
      name: 'Без названия',
    },
  },
  pages: {
    dashboard: {
      headings: {
        rootNet: 'Корневая сеть',
        subnets: 'Подсети',
        netMap: 'Карта сети',
      },
    },
  },
  copyTextMessages: {
    defaultOne: 'Скопировано!',
    shareNetwork: {
      shared: 'Ссылка скопирована!',
    },
  },
};
