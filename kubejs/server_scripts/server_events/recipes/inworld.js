ServerEvents.recipes(event => {
    // 铁砧砸黑曜石产生黑曜石粉 
    event.custom({
        "type": "anvillib:in_world_recipe",
        "compatible": true,
        "conflicting": [],
        "non_conflicting": [
            {
                "type": "anvillib:has_block",
                "offset": [
                    0.0,
                    -1.0,
                    0.0
                ],
                "predicate": {
                    "blocks": "minecraft:obsidian",
                    "properties": []
                }
            }
        ],
        "icon": {
            "id": "create:powdered_obsidian",
            "count": 1
        },
        "outcomes": [
            {
                "type": "anvillib:spawn_item",
                "item": "create:powdered_obsidian",
                "offset": [
                    0.0,
                    0.5,
                    0.0
                ]
            }
        ],
        "priority": 5,
        "max_efficiency": 1,
        "trigger": "anvilcraft:on_anvil_fall_on"
    })

    //TODO 金矿
})