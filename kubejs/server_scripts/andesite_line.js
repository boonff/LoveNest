ServerEvents.recipes(event => {
    event.recipes.anvilcraft.block_compress(['minecraft:andesite', 'anvilcraft:sugar_block'], 'kubejs:andesite_sugar_block')
    event.recipes.anvilcraft.item_inject('minecraft:andesite', 'anvilcraft:sugar_block',  'kubejs:andesite_sugar_block')
})