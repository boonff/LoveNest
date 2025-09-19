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
    },
    filling: function (outputs, inputs) {
        this.event.custom({
            type: 'create:filling',
            ingredients: getIngredients(inputs),
            results: getOutputs(outputs)
        })

    },
    emptying: function (outputs, inputs) {

        return this.event.custom({
            type: "create:emptying",
            ingredients: getIngredients(inputs),
            results: getOutputs(outputs)
        })
    },
    mixing: function (outputs, inputs) {
        return this.event.custom({
            "type": "create:mixing",
            ingredients: getIngredients(inputs),
            results: getOutputs(outputs)
        })
    },
    sequenced_assembly: function (outputs, input, recipes) {
        let thisEvent = this.event;
        return {
            event: thisEvent,
            outputs: getOutputs(outputs),
            input: getIngredient(input),
            recipes: recipes,
            inter: null,
            _loops: null,
            transitionalItem: function (inter) {
                this.inter = getItem(inter);
                if (this.inter && this._loops) return this._recipe();
                return this;
            },
            loops: function (times) {
                this._loops = times;
                if (this.inter && this._loops) return this._recipe();
                return this;
            },
            _recipe: function () {
                return this.event.custom({
                    type: "create:sequenced_assembly",
                    loops: this._loops,
                    ingredient: this.input,
                    results: this.outputs,
                    sequence: this.recipes,
                    transitional_item: this.inter
                })
            }
        }
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