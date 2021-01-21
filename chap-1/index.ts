/// <reference types="node" />

export class Node {
  val: number = void 0;
  left: Node = null;
  right: Node = null;
  constructor(val = void 0) {
    this.val = val;
  }
}

export function buildTree(arr: number[], start: number, end: number) {
  if (start > end) return null;
  const middle = start + Math.floor((end - start) / 2);
  const root: Node = new Node(arr[middle]);
  root.left = buildTree(arr, start, middle - 1);
  root.right = buildTree(arr, middle + 1, end);
  return root;
}

module.exports = {
  Node,
  buildTree
};
