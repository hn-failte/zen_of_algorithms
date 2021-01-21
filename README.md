# 算法之禅与前端开发

原书 Demo 为 Java 版，现用 TypeScript 重写了一遍，供学习用。

另外，所有的练习也均是使用 TypeScript 编写，以便明确的进行标注类型，加强语义化

## 章节一、递推和递归

1、递推

基于已有条件推导下一次的结果。

例：

```js
const sum = target => {
  const sum = 0;
  for (let i = 0; i < target; i++) sum += target;
  return sum;
};
```

2、递归

将问题发散成多个子问题，最后回归所有的答案整理成最终结果。

例：

```js
const sum = target => (target ? target + sum(target - 1) : 0);
```

3、越界代偿

用一个无害的值取代一个无意义甚至有害的值

```js
// bad
const sum = (arr, index) => {
  if (index === arr.length - 1) return arr[index];
  return arr[index] + sum(arr, index + 1);
};

// good
const sum = (arr, index) => {
  if (index === arr.length) return 0;
  return arr[index] + sum(arr, index + 1);
};
```

4、思想与代码实现

递推思想是可以用递归实现的，同样的递归的思想也可以用递推来实现

| 思想 | 代码 | 特点                                 |
| ---- | ---- | ------------------------------------ |
| 递推 | 递推 | 由已知进行层层推导                   |
| 递推 | 递归 | 自顶向下，能简化代码                 |
| 递归 | 递推 | 顺理成章，自调用；自底向上，结果对齐 |
| 递归 | 递归 | 循环语句加栈数据机构，避免栈溢出     |

以下通过 **计算二叉树每条从顶部到底部的路径之和** 来讲解这四种实现

首先定义基础的节点与生成二叉树的方法

```js
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
```

(1) 递推代码实现递推思想

该写法是标准的递推写法

```js
import { Node, buildTree } from ".";

const arr = [1, 2, 3, 4, 5, 6, 7];
const root = buildTree(arr, 0, arr.length - 1);

// 从根节点开始加，将当前节点的子节点逐级计算和
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
```

(2) 递归代码实现递推思想

该写法思想还是递推的，但是写法为递归，能简化一部分代码

```js
import { Node, buildTree } from ".";

const arr = [1, 2, 3, 4, 5, 6, 7];
const root = buildTree(arr, 0, arr.length - 1);
let sums = [];

// 从根节点开始加，逐级将当前节点的子节点分叉并依次累加分叉和
function getPathSums(node: Node, parentSum: number, sums: number[]) {
  if (node === null) return;
  let curSum = node.val + parentSum;
  if (node.left === null && node.right === null) sums.push(curSum);
  getPathSums(node.left, curSum, sums);
  getPathSums(node.right, curSum, sums);
}

getPathSums(root, 0, sums);
```

(3) 递归代码实现递归思想

该种思想是把任务拆分为了多个子任务，最后子任务的答案回归上级，推导出结果

```js
import { Node, buildTree } from ".";

const arr = [1, 2, 3, 4, 5, 6, 7];
const root = buildTree(arr, 0, arr.length - 1);

// 从根节点开始发布子任务，从叶子节点开始累加，回归答案，一直回归到根节点
function collectSums(node: Node) {
  let sums = [];
  if (node === null) return sums;
  for (let sum of collectSums(node.left)) sums.push(sum + node.val);
  for (let sum of collectSums(node.right)) sums.push(sum + node.val);
  if (!sums.length) sums.push(node.val);
  return sums;
}

console.log(collectSums(root));
```

(4) 递推代码实现递归思想

正常情况下，不需要这么去思考问题，只有在极度极端的情况下才需要如此去处理。

```js
import { Node, buildTree, buildTowerTree, Frame } from ".";

const arr = [1, 2, 3, 4, 5, 6, 7];
const root = buildTree(arr, 0, arr.length - 1);

// 从根节点开始加，会先将所有的左部节点进栈，再右部节点进栈
// 之后遍历开始出栈来回归子节点的值，在出栈的过程中，后续的值会不断累加到栈顶元素中
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
    } else if (top.count === 2) {
      // 所有子节点进栈完成，开始累加值进行回归
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
```

> 在 JAVA 中，栈的速度是很快的，这里使用数组，仅作为 TypeScript 的替代方案来进行理解
> 诚然这么写也能实现，但是复杂度确实要比其他方案高出太多，并且代码优雅程度堪忧，需要大量注释来进行理解，实际开发很难用到

10、前端递归的补充

(1) JS 函数的尾调用

函数调用会在内存形成一个调用帧，保存调用位置和内部变量等信息。

一个函数内存在其他函数调用，其他函数就会在这个函数上形成调用帧，所有的调用帧形成了一个调用栈。

尾调用是指在函数的**最后一步**操作时，返回另一个函数的调用，这个时候，由于不会用到被调用函数的位置和内部变量等信息，不需要保留外层函数的调用帧。

```js
const fun1 = () => 10;
const fun2 = () => {
  return fun1(); // 尾调用
};
const fun3 = () => {
  return 1 + fun1(); // 最后一步不是函数调用，非尾调用
};
const fun4 = () => {
  const val = fun1();
  return val1; // 最后一步不是函数调用，非尾调用
};
const fun4 = () => {
  fun1(); // 最后一步是一个隐藏的 return undefined, 不是函数调用，非尾调用
};
```

(2) JS 函数的尾递归

函数递归对内存消耗很大，每次递归都会产生一个调用帧，而整个递归下来会产生很多的调用帧，很容易出现栈溢出的问题。

尾调用是可以有效减少执行栈的，将尾调用和递归结合，有可能将复杂度为 O(n)的计算变成 O(1)。

非尾递归

```js
function Fibonacci(n) {
  if (n <= 1) return 1;
  return Fibonacci(n - 1) + Fibonacci(n - 2);
}
Fibonacci(10); // 89
Fibonacci(100); // 运行超时
Fibonacci(500); // 运行超时
```

尾递归

```js
function Fibonacci2(n, ac1 = 1, ac2 = 1) {
  if (n <= 1) return ac2;
  return Fibonacci2(n - 1, ac2, ac1 + ac2);
}
Fibonacci2(100); // 573147844013817200000
Fibonacci2(1000); // 7.0330367711422765e+208
Fibonacci2(10000); // Infinity
```

注意：目前只有 safiri 与高版本的 node 支持尾递归，且 v8 默认是关闭该功能的（v8 团队认为做尾递归优化存在一系列问题，因此倾向于支持用显式的语法来实现，而非做优化），尾递归优化只在严格模式下生效，在执行时需加上参数 `--harmony_tailcalls`

即便浏览器不支持，但只要围绕 **尾递归的本质是减少函数调用栈** 这一点，就可以做出优化，例如通过 **蹦床函数 **将递归改为循环，当然，若非必要，可以直接写循环函数，从而避免写递归函数

```js
function trampoline(f) {
  while (f && f instanceof Function) {
    f = f();
  }
  return f;
}
```
