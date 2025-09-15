// 使用物品事件注册新物品
StartupEvents.registry('item', event => {
    event.create('poppy_melon_juice')
        .food(food => {
            food
                .hunger(3)
                .saturation(3)
        })
})