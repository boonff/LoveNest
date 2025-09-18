StartupEvents.registry('item', event => {
    // 罂粟西瓜汁
    event.create('foand:poppy_melon_juice')
        .food(food => {
            food.nutrition(6)
                .saturation(0.5)
                .eaten(ctx => {
                    ctx.player.give('minecraft:glass_bottle')
                })
        })
        .useDuration((stack, entity) => 40)
        .useAnimation('drink')
        .maxStackSize(16)
    
    // 罂粟西瓜片
    event.create('foand:poppy_melon_slice')
        .food(food => {
            food.nutrition(3)
                .saturation(0.5)
        })
        .useDuration((stack, entity) => 40)
        .useAnimation('eat')
})