const anvilcraft = "anvilcraft"

let anvilcraftRecipes = {
    event: null,
    init: function (event) {
        this.event = event;
        event.recipes.create = this;

        let self = this;
        let normal_recipes = [
            'item_crush',
        ];

        normal_recipes.forEach(recipe => {
            self[recipe] = (custom) => {
                custom.type = `${anvilcraft}:${recipe}`
                return event.custom({ custom })
            }
        });
    }
}