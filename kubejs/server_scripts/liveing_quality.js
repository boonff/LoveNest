//铁器时代的配方

//将罂粟花冶炼成铁粒
ServerEvents.recipes(event => {
    event.smelting('minecraft:iron_nugget', 'minecraft:poppy').xp(0.1).cookingTime(200);
})

//将竹子合成竹板
ServerEvents.recipes(event => {
    event.shaped('minecraft:bamboo_planks', [
        'BB',
        'BB'
    ], {
        B: 'minecraft:bamboo'
    })
})

//修改原版竹块的配方
ServerEvents.recipes(event => {
    event.remove({ output: 'minecraft:bamboo_block' })
    event.shaped('minecraft:bamboo_block', [
        'BBB',
        'B B',
        'BBB'
    ], {
        B: 'minecraft:bamboo'
    })
})