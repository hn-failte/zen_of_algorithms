/// <reference types="node" />

// 给定整数n，若n为奇数，则运算n=n*3+1，否则运算n=n/2，直到n为1为止，计算以供进行了多少次运算？

// 递推代码实现递归思想
const map = new Map([[1, 0]]); // 使用 map 避免进行重复的计算
export const count: (number, total) => number = (n: number, total) => {
  if (!map.has(n))
    map.set(n, 1 + count(n % 2 ? n * 3 + 1 : Math.floor(n / 2), total));
  return map.get(n);
};

console.log(count(9, 0));
