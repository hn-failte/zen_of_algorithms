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
  comb(0, 0, 0);
  return min;
};

(() => {
  const startTime = new Date().getTime();
  console.log(combinationSum([2, 3, 5], 21));
  const endTime = new Date().getTime();
  console.log("cost time:", endTime - startTime);
})();

(() => {
  const startTime = new Date().getTime();
  console.log(combinationSum([2, 3, 5], 42));
  const endTime = new Date().getTime();
  console.log("cost time:", endTime - startTime);
})();

(() => {
  const startTime = new Date().getTime();
  console.log(combinationSum([2, 3, 5], 63));
  const endTime = new Date().getTime();
  console.log("cost time:", endTime - startTime);
})();

(() => {
  const startTime = new Date().getTime();
  console.log(combinationSum([2, 3, 5], 630));
  const endTime = new Date().getTime();
  console.log("cost time:", endTime - startTime);
})();

(() => {
  const startTime = new Date().getTime();
  console.log(combinationSum([2, 3, 5], 6300));
  const endTime = new Date().getTime();
  console.log("cost time:", endTime - startTime);
})();
