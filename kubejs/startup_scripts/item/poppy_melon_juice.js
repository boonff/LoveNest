// 罂粟西瓜汁
StartupEvents.registry('item', event => {
    event.create('poppy_melon_juice')
        .food(food => {
            food.nutrition(6)
                .saturation(0.5)
                .eaten(ctx => {
                    ctx.player.give('minecraft:glass_bottle')
                })
        })
        .useDuration((stack, entity) => 40) // 设置食用时间，单位 ticks
        .useAnimation('drink')
        .maxStackSize(16)
})