function getIngredient(input) {
    let result;
    if ((typeof input) === "string" || Item.isItem(input)) {
        result = Ingredient.of(input);
    } else if ((typeof input) === "object" && 'id' in input && 'amount' in input) {
        result = { type: 'fluid_stack', fluid: input.id, amount: input.amount }
    } else if (Array.isArray(input) && _item != []) {
        result = getIngredient(input[0])
    } else {
        result = input;
    }
    return result;
}

function getItem(input) {
    let result;
    if (typeof input === "string" || Item.isItem(input)) {
        result = Item.of(input);
    } else if ((typeof input) === "object" && 'id' in input && 'amount' in input) {
        result = getFluid(input)
    } else if (Array.isArray(input) && input != []) {
        result = getItem(input[0])
    } else {
        result = input;
    }
    return result;
}

function getFluid(input) {
    let result;
    if (typeof input === "string" || Item.isItem(input)) {
        result = Fluid.of(input, 1000);
    } else if (Array.isArray(input) && input != []) {
        result = getFluid(input[0])
    } else
        result = input;
    return result;
}

function getBlock(input) {
    let result;
    if (typeof input === "string") {
        result = BlockStatePredicate.of(input);
    } else if (Array.isArray(input) && input != []) {
        result = getBlock(input[0])
    } else
        result = input;
    return result;
}

function getIngredients(ingredients) {
    if (Array.isArray(ingredients)) {
        return ingredients.map(i => getIngredient(i))
    } else {
        return [getIngredient(ingredients)]
    }
}

function getOutputs(outputs) {
    if (Array.isArray(outputs)) {
        return outputs.map(i => getItem(i))
    } else {
        return [getItem(outputs)]
    }
}

global.createSequenced = [
    'deploying',
    'filling',
    'pressing',
    'cutting'
].reduce((acc, key) => {
    acc[key] = (outputs, inputs) => {
        return {
            "type": "create:" + key,
            ingredients: getIngredients(inputs),
            results: getOutputs(outputs)
        }
    };
    return acc;
}, {});

let createRecipes = {
    event: null,
    init: function (e) {
        this.event = e;
        e.recipes.create = this;

        let self = this;
        let normal_recipes = [
            'filling',
            'emptying',
            'mixing',
            'compacting',
            'cutting',
            'deploying',
            'haunting',
            'item_application',
            'milling',
            'pressing',
            'sandpaper_polishing',
            'splashing',
            'crushing',
        ];

        normal_recipes.forEach(recipe => {
            self[recipe] = (outputs, inputs) => {
                let r = Object(e.custom({
                    type: 'create:' + recipe,
                    ingredients: getIngredients(inputs),
                    results: getOutputs(outputs)
                }))
                r['heated'] = () => { r.merge({ heat_requirement: "heated" }); return r };
                r['superheated'] = () => { r.merge({ heat_requirement: "superheated" }); return r };
                r['keepHeldItem'] = (input) => { r.merge({ keep_held_item: input }); return r };
                r['processingTime'] = (input) => { r.merge({ processing_time: input }); return r }
                return r;
            }
        });
    },
    sequenced_assembly: function (outputs, input, recipes) {
        let r = Object(this.event.custom({
            type: "create:sequenced_assembly",
            ingredient: getIngredients(input),
            results: getOutputs(outputs),
            sequence: recipes,
        }))
        r['loops'] = (input) => { r.merge({ loops: input }); return r };
        r['transitionalItem'] = (input) => { r.merge({ transitional_item: getItem(input) }); return r };
        return r;
    },
    mechanical_crafting(output, pattern, key) {
        let r = Object(this.event.custom({
            type: "create:mechanical_crafting",
            category: "misc",
            accept_mirrored: false,
            key: key,
            pattern: pattern,
            result: getItem(output)
        }))
        r['showNotification'] = (input) => { r.merge({ show_notification: input }); return r };
        r['acceptMirrored'] = () => { r.merge({ accept_mirrored: true }); return r };
        return r;
    }
}



global.createRecipes = createRecipes;
