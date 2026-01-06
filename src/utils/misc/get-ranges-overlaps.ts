// eslint-disable-next-line jsdoc/require-jsdoc
export function findOverlappingRanges(ranges: [number, number][]) {
  if (ranges.length < 2) return [];

  const intersections = [];

  // 1. Перебираем все пары диапазонов
  for (let i = 0; i < ranges.length; i++) {
    for (let j = i + 1; j < ranges.length; j++) {
      const [a1, b1] = ranges[i]!;
      const [a2, b2] = ranges[j]!;

      // 2. Находим пересечение пары
      const start = Math.max(a1, a2);
      const end = Math.min(b1, b2);

      if (start <= end) {
        intersections.push([start, end]);
      }
    }
  }

  // 3. Если пересечений нет — возвращаем пустой массив
  if (intersections.length === 0) return [];

  // 4. Объединяем перекрывающиеся/смежные интервалы
  const merged: [number, number][] = [];
  // Сортируем по началу интервала
  intersections.sort((a, b) => a[0]! - b[0]!);

  let current = intersections[0];

  for (let i = 1; i < intersections.length; i++) {
    const next = intersections[i];
    if (next![0]! <= current![1]!) {
      // Перекрываются или смежны — объединяем
      current![1]! = Math.max(current![1]!, next![1]!);
    } else {
      merged.push(current! as [number, number]);
      current = next;
    }
  }
  merged.push(current! as [number, number]);

  return merged;
}
