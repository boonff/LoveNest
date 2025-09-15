// 使用物品事件注册新物品
StartupEvents.registry('item', event => {
    event.create('poppy_melon_slice')
        .food(food => {
            food
                .nutrition(3)
                .saturation(1)
        })
})