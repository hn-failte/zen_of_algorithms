import { Node, buildTree } from ".";

const arr = [1, 2, 3, 4, 5, 6, 7];
const root = buildTree(arr, 0, arr.length - 1);
let sums = [];

// 计算二叉树每条从顶部到底部的路径之和 - 递归代码实现递推思想
// 从根节点开始加，逐级将当前节点的子节点分叉并依次累加分叉和 - 由已知进行层层推导（递推）
function getPathSums(node: Node, parentSum: number, sums: number[]) {
  if (node === null) return;
  let curSum = node.val + parentSum;
  if (node.left === null && node.right === null) sums.push(curSum);
  getPathSums(node.left, curSum, sums);
  getPathSums(node.right, curSum, sums);
}

getPathSums(root, 0, sums);
console.log(sums);
