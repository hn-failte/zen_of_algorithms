/**
 * 使用2分、3分、5分的硬币凑齐21分，最少可以用多少硬币？
 */

// 分治法
const change = (coins: number[], n: number) => {
  let count = -1; // 硬币个数
  if (n < 0) return count; // 剩余额度为小于0，则组合失败，返回-1
  for (const coin of coins) {
    if (n === coin) return 1; // 剩余额度刚好等于硬币额度，则组合成功，返回1
    const curCount = change(coins, n - coin);
    if (curCount === -1) continue; // 组合失败，继续组合
    if (count === -1 || count > curCount + 1) count = curCount + 1; // 如果本次组合的硬币个数比之前硬币个数的少，则替换
  }
  return count;
};

(() => {
  const coins = [2, 3, 5];
  const startTime = new Date().getTime();
  const minCount = change(coins, 21);
  const endTime = new Date().getTime();
  console.log("Count 21 Time", endTime - startTime);
  console.log("minCount:", minCount);
})();

(() => {
  const coins = [2, 3, 5];
  const startTime = new Date().getTime();
  const minCount = change(coins, 42);
  const endTime = new Date().getTime();
  console.log("Count 42 Time", endTime - startTime);
  console.log("minCount:", minCount);
})();

(() => {
  const coins = [2, 3, 5];
  const startTime = new Date().getTime();
  const minCount = change(coins, 63);
  const endTime = new Date().getTime();
  console.log("Count 63 Time", endTime - startTime);
  console.log("minCount:", minCount);
})();

(() => {
  const coins = [2, 3, 5];
  const startTime = new Date().getTime();
  const minCount = change(coins, 630);
  const endTime = new Date().getTime();
  console.log("Count 630 Time", endTime - startTime);
  console.log("minCount:", minCount);
})();

(() => {
  const coins = [2, 3, 5];
  const startTime = new Date().getTime();
  const minCount = change(coins, 6300);
  const endTime = new Date().getTime();
  console.log("Count 6300 Time", endTime - startTime);
  console.log("minCount:", minCount);
})();
