/**
 * 使用2分、3分、5分的硬币凑齐21分，最少可以用多少硬币？
 */

// 动态规划
const change = (coins: number[], n: number, cache: Map<number, number>) => {
  let optimal = -1;
  if (n < 0) return optimal;
  if (cache.has[n]) return cache.get(n);
  for (const coin of coins) {
    if (n === coin) return 1;
    const subOptimal = change(coins, n - coin, cache);
    if (subOptimal === -1) continue;
    if (optimal === -1 || optimal > subOptimal + 1) optimal = subOptimal + 1;
  }
  cache.set(n, optimal);
  return optimal;
};

(() => {
  const coins = [2, 3, 5];
  const cache = new Map();
  const minCount = change(coins, 21, cache);
  console.log("minCount:", minCount);
})();
