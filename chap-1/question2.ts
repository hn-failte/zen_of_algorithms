// 基于question1找出1到10000中，哪个数字需要的运算次数最多，该如何编写代码？（注：特别要注意避免重复运算）

import { count } from "./question1";

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

const findMaxLen = (deepth: number, max: number, maxNum: number) => {
  for (let i: number = deepth; i > 0; i--) {
    const curCount = count(i, 0);
    if (curCount >= max) {
      max = curCount;
      maxNum = i;
    }
  }
  return maxNum;
};
console.log(findMaxLen(10000, 0, 1));
