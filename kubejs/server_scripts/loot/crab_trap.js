
LootEvents.modify(event => {
  // 1. 指定要修改的战利品表ID，例如煤矿石
  event.addLootTable("minecraft:blocks/coal_ore", table => {
    // 2. 向该战利品表添加一个新的战利品池
    table.addPool(pool => {
      // 设置该池的抽取次数（例如，固定为1次）
      pool.rolls = 1
      // 3. 在该池中添加具体的物品项
      pool.addItem("minecraft:egg") // 添加鸡蛋
      // 你可以继续添加更多物品，或为物品设置数量、函数等
      pool.addItem("minecraft:cobblestone", 5) // 添加5个圆石
      // 使用权重和数量范围示例
      pool.addItem("minecraft:diamond")
           .weight(5) // 设置权重，权重越高被选中的概率越大
           .applyFunction(setCount(1, 3)) // 设置掉落数量范围（1到3个）
    })
  })

  // 你可以重复调用 event.addLootTable 来修改多个战利品表
  /*
  event.addLootTable("minecraft:entities/zombie", table => {
    // 修改僵尸的掉落物...
  })
  */
})