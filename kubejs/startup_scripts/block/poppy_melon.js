// 虞美人西瓜（由 lovenest-mod 移植：PoppyMelonBlocks.kt）
// 方块：虞美人西瓜、虞美人西瓜沙、直虞美人西瓜苗、弯虞美人西瓜苗
//
// 直苗/弯苗复刻 Kotlin 版（StemBlock / AttachedStemBlock），西瓜/沙用 KubeJS 原生类型

// 虞美人西瓜方块
StartupEvents.registry('block', event => {
    event.create('foand:poppy_melon')
        .copyPropertiesFrom(Block.getBlock('minecraft:cake')) // 继承 DESTROY 活塞反应：被推即碎（对应 Kotlin 版 PushReaction.DESTROY）
        .hardness(1.0)                         // 与 Kotlin 版 strength(1.0f) 一致
        .resistance(1.0)                       // 爆炸抗性
        .requiresTool(false)
        .soundType('wood')                     // 木质音效
        .fullBlock(true)                       // 完整方块
        .opaque(true)                          // 不透明
        .tagBlock('minecraft:mineable/axe')    // 可用斧子挖掘
        .drops(() => [                         // 掉落 3~9 片（noDrops 会生成 null loot table，活塞推碎不掉落）
            ['foand:poppy_melon_slice'],
            { type: 'minecraft:uniform', min: 3, max: 9 }
        ])
})

// 虞美人西瓜沙（FallingBlock 移植）
StartupEvents.registry('block', event => {
    event.create('foand:poppy_melon_sand', 'falling')
        .hardness(0.5)
        .resistance(0.5)
        .requiresTool(false)
        .sandSoundType()                        // 沙子音效
        .fullBlock(true)
        .opaque(true)
        .tagBlock('minecraft:sand')             // 视为沙子
        .tagBlock('minecraft:mineable/shovel')  // 可用铲子挖掘
})

// 直虞美人西瓜苗：复刻 Kotlin 版 StemBlock
// 原版行为：随机刻生长结瓜、下方无支撑即时掉落、破坏掉 1 粒西瓜种子
StartupEvents.registry('block', event => {
    const StemBlock = Java.loadClass('net.minecraft.world.level.block.StemBlock')
    const BlockBehaviour = Java.loadClass('net.minecraft.world.level.block.state.BlockBehaviour')
    const SoundType = Java.loadClass('net.minecraft.world.level.block.SoundType')
    const ResourceKey = Java.loadClass('net.minecraft.resources.ResourceKey')
    const Registries = Java.loadClass('net.minecraft.core.registries.Registries')
    const ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')

    const melonKey = ResourceKey.create(Registries.BLOCK, ResourceLocation.parse('foand:poppy_melon'))
    const attachedStemKey = ResourceKey.create(Registries.BLOCK, ResourceLocation.parse('foand:attached_poppy_melon_stem'))
    const melonSeedsKey = ResourceKey.create(Registries.ITEM, ResourceLocation.parse('minecraft:melon_seeds'))

    // 与 Kotlin 版一致的 properties（随机刻用于生长）
    const stemProps = BlockBehaviour.Properties.of()
        .strength(0.0)
        .noCollission()
        .sound(SoundType.GRASS)
        .randomTicks()

    event.createCustom('foand:poppy_melon_stem', () => new StemBlock(melonKey, attachedStemKey, melonSeedsKey, stemProps))
})

// 弯虞美人西瓜苗：直接继承原版 AttachedStemBlock（复刻 lovenest-mod PoppyMelonBlocks.kt）
// 原版 updateShape：facing 方向的虞美人西瓜消失时，立即变回直苗（任何原因，即时触发）
StartupEvents.registry('block', event => {
    const AttachedStemBlock = Java.loadClass('net.minecraft.world.level.block.AttachedStemBlock')
    const BlockBehaviour = Java.loadClass('net.minecraft.world.level.block.state.BlockBehaviour')
    const SoundType = Java.loadClass('net.minecraft.world.level.block.SoundType')
    const ResourceKey = Java.loadClass('net.minecraft.resources.ResourceKey')
    const Registries = Java.loadClass('net.minecraft.core.registries.Registries')
    const ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')

    const stemKey = ResourceKey.create(Registries.BLOCK, ResourceLocation.parse('foand:poppy_melon_stem'))
    const melonKey = ResourceKey.create(Registries.BLOCK, ResourceLocation.parse('foand:poppy_melon'))
    const melonSeedsKey = ResourceKey.create(Registries.ITEM, ResourceLocation.parse('minecraft:melon_seeds'))

    // 与 Kotlin 版一致的 properties
    const attachedProps = BlockBehaviour.Properties.of()
        .strength(0.0)
        .noCollission()
        .sound(SoundType.GRASS)

    event.createCustom('foand:attached_poppy_melon_stem', () => new AttachedStemBlock(stemKey, melonKey, melonSeedsKey, attachedProps))
})
