// 罂粟西瓜方块
StartupEvents.registry('block', event => {
    event.create('poppy_melon')               // 设置方块 ID
        .hardness(1.0)                        // 设置硬度
        .resistance(1.0)                      // 设置爆炸抗性
        .requiresTool(false)                  // 设置不可正确挖掘
        .soundType('wood')                     // 设置材质
        .fullBlock(true)                       // 设置完整方块
        .opaque(true)                          // 设置不透明
        .tagBlock('minecraft:sword_efficient') // 可用剑高效挖掘
        .tagBlock('minecraft:mineable/axe')   // 可用斧子挖掘
        .drops(() => [                         // 设置掉落
            ['kubejs:poppy_melon_slice'], { type: 'minecraft:uniform', min: 3, max: 7 }
        ])
})

// 罂粟西瓜沙子方块
StartupEvents.registry('block', event => {
    event.create('poppy_melon_sand', "falling") // 设置方块 ID，类型为 FallingBlock
        .hardness(0.5)                          // 设置硬度
        .resistance(0.5)                        // 设置爆炸抗性
        .requiresTool(false)                     // 设置不可正确挖掘
        .soundType('sand')                       // 设置材质
        .fullBlock(true)                         // 设置完整方块
        .opaque(true)                            // 设置不透明
        .tagBlock('minecraft:sand')              // 添加沙子标签，使其具有沙子特性
        .tagBlock('minecraft:mineable/shovel')  // 可用铲子挖掘
        .sandSoundType()                         // 设置沙子踩踏声音
})

const directions = {
    'north': [0, 0, -1],
    'south': [0, 0, 1],
    'west': [-1, 0, 0],
    'east': [1, 0, 0]
};
// 直罂粟西瓜苗
StartupEvents.registry('block', event => {
    event.create('poppy_melon_stem')
        .hardness(0.0)
        .resistance(0.0)
        .requiresTool(false)
        .soundType('grass')
        .fullBlock(false)
        .opaque(false)
        .noCollision() // 设置无碰撞箱
        .noDrops() // 设置不掉落任何物品z
        //TODO .noItem() // 设置不作为物品存在
        .tagBlock('minecraft:replaceable_plant') // 可被其他方块替换
        .tagBlock('minecraft:mineable/hoe') // 可用锄头挖掘
        .randomTick(event => {
            let pos = event.block.pos;
            let level = event.level;
            const keys = Object.keys(directions);
            const randomKey = keys[Math.floor(Math.random() * keys.length)];
            const offset = directions[randomKey];

            const belowBlock = level.getBlock(pos.offset(offset[0], offset[1] - 1, offset[2]));
            console.log(`belowPos: ${pos.offset(offset[0], offset[1] - 1, offset[2])}`);
            console.log(`belowBlock: ${belowBlock}`);
            if (
                !belowBlock.hasTag('minecraft:sand') &&
                !belowBlock.hasTag('minecraft:dirt') &&
                belowBlock != 'kubejs:poppy_melon_sand'
            ) {
                return; // 如果下面的方块不是"沙土"或罂粟西瓜沙子，则不进行生长
            }

            const abovePos = pos.offset(offset[0], offset[1], offset[2]);
            if (level.getBlock(abovePos) == 'minecraft:air') {
                level.getBlock(pos).set('kubejs:poppy_attached_melon_stem', { facing: randomKey });
                level.getBlock(abovePos).set('kubejs:poppy_melon');
            }
        })
})

// 弯罂粟西瓜苗
StartupEvents.registry('block', event => {
    event.create('poppy_attached_melon_stem')
        .hardness(0.0)
        .resistance(0.0)
        .requiresTool(false)
        .soundType('grass')
        .fullBlock(false)
        .opaque(false)
        .noCollision() // 设置无碰撞箱
        .noDrops() // 设置不掉落任何物品
        //TODO .noItem() // 设置不作为物品存在
        .property(BlockProperties.HORIZONTAL_FACING) // 设置水平朝向属性
        .tagBlock('minecraft:replaceable_plant') // 可被其他方块替换
        .tagBlock('minecraft:mineable/hoe') // 可用锄头挖掘
})

