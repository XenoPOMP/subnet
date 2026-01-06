// eslint-disable-next-line jsdoc/require-jsdoc
export function findOverlappingValues(ranges: [number, number][]) {
  // 1. Collect events: start and end of each range
  const events: Array<{ pos: number; type: 'start' | 'end' }> = [];
  for (const [start, end] of ranges) {
    events.push({ pos: start, type: 'start' });
    events.push({ pos: end, type: 'end' });
  }

  // 2. Sort events by its position
  events.sort((a, b) => a.pos - b.pos);

  const result = new Set<number>(); // Exclude repeating values
  let activeCount = 0;
  let overlapStart = null;

  for (let i = 0; i < events.length; i++) {
    const event = events[i]!;

    if (event.type === 'start') {
      activeCount++;

      // If activeCount >= 2, start overlap
      if (activeCount >= 2 && overlapStart === null) {
        overlapStart = event.pos;
      }
    } else {
      // type === 'end'
      // First, we process the overlap until the counter is reduced
      if (activeCount >= 2) {
        const overlapEnd = event.pos;
        // Adding all integers from overlapStart to overlapEnd
        for (let x = overlapStart!; x <= overlapEnd; x++) {
          result.add(x);
        }
      }
      activeCount--;
      overlapStart = null; // We are resetting, because the overlap has been interrupted
    }
  }

  return Array.from(result)
    .sort((a, b) => a - b)
    .filter(n => !!n); // Returning the sorted array
}
