ItemEvents.modification(event => {
    event.modify('minecraft:bamboo', item => {
        item.setFood({
            nutrition: 2,      // 恢复饱食度
            saturation: 0.5,   // 饱和度
            eatSeconds: 10      // 食用时间，单位秒
        })
    })
})
