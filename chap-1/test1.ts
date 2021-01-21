import { Node, buildTree } from ".";

const arr = [1, 2, 3, 4, 5, 6, 7];
const root = buildTree(arr, 0, arr.length - 1);

// 计算二叉树每条从顶部到底部的路径之和 - 递推代码实现递推思想
// 从根节点开始加，将当前节点的子节点逐级累加和 - 由已知进行层层推导（递推）
function getPathSums(root: Node) {
  let sums: number[] = [];
  let sumQ: number[] = [];
  let nodeQ: Node[] = [];
  sumQ.push(0);
  nodeQ.push(root);

  while (nodeQ.length) {
    let curNode: Node = nodeQ.shift();
    if (curNode === null) continue;
    let curSum: number = curNode.val + sumQ.shift();
    if (curNode.left === null && curNode.right === null) sums.push(curSum);
    sumQ.push(curSum);
    nodeQ.push(curNode.left);
    sumQ.push(curSum);
    nodeQ.push(curNode.right);
  }
  return sums;
}

console.log(getPathSums(root));
