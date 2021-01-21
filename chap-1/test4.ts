import { Node, buildTree, buildTowerTree, Frame } from ".";

const arr = [1, 2, 3, 4, 5, 6, 7];
// const root = buildTowerTree(20000);
const root = buildTree(arr, 0, arr.length - 1);

// 计算二叉树每条从顶部到底部的路径之和 - 递推代码实现递归思想
// 从根节点开始加，会先将所有的左部节点进栈，再右部节点进栈，之后遍历开始出栈来回归子节点的值
// 在出栈的过程中，后续的值会不断累加到栈顶元素中 - 循环语句加栈数据机构，避免栈溢出（递归）
function getPathSums(root: Node) {
  let stack: Frame[] = []; // 模拟Stack
  let primer = new Frame(root);
  stack.unshift(primer); // 对应Stack.push()
  while (true) {
    let top = stack[0]; // 对应Stack.peek()
    if (!top.node) {
      stack.shift(); // 对应Stack.pop()
      stack[0].count++;
    } else if (top.count === 0) {
      stack.unshift(new Frame(top.node.left)); // 先进栈左子节点
    } else if (top.count === 1) {
      stack.unshift(new Frame(top.node.right)); // 后进栈右子节点
    } else if (top.count === 2) { // 所有子节点进栈完成，开始累加值进行回归
      let popped = stack.shift(); // 取出栈顶的元素进行操作
      if (!popped.sums.length) popped.sums.push(popped.node.val); // 若栈顶元素的值没有sums，则认为这是一条新的路线
      if (!stack.length) break; // 栈中已无元素，停止遍历
      top = stack[0]; // top为新栈顶元素，指向前栈顶元素的后一个元素，前栈顶元素与新栈顶元素为父子节点
      for (let sum of popped.sums) top.sums.push(sum + top.node.val); // 每次遍历将新栈顶元素和前栈顶元素的值相加
      top.count++;
    }
  }
  return primer.sums;
}

console.log(getPathSums(root));
