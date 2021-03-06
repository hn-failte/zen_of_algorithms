/**
 * 使用2分、3分、5分的硬币凑齐21分，最少可以用多少硬币？
 */

// 回溯法
const combinationSum = function (coins: number[], target: number) {
  // 有效数据排序
  coins.sort((a, b) => a - b);
  const results: number[][] = new Array<number[]>();
  const length = coins.length;
  const comb = (start: number, sum: number, arr: number[]) => {
    if (sum >= target) return sum === target ? results.push(arr) : void 0;
    for (let index: number = start; index < length; index++) {
      const combItem: number = coins[index];
      const nextSum: number = sum + combItem;
      if (nextSum <= target) comb(index, nextSum, arr.concat(combItem));
    }
  };
  comb(0, 0, []);
  return results;
};

(() => {
  const startTime = new Date().getTime();
  combinationSum([2, 3, 5], 21);
  const endTime = new Date().getTime();
  console.log("cost time:", endTime - startTime);
})();

(() => {
  const startTime = new Date().getTime();
  combinationSum([2, 3, 5], 42);
  const endTime = new Date().getTime();
  console.log("cost time:", endTime - startTime);
})();

(() => {
  const startTime = new Date().getTime();
  combinationSum([2, 3, 5], 63);
  const endTime = new Date().getTime();
  console.log("cost time:", endTime - startTime);
})();

(() => {
  const startTime = new Date().getTime();
  combinationSum([2, 3, 5], 630);
  const endTime = new Date().getTime();
  console.log("cost time:", endTime - startTime);
})();

(() => {
  const startTime = new Date().getTime();
  combinationSum([2, 3, 5], 6300);
  const endTime = new Date().getTime();
  console.log("cost time:", endTime - startTime);
})();
