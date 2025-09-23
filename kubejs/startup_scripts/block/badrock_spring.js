StartupEvents.registry('block', event => {
    event.create('foand:melt_gem_block') // 熔炼宝石块
        .soundType('glass')
        .noDrops()

    // 宝石涌泉
    event.create('foand:gem_spring')
        .unbreakable()  // 设置为不可破坏
        .requiresTool(false) // 设置不可正确挖掘
        .soundType('stone')// 设置材质
        .fullBlock(true)  // 设置完整方块
        .opaque(true)  // 设置不透明
        .randomTick(event => {
            let pos = event.block.pos;
            let level = event.level;
            let randomChance = Math.random();
            if (randomChance < 1) {
                const abovePos = pos.offset(0, 1, 0);// 获取当前方块正上方的位置
                // 检查上方位置的方块是否是“可替换”的
                if (level.getBlock(abovePos) == 'minecraft:air') {
                    level.getBlock(abovePos).set('foand:melt_gem_block');// 在上方位置放置 anvilcraft:melt_gem 方块
                    // TODO 添加一些游戏内提示音效或粒子效果
                    // level.playSound(null, abovePos.getX(), abovePos.getY(), abovePos.getZ(), 'block.anvil.place', 1.0, 1.0);
                    // level.addParticle('cloud', abovePos.getX() + 0.5, abovePos.getY() + 0.5, abovePos.getZ() + 0.5, 0, 0, 0);
                }
            }
        })

    // 熔岩涌泉
    event.create('foand:lava_spring')
        .unbreakable()       // 设置为不可破坏
        .requiresTool(false) // 设置不可正确挖掘
        .soundType('stone')  // 设置材质
        .fullBlock(true)     // 设置完整方块
        .opaque(true)        // 设置不透明
        .lightLevel(3)       // 设置光照等级为3
        .randomTick(event => {
            let pos = event.block.pos;
            let level = event.level;
            let randomChance = Math.random();
            if (randomChance < 0.1) {
                const topPos = pos.offset(0, 1, 0);
                const top2Pos = pos.offset(0, 2, 0);
                if (level.getBlock(topPos).id == 'minecraft:air'
                    && level.getBlock(top2Pos).id == 'minecraft:air') {
                    level.getBlock(topPos).set('minecraft:lava');
                    // TODO 添加一些游戏内提示音效或粒子效果
                    // level.playSound(null, abovePos.getX(), abovePos.getY(), abovePos.getZ(), 'block.anvil.place', 1.0, 1.0);
                    // level.addParticle('cloud', abovePos.getX() + 0.5, abovePos.getY() + 0.5, abovePos.getZ() + 0.5, 0, 0, 0);
                }
                else if (level.getBlock(topPos).id == 'minecraft:water') {
                    level.getBlock(topPos).set('minecraft:magma_block');
                }
            }
        })
});