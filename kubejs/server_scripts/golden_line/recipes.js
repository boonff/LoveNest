ServerEvents.recipes(event => {
    global.createRecipes.init(event);
    event.remove({ mod: 'createoreexcavation' })

    event.recipes.createoreexcavation.vein('{"text": "猪灵古战场"}', 'minecraft:piglin_head')
        .placement(128, 8, 114514)
        .biomeWhitelist('c:is_nether')
        .alwaysInfinite()
        .priority(10)
        .id('kubejs:golden_ore_nether')

    event.recipes.createoreexcavation.drilling('minecraft:piglin_head[custom_name=\'"猪灵遗骸"\']', 'kubejs:golden_ore_nether', 100)

    event.recipes.create.compacting('minecraft:enchanted_golden_apple', 'minecraft:shulker_box[container=[{item:{count:64,id:"minecraft:gold_block"},slot:0},{item:{count:64,id:"minecraft:gold_block"},slot:1},{item:{count:64,id:"minecraft:gold_block"},slot:2},{item:{count:64,id:"minecraft:gold_block"},slot:3},{item:{count:64,id:"minecraft:gold_block"},slot:4},{item:{count:64,id:"minecraft:gold_block"},slot:5},{item:{count:64,id:"minecraft:gold_block"},slot:6},{item:{count:64,id:"minecraft:gold_block"},slot:7},{item:{count:64,id:"minecraft:gold_block"},slot:8},{item:{count:64,id:"minecraft:gold_block"},slot:9},{item:{count:64,id:"minecraft:gold_block"},slot:10},{item:{count:64,id:"minecraft:gold_block"},slot:11},{item:{count:64,id:"minecraft:gold_block"},slot:12},{item:{count:1,id:"minecraft:apple"},slot:13},{item:{count:64,id:"minecraft:gold_block"},slot:14},{item:{count:64,id:"minecraft:gold_block"},slot:15},{item:{count:64,id:"minecraft:gold_block"},slot:16},{item:{count:64,id:"minecraft:gold_block"},slot:17},{item:{count:64,id:"minecraft:gold_block"},slot:18},{item:{count:64,id:"minecraft:gold_block"},slot:19},{item:{count:64,id:"minecraft:gold_block"},slot:20},{item:{count:64,id:"minecraft:gold_block"},slot:21},{item:{count:64,id:"minecraft:gold_block"},slot:22},{item:{count:64,id:"minecraft:gold_block"},slot:23},{item:{count:64,id:"minecraft:gold_block"},slot:24},{item:{count:64,id:"minecraft:gold_block"},slot:25},{item:{count:64,id:"minecraft:gold_block"},slot:26}]]')

})