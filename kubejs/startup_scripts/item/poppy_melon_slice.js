// 罂粟西瓜片
StartupEvents.registry('item', event => {
    event.create('poppy_melon_slice')
        .food(food => {
            food.nutrition(3)
                .saturation(0.5)
        })
        .useDuration((stack, entity) => 40) // 设置食用时间，单位 ticks
        .useAnimation('eat')
})