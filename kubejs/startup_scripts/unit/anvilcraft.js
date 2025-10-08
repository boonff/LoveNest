const anvilcraft = "anvilcraft"


let anvilcraftRecipes = {
    event: null,
    init: function (event) {
        this.event = event;
        event.recipes.anvilcraft = this;
        let self = this;
        let normal_recipes = [
            'anvil_collision',
            'blasting',
            'block_compress',
            'block_crush',
            'block_smear',
            'boiling',
            'bulging',
            'charger_charging',
            'concrete',
            'cooking',
            'cooling',
            'eight_to_one_smithing',
            'four_to_one_smithing',
            'item_compress',
            'item_crush',
            'item_inject',
            'jewel_crafting',
            'mass_inject',
            'mesh',
            'mineral_fountain',
            'mineral_fountain_chance',
            'mob_transform',
            'mob_transform_with_item',
            'multiblock',
            'multiblock_conversion',
            'shaped',
            'smelting',
            'smithing',
            'squeezing',
            'stamping',
            'stamping_unique_items',
            'stonecutting',
            'super_heating',
            'time_warp',
            'two_to_one_smithing',
            'unpack'
        ];

        normal_recipes.forEach(recipe => {
            self[recipe] = (custom) => {
                custom.type = `${anvilcraft}:${recipe}`
                return event.custom(custom);
            }
        });
    }
}
global.anvilcraftRecipes = anvilcraftRecipes