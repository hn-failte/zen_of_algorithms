/**
 * 使用2分、3分、5分的硬币凑齐21分，最少可以用多少硬币？
 */

// 分支限界法
const combinationSum = function (coins: number[], target: number) {
  // 最小硬币数
  let min = 0;
  const length = coins.length;
  const comb = (start: number, sum: number, count: number) => {
    if (min && count >= min) return;
    if (sum >= target) {
      if (!min) min = count;
      if (sum === target) min = count < min ? count : min;
      return;
    }
    count++;
    for (let index: number = start; index < length; index++) {
      const combItem: number = coins[index];
      const nextSum: number = sum + combItem;
      if (nextSum <= target) comb(index, nextSum, count);
    }
  };
  // 主要的遍历
  comb(0, 0, 0);
  return min;
};

console.log(combinationSum([2, 3, 5], 21));
