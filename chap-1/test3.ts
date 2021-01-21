import { Node, buildTree } from ".";

const arr = [1, 2, 3, 4, 5, 6, 7];
const root = buildTree(arr, 0, arr.length - 1);

// 计算二叉树每条从顶部到底部的路径之和 - 递归代码实现递归思想
// 从根节点开始发布子任务，从叶子节点开始累加，回归答案，一直回归到根节点 - 自底向上（递归）
function collectSums(node: Node) {
  let sums = [];
  if (node === null) return sums;
  for (let sum of collectSums(node.left)) sums.push(sum + node.val);
  for (let sum of collectSums(node.right)) sums.push(sum + node.val);
  if (!sums.length) sums.push(node.val);
  return sums;
}

console.log(collectSums(root));
