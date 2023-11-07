System.register(["./Pigs"], function (exports_1, context_1) {
    "use strict";
    var Pigs_1, WhitePigs;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Pigs_1_1) {
                Pigs_1 = Pigs_1_1;
            }
        ],
        execute: function () {
            WhitePigs = class WhitePigs extends Pigs_1.Pigs {
                constructor(name, breed, height, weight, personality, runningAbilityScore) {
                    super(name, breed, height, weight, personality, "White");
                    this._runningAbilityScore = 0;
                    this.runningAbilityScore = runningAbilityScore; // Invoke setter and catching the invalid error 
                }
                get runningAbilityScore() {
                    return this._runningAbilityScore;
                }
                set runningAbilityScore(value) {
                    if (value < 0 || value > 100) {
                        throw new Error('Running ability score must be between 0 and 100.');
                    }
                    this._runningAbilityScore = value;
                }
            };
            exports_1("WhitePigs", WhitePigs);
        }
    };
});
