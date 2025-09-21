StartupEvents.registry('item', event => {
    event.create('foand:poppy_melon_juice') // 罂粟西瓜汁
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


    event.create('foand:poppy_melon_slice') // 罂粟西瓜片
        .food(food => {
            food.nutrition(3)
                .saturation(0.5)
        })
        .useDuration((stack, entity) => 40)
        .useAnimation('eat')
})