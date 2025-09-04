// 使用方块事件注册新方块
StartupEvents.registry('block', event => {
    event.create('gem_spring')
        // 设置为不可破坏
        .unbreakable()
        // 设置不可正确挖掘
        .requiresTool(false)
        // 设置材质
        .soundType('stone')
        // 设置完整方块
        .fullBlock(true)
        // 设置不透明
        .opaque(true)
        .randomTick(event => {
            let pos = event.block.pos;
            let level = event.level;

            let randomChance = Math.random();
            // 判断10%的概率是否触发
            if (randomChance < 1) { // 10%的概率

                // 获取当前方块正上方的位置
                const abovePos = pos.offset(0, 1, 0);

                // 检查上方位置的方块是否是“可替换”的（如空气、草、雪等，避免覆盖其他方块）
                if (level.getBlock(abovePos) == 'minecraft:air' || level.getBlock(abovePos)()) {

                    // 在上方位置放置 anvilcraft:melt_gem 方块
                    level.getBlock(abovePos).set('anvilcraft:melt_gem');
                    // 你也可以在这里添加一些游戏内提示音效或粒子效果
                    // level.playSound(null, abovePos.getX(), abovePos.getY(), abovePos.getZ(), 'block.anvil.place', 1.0, 1.0);
                    // level.addParticle('cloud', abovePos.getX() + 0.5, abovePos.getY() + 0.5, abovePos.getZ() + 0.5, 0, 0, 0);
                }
            }


        })

});