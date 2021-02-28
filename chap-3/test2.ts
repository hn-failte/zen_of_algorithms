/**
 * 使用2分、3分、5分的硬币凑齐21分，最少可以用多少硬币？
 */

// 动态规划
const change = (coins: number[], n: number, cache: Map<number, number>) => {
  let count = -1;
  if (n < 0) return count;
  if (cache.has(n)) return cache.get(n);
  for (const coin of coins) {
    if (n === coin) return 1;
    const curCount = change(coins, n - coin, cache);
    if (curCount === -1) continue;
    if (count === -1 || count > curCount + 1) count = curCount + 1;
  }
  cache.set(n, count);
  return count;
};

// const coinChange = (coins: number[], n: number) => {
//   const Max = n + 1;
//   const dp: number[] = new Array(Max);
//   dp.fill(Max);
//   dp[0] = 0;
//   for (let i = 1; i <= n; ++i) {
//     for (let j = 0; j < coins.length; ++j) {
//       if (coins[j] <= i) {
//         dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
//       }
//     }
//   }
//   return dp[n] > n ? -1 : dp[n];
// };

(() => {
  const coins = [2, 3, 5];
  const startTime = new Date().getTime();
  const cache: Map<number, number> = new Map();
  const minCount = change(coins, 21, cache);
  const endTime = new Date().getTime();
  console.log("Count 21 Time", endTime - startTime);
  console.log("minCount:", minCount);
})();

(() => {
  const coins = [2, 3, 5];
  const startTime = new Date().getTime();
  const cache = new Map();
  const minCount = change(coins, 42, cache);
  const endTime = new Date().getTime();
  console.log("Count 42 Time", endTime - startTime);
  console.log("minCount:", minCount);
})();

(() => {
  const coins = [2, 3, 5];
  const startTime = new Date().getTime();
  const cache = new Map();
  const minCount = change(coins, 63, cache);
  const endTime = new Date().getTime();
  console.log("Count 63 Time", endTime - startTime);
  console.log("minCount:", minCount);
})();

(() => {
  const coins = [2, 3, 5];
  const startTime = new Date().getTime();
  const cache = new Map();
  const minCount = change(coins, 630, cache);
  const endTime = new Date().getTime();
  console.log("Count 630 Time", endTime - startTime);
  console.log("minCount:", minCount);
})();

(() => {
  const coins = [2, 3, 5];
  const startTime = new Date().getTime();
  const cache = new Map();
  const minCount = change(coins, 6300, cache);
  const endTime = new Date().getTime();
  console.log("Count 6300 Time", endTime - startTime);
  console.log("minCount:", minCount);
})();
