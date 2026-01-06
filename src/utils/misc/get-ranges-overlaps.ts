// eslint-disable-next-line jsdoc/require-jsdoc
export function findOverlappingRanges(ranges: [number, number][]) {
  // 1. Собираем события: начало и конец каждого диапазона
  const events: Array<{ pos: number; type: 'start' | 'end'; index: number }> =
    [];
  for (let i = 0; i < ranges.length; i++) {
    const [start, end] = ranges[i]!;
    events.push({ pos: start, type: 'start', index: i });
    events.push({ pos: end, type: 'end', index: i });
  }

  // 2. Сортируем: по позиции; при равенстве — start перед end
  events.sort((a, b) => {
    if (a.pos !== b.pos) return a.pos - b.pos;
    return a.type === 'start' ? -1 : 1;
  });

  const resultIntervals = []; // Массив диапазонов перекрытия [start, end]
  let activeCount = 0;
  let overlapStart = null;

  for (const event of events) {
    if (event.type === 'start') {
      activeCount++;

      // Входим в зону перекрытия ≥2 диапазонов
      if (activeCount >= 2 && overlapStart === null) {
        overlapStart = event.pos;
      }
    } else {
      // type === 'end'
      // Выходим из зоны перекрытия
      if (activeCount >= 2 && overlapStart !== null) {
        const overlapEnd = event.pos;
        resultIntervals.push([overlapStart, overlapEnd]);
        overlapStart = null; // Сбрасываем для следующего возможного перекрытия
      }
      activeCount--;
    }
  }

  // 3. Объединяем смежные/перекрывающиеся интервалы
  if (resultIntervals.length === 0) return [];

  const merged: number[][] = [];
  let current = resultIntervals[0];

  for (let i = 1; i < resultIntervals.length; i++) {
    const next = resultIntervals[i];
    if (next![0]! <= current![1]!) {
      // Перекрываются или смежны — объединяем
      current![1] = Math.max(current![1]!, next![1]!);
    } else {
      merged.push(current!);
      current = next;
    }
  }
  merged.push(current!);

  return merged;
}
