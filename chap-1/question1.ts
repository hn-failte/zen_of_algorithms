/// <reference types="node" />

// 给定整数n，若n为奇数，则运算n=n*3+1，否则运算n=n/2，直到n为1为止，计算以供进行了多少次运算？

const map: Map<number, number> = new Map([[1, 0]]); // 使用 map 避免进行重复的计算

// 递归代码实现递归思想
export const count = (n: number, total: number) => {
  if (!map.has(n))
    map.set(n, 1 + count(n % 2 ? n * 3 + 1 : Math.floor(n / 2), total));
  return map.get(n);
};

// 递推代码实现递推思想
export const count2 = (n: number) => {
  let total: number = 0;
  let needCache = true;
  let len = n;
  while (len !== 1) {
    let hasCache = map.has(len);
    if (hasCache) {
      needCache = total ? true : false;
      total = total ? total + map.get(len) : total;
      return total;
    } else {
      len = len % 2 ? len * 3 + 1 : Math.floor(len / 2);
      total++;
    }
  }
  if (needCache) {
    map.set(n, total);
  }
  return total;
};

// console.log(count2(9));
