type recursiveFieldType = {
  "children": Record<string, recursiveFieldType>;
};

/**
 * Iterates through an array of fields that are needed to apply to GraphQL query
 * and returns a valid GraphQL fields string.
 *
 * @example
 * // input
 * ["id", "title.romaji", "title.english", "relations.edges.node.id"]
 *
 * // result
 * `id title { romaji english } relations { edges { node { id } } }`
 */
export function formatListToGraphqlFields(entries: Array<string>): string {
  const root: recursiveFieldType = { "children": {} };

  for (const entry of entries) {
    const parts = entry.split(".");
    let currentNode = root;

    for (const part of parts) {
      if (currentNode.children[part] === undefined) {
        currentNode.children[part] = { "children": {} };
      }

      currentNode = currentNode.children[part];
    }
  }

  function generateString(nodeChildren: Record<string, recursiveFieldType>) {
    const parts: Array<string> = [];
    const nodeChildrenKeys = Object.keys(nodeChildren);

    for (const key of nodeChildrenKeys) {
      const childNode = nodeChildren[key];

      if (Object.keys(childNode.children).length === 0) {
        parts.push(key);

        continue;
      }

      const inner = generateString(childNode.children);

      parts.push(`${key} {${inner}}`);
    }

    return parts.join(" ");
  }

  return generateString(root.children);
}
