function getIngredient(input) {
    let result;
    if (typeof input === "string" ||
        ('count' in input && 'id' in input)
    ) {
        result = Ingredient.of(input);
    } else if (Array.isArray(input) && _item != [])
        result = getIngredient(input[0])
    else
        result = input;
    return result;
}

function getItem(input) {
    let result;
    if (typeof input === "string") {
        result = Item.of(input);
    } else if (Array.isArray(input) && _item != [])
        result = getItem(input[0])
    else
        result = input;
    return result;
}

function getFluid(input) {
    let result;
    if (typeof input === "string") {
        result = Fluid.of(input, 1000);
    } else if (Array.isArray(input) && input != []) {
        result = getFluid(input[0])
    } else
        result = input;
    return result;
}

let createRecipes = {
    event: null,
    init: function (e) {
        this.event = e;
        e.recipes.create = this;
    },
    filling: function (_result, _input) {
        let fluid = getFluid(_input[0]);
        let input = getIngredient(_input[1]);
        let result = getItem(_result);

        this.event.custom({
            type: 'create:filling',
            ingredients: [
                input,
                { type: 'fluid_stack', fluid: fluid.id, amount: fluid.amount }
            ],
            results: [result]
        })

    },
    emptying: function (_result, _input) {
        let fluid = getFluid(_result[0]);
        let input = getIngredient(_input);
        let result = getItem(_result[1]);

        return this.event.custom({
            type: "create:emptying",
            ingredients: [
                input
            ],
            results: [
                result,
                fluid
            ]
        })
    }
}

global.createRecipes = createRecipes;