/** Quick picks for project icon. User may also type any other emoji. */
export const PROJECT_EMOJIS: readonly string[] = [
  '🌐',
  '🏠',
  '🏢',
  '🏭',
  '🏫',
  '🏥',
  '🏬',
  '🖥️',
  '💻',
  '🔌',
  '📡',
  '🛜',
  '🔒',
  '🛡️',
  '☁️',
  '🧪',
  '🚀',
  '🔧',
  '📦',
  '🗺️',
  '🎮',
  '🎓',
  '🧩',
  '⭐',
];

/**
 * Cuts input to the first user-perceived character, so field accepts a
 * single emoji (even if it consists of multiple code points).
 * @param value
 */
export const firstGrapheme = (value: string): string => {
  const segments = Array.from(new Intl.Segmenter().segment(value.trim()));
  return segments.at(0)?.segment ?? '';
};
