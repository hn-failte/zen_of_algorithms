// 基于question1找出1到10000中，哪个数字需要的运算次数最多，该如何编写代码？（注：特别要注意避免重复运算）

import { count, count2 } from "./question1";
import { addChild } from './index';

// count 在计算量大的时候，由于使用的函数作用域较多，会使内存溢出（要求速度，空间换时间）
// count2 用的是递推的过程，并不会消耗，在计算时，不会消耗过多的内存，但是会使计算时间增长（空间不足，时间换空间）

// 递推代码实现递推思想
// const findMaxLen = (deepth, max, maxNum) => {
//   if (deepth === 1) return maxNum;
//   else {
//     const curCount = count(deepth, 0);
//     if (curCount > max) {
//       max = curCount;
//       maxNum = deepth;
//     }
//     return findMaxLen(deepth - 1, max, maxNum);
//   }
// };
// console.log(findMaxLen(1000, 0, 1));

const findMaxLen2 = (deepth: number, max: number, maxNum: number) => {
  for (let i: number = deepth; i > 0; i--) {
    const curCount = count(i, 0);
    // const curCount = count2(i);
    if (curCount >= max) {
      max = curCount;
      maxNum = i;
    }
  }
  return maxNum;
};
console.log(findMaxLen2(10000, 0, 1));
