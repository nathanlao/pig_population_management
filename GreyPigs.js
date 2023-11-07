System.register(["./Pigs"], function (exports_1, context_1) {
    "use strict";
    var Pigs_1, GreyPigs;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Pigs_1_1) {
                Pigs_1 = Pigs_1_1;
            }
        ],
        execute: function () {
            GreyPigs = class GreyPigs extends Pigs_1.Pigs {
                constructor(name, breed, height, weight, personality, swimmingAbilityScore) {
                    super(name, breed, height, weight, personality, 'Grey');
                    this._swimmingAbilityScore = 0;
                    this.swimmingAbilityScore = swimmingAbilityScore; // Invoke setter and catching the invalid error 
                }
                get swimmingAbilityScore() {
                    return this._swimmingAbilityScore;
                }
                set swimmingAbilityScore(value) {
                    if (value < 0 || value > 100) {
                        throw new Error('Swimming ability score must be between 0 and 100.');
                    }
                    this._swimmingAbilityScore = value;
                }
            };
            exports_1("GreyPigs", GreyPigs);
        }
    };
});
