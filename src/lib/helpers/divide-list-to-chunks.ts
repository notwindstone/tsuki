export function divideListToChunks<T>({
  list,
  chunkSize,
}: {

  /** An Array of anything */
  "list": Array<T>;

  /** Chunk size should be Integer and be more than 0 */
  "chunkSize": number;
}): Record<number, Array<T>> {
  const chunks: Record<number, Array<T>> = {};

  for (let index = 0; index < list.length; index++) {
    const item = list[index];
    const chunkIndex = Math.floor(index / chunkSize);
    const currentChunk = chunks[chunkIndex];

    if (currentChunk === undefined) {
      chunks[chunkIndex] = [];
    }

    chunks[chunkIndex].push(item);
  }

  return chunks;
}
