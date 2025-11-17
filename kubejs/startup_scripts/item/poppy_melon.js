StartupEvents.registry('item', event => {
    event.create('foand:poppy_melon_juice') // 罂粟西瓜汁
        .food(food => {
            food.nutrition(4)
                .saturation(0.6)
                .eaten(ctx => {
                    if (ctx.player != null) {
                        ctx.player.give('minecraft:glass_bottle')
                    } else {
                        let pos = ctx.entity.position() 
                        const itemEntity = ctx.level.createEntity('item') 
                        itemEntity.item = Item.of('minecraft:glass_bottle', 1)  // 设置掉落物为瓶子，数量为1
                        itemEntity.setPosition(pos.x + 0.5, pos.y + 0.5, pos.z + 0.5) //掉落物偏移
                        itemEntity.spawn()  // 生成掉落物实体到世界
                    }
                })
        })
        .useDuration((stack, entity) => 40)
        .useAnimation('drink')
        .maxStackSize(16)


    event.create('foand:poppy_melon_slice') // 罂粟西瓜片
        .food(food => {
            food.nutrition(3)
                .saturation(0.5)
                .eaten(ctx => {
                    if (ctx.player != null) {
                        ctx.player.give('minecraft:iron_nugget')
                    } else {
                        let pos = ctx.entity.position() 
                        const itemEntity = ctx.level.createEntity('item') 
                        itemEntity.item = Item.of('minecraft:iron_nugget', 1)  // 设置掉落物为铁粒，数量为1
                        itemEntity.setPosition(pos.x + 0.5, pos.y + 0.5, pos.z + 0.5) //掉落物偏移
                        itemEntity.spawn()  // 生成掉落物实体到世界
                    }
                })
        })
        .useDuration((stack, entity) => 40)
        .useAnimation('eat')
})
