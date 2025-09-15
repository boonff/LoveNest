const { $ParseResults } = require("com.mojang.brigadier.ParseResults");
const { $BlockDrops } = require("dev.latvian.mods.kubejs.block.drop.BlockDrops");
const { $BlockDropSupplier } = require("dev.latvian.mods.kubejs.block.drop.BlockDropSupplier");
const { $SimpleAnimatedParticle } = require("net.minecraft.client.particle.SimpleAnimatedParticle");
const { $SignableCommand } = require("net.minecraft.network.chat.SignableCommand");

// 使用方块事件注册新方块
StartupEvents.registry('block', event => {
    event.create('poppy_melon')
        // 设置硬度
        .hardness(1.0)
        // 设置爆炸抗性
        .resistance(1.0)
        // 设置不可正确挖掘
        .requiresTool(false)
        // 设置材质
        .soundType('wood')
        // 设置完整方块
        .fullBlock(true)
        // 设置不透明
        .opaque(true)
        .tagBlock('minecraft:wood')
        .tagBlock('minecraft:mineable/axe') // 可用斧子挖掘
        .item(() => { })

})

