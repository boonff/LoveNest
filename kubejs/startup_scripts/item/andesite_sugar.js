StartupEvents.registry('item', event => {
    event.create('foand:andesite_sugar') // 安山糖
        .food(food => {
            food.nutrition(6)
                .saturation(0.5)
                .eaten(ctx => {
                    ctx.player.give('minecraft:glass_bottle')
                })
        })
        .maxStackSize(64)
        .tooltip('好吃不硌牙')
})
