// 使用物品事件注册新物品
StartupEvents.registry('block', event => {
    event.create('poppy_melon_juice')
        .food(food => {
            food
                .hunger(6)
                .saturation(6)
                .eaten(ctx => {
                    ctx.player.give('minecraft:glass_bottle')
                })
        })
})