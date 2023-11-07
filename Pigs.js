System.register([], function (exports_1, context_1) {
    "use strict";
    var Pigs;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Pigs = class Pigs {
                constructor(name, breed, height, weight, personality, category) {
                    this.id = new Date().getTime(); // Ensure the id is unique
                    this.name = name;
                    this.breed = breed;
                    this.height = height;
                    this.weight = weight;
                    this.personality = personality;
                    this.category = category;
                }
            };
            exports_1("Pigs", Pigs);
        }
    };
});
