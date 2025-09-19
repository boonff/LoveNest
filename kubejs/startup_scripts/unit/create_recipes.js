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

let createRecipes = {
    event: null,
    init: function (e) {
        this.event = e;
        e.recipes.create = this;
    },
    filling: function (_result, _input) {
        let fluid = getIngredient(_input[0]);
        let input = getIngredient(_input[1]);
        let result = getItem(_result);

        this.event.custom({
            type: 'create:filling',
            ingredients: [
                input,
                fluid
            ],
            results: [result]
        })

    },
    emptying: function (_result, _input) {
        let fluid = getItem(_result[0]);
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
    },
    mixing: function (outputs, inputs) {
        return this.event.custom({
            "type": "create:mixing",
            "ingredients": inputs.map(input => getIngredient(input)),
            "results": outputs.map(output => getItem(output))
        })
    },
    sequenced_assembly: function (outputs, input, recipes) {
        let thisEvent = this.event;
        return {
            event: thisEvent,
            outputs: outputs.map(output => getItem(output)),
            input: getIngredient(input),
            recipes: recipes,
            inter: null,
            _loops: null,
            transitionalItem: function (inter) {
                this.inter = getItem(inter);
                if (this.inter && this._loops) return this._recipe();
                return this;
            },
            loops: function (items) {
                this._loops = items;
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
        let fluid = getFluid(inputs[0]);
        let input = getIngredient(inputs[1]);
        let result = getItem(output);
        return {
            type: 'create:filling',
            ingredients: [
                input,
                { type: 'fluid_stack', fluid: fluid.id, amount: fluid.amount }
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