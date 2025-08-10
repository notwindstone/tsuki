export function getPaginationEntries({
  current,
  last,
  delta = 2,
}: {
  "current": number;
  "last"   : number;

  /** how many additional pages to include in both directions of the middle range */
  "delta"?: number;
}): Array<number | "dots"> {
  // the most left page to include in the middle range
  const mostLeft = current - delta;
  // the most right page to include in the middle range
  const mostRight = current + delta;
  // structure: 'first page' 'middle range' 'last page'
  const pagination: Array<number> = [];

  // push all required pages to the pagination array (without dots yet)
  for (let index = 1; index <= last; index++) {
    const isEdge = index === 1 || index === last;
    // does it belong to the middle range?
    const inDelta = index >= mostLeft && index <= mostRight;

    if (!isEdge && !inDelta) {
      continue;
    }

    pagination.push(index);
  }

  // structure: 'first page' '...' 'middle range' '...' 'last page'
  const paginationWithDots: Array<number | "dots"> = [];

  for (let index = 0; index < pagination.length; index++) {
    // it's the first page
    if (index === 0) {
      paginationWithDots.push(pagination[index]);

      continue;
    }

    const previousPaginationItem = pagination[index - 1];
    const currentPaginationItem = pagination[index];

    // if previous and current numbers differ more than one, place 'dots' between them
    if (previousPaginationItem + 1 !== currentPaginationItem) {
      paginationWithDots.push("dots");
    }

    paginationWithDots.push(currentPaginationItem);
  }

  return paginationWithDots;
}
