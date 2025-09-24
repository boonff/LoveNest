function getIngredient(input) {
    let result;
    if ((typeof input) === "string" || Item.isItem(input)) {
        result = Ingredient.of(input);
    } else if ('id' in input && 'amount' in input) {
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
    if (typeof input === "string") {
        result = Item.of(input);
    } else if ('id' in input && 'amount' in input) {
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
    if (typeof input === "string") {
        result = Fluid.of(input, 1000);
    } else if (Array.isArray(input) && input != []) {
        result = getFluid(input[0])
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
                r['heated'] = () => { r.merge({ heat_requirement: "heated" }) };
                r['superheated'] = () => { r.merge({ heat_requirement: "heated" }) };
                r['keepHeldItem'] = (input) => { r.merge({ keep_held_item: input }) };
                r['processingTime'] = (input) => { r.merge({ processing_time: input }) }
                return r;
            }
        });
    },
    sequenced_assembly: function (outputs, input, recipes) {
        let r = Object(this.event.custom({
            type: "create:sequenced_assembly",
            ingredient: input,
            results: outputs,
            sequence: recipes,
        }))

        r['loops'] = (input) => { r.merge({ loops: input }) };
        r['transitionalItem'] = (input) => { r.merge({ transitional_item: input }) };

        return r;
    }
}

global.createRecipes = createRecipes;


global.createSequenced = {
    createDeploying(output, inputs) {
        return {
            "type": "create:deploying",
            "ingredients": inputs.map(input => getIngredient(input)),
            "results": [getItem(output)]
        }
    },
    createFilling(output, inputs) {
        let fluid = getItem(inputs[0]);
        let input = getIngredient(inputs[1]);
        let result = getItem(output);
        return {
            type: 'create:filling',
            ingredients: [
                input,
                fluid
            ],
            results: [result]
        }
    },
    createPressing(output, input) {
        return {
            "type": "create:pressing",
            "ingredients": [getIngredient(input)],
            "results": [getItem(output)]
        }
    },
    createCutting(output, input) {
        return {
            "type": "create:cutting",
            "ingredients": [getIngredient(input)],
            "results": [getItem(output)]
        }
    }
}