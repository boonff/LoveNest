// 熔岩涌泉
StartupEvents.registry('block', event => {
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
                if (level.getBlock(abovePos) == 'minecraft:air' || level.getBlock(abovePos)()) {
                    level.getBlock(abovePos).set('anvilcraft:melt_gem');// 在上方位置放置 anvilcraft:melt_gem 方块
                    // TODO 添加一些游戏内提示音效或粒子效果
                    // level.playSound(null, abovePos.getX(), abovePos.getY(), abovePos.getZ(), 'block.anvil.place', 1.0, 1.0);
                    // level.addParticle('cloud', abovePos.getX() + 0.5, abovePos.getY() + 0.5, abovePos.getZ() + 0.5, 0, 0, 0);
                }
            }


        })

});