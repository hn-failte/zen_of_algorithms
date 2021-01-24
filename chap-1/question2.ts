// 基于question1找出1到10000中，哪个数字需要的运算次数最多，该如何编写代码？（注：特别要注意避免重复运算）

import { count, count2 } from "./question1";

// count 在计算量大的时候，由于使用的函数作用域较多，会使内存溢出（要求速度，空间换时间）
// count2 用的是递推的过程，并不会消耗，在计算时，不会消耗过多的内存，但是会使计算时间增长（空间不足，时间换空间）

// 递推代码实现递推思想
const findMaxLen = (depth: number) => {
  let maxIndex = 1;
  let max = 0;
  let s = new Date().getTime();
  for (let i = 1; i <= depth; i++) {
    // const iCount = count(i, 0);
    const iCount = count2(i);
    if (iCount > max) {
      max = iCount;
      maxIndex = i;
    }
  }
  // console.log(new Date().getTime() - s);
  return maxIndex;
};

console.log(findMaxLen(1000000));
