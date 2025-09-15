// 使用物品事件注册新物品
StartupEvents.registry('item', event => {
    event.create('poppy_melon_juice')
        .food(food => {
            food
                .nutrition(6)
                .saturation(1)
                .eaten(ctx => {
                    ctx.player.give('minecraft:glass_bottle')
                })
        })
})