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
  const middle: number = start + Math.floor((end - start) / 2);
  const root: Node = new Node(arr[middle]);
  root.left = buildTree(arr, start, middle - 1);
  root.right = buildTree(arr, middle + 1, end);
  return root;
}

export function addChild(node: Node, val: number, toLeft: boolean) {
  let child: Node = new Node(val);
  return toLeft ? (node.left = child) : (node.right = child);
}

export function buildTowerTree(n: number) {
  let root: Node = new Node(1),
    p: Node = root,
    q: Node = root;
  for (let i = 1; i <= n; i++) {
    p = addChild(p, 1, true);
    q = addChild(q, 1, false);
  }
  let pp: Node = p,
    qq: Node = q;
  for (let i = 1; i <= n; i++) {
    p = addChild(p, 1, true);
    pp = addChild(pp, 1, false);
    q = addChild(q, 1, false);
    qq = addChild(qq, 1, true);
  }
  return root;
}

export class Frame {
  node: Node = null;
  count: number = 0;
  sums: number[] = [];
  constructor(node: Node) {
    this.node = node;
  }
}

module.exports = {
  Node,
  buildTree,
  addChild,
  buildTowerTree,
  Frame,
};
