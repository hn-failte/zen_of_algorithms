// 基于question1找出1到10000中，哪个数字需要的运算次数最多，该如何编写代码？（注：特别要注意避免重复运算）

import { count } from "./question1";

const findMaxLen = (deepth, max, maxNum) => {
  if (deepth === 1) return maxNum;
  else {
    const curCount = count(deepth, 0);
    const result = curCount > max;
    const nMax = result ? curCount : max;
    const nMaxNum = result ? deepth : maxNum;
    return findMaxLen(deepth - 1, nMax, nMaxNum);
  }
};
console.log(findMaxLen(1000, 0, 1));
