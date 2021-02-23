// 假设处于创业期，成本有限，只架设了一台服务器。
// 但是存在多个价值不一的应用需要部署，
// 该如何使这台服务器部署的最具价值？

// 贪心算法
class Greedy {
  public LIMIT: number = 100;
  public cost: number[] = [];
  public value: number[] = [];
  apps: Map<number, number> = new Map();

  constructor(LIMIT?: number, cost?: number[], value?: number[]) {
    this.LIMIT = LIMIT;
    this.cost = cost;
    this.value = value;
  }

  select() {
    let len: number = this.cost.length; //应用数量
    let scale: number[] = new Array(len); //应用部署的性价比数组
    let position: number[] = new Array(len); //部署的性价比对应的排序应用下标
    for (let i = 0; i < len; i++) {
      scale[i] = this.value[i] / this.cost[i];
      position[i] = i; // 默认排序
    }

    // 性价比冒泡排序
    for (let i = 0; i < len - 1; i++)
      for (let j = i + 1; j < len; j++) {
        // 降序，对性价比和对应下标进行排序
        if (scale[i] < scale[j]) {
          scale[i] = scale[i] + scale[j];
          scale[j] = scale[i] - scale[j];
          scale[i] = scale[i] - scale[j];

          position[i] = position[i] + position[j];
          position[j] = position[i] - position[j];
          position[i] = position[i] - position[j];
        }
      }

    //排序好的消耗和价值分别存到数组
    let sortedCost: number[] = new Array(len);
    let sortedValue: number[] = new Array(len);
    for (let i = 0; i < len; i++) {
      sortedCost[i] = this.cost[position[i]];
      sortedValue[i] = this.value[position[i]];
    }

    for (let i = 0; i < len; i++) {
      // 部署的应用消耗小于总量，还能继续部署
      if (sortedCost[i] < this.LIMIT) {
        this.apps.set(sortedCost[i], sortedValue[i]); //表示该应用要被部署
        this.LIMIT = this.LIMIT - sortedCost[i];
      }
    }
  }
}

(() => {
  const LIMIT: number = 100;
  const map: Map<number, number> = new Map([
    // [cost, value],
    // cost指服务器的消耗，value指能预估能创造的价值
    [5, 30],
    [10, 35],
    [15, 5],
    [20, 45],
    [25, 25],
    [30, 40],
    [35, 10],
    [40, 15],
    [45, 20],
    [50, 50],
  ]);

  const greedy = new Greedy(
    100,
    Array.from(map.keys()),
    Array.from(map.values())
  );

  greedy.select();

  console.log(`部署应用限制消耗：`, LIMIT);
  console.log(`部署的应用：`, greedy.apps);
  console.log(
    `部署应用总消耗：`,
    Array.from(greedy.apps.keys()).reduce((sum, key) => sum + key, 0)
  );
  console.log(
    `部署应用价值之和：`,
    Array.from(greedy.apps.values()).reduce((sum, value) => sum + value, 0)
  );
})();
