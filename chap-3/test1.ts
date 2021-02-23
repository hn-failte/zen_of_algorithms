/**
 * 使用2分、3分、5分的硬币凑齐21分，最少可以用多少硬币？
 */

// 分治法
const change = (coins: number[], n: number) => {
  let optimal = -1;
  if (n < 0) return optimal;
  for (const coin of coins) {
    if (n === coin) return 1;
    const subOptimal = change(coins, n - coin);
    if (subOptimal === -1) continue;
    if (optimal === -1 || optimal > subOptimal + 1) optimal = subOptimal + 1;
  }
  return optimal;
};

(() => {
  const coins = [2, 3, 5];
  const minCount = change(coins, 21);
  console.log("minCount:", minCount);
})();
