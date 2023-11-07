System.register(["./Pigs"], function (exports_1, context_1) {
    "use strict";
    var Pigs_1, BlackPigs;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Pigs_1_1) {
                Pigs_1 = Pigs_1_1;
            }
        ],
        execute: function () {
            BlackPigs = class BlackPigs extends Pigs_1.Pigs {
                constructor(name, breed, height, weight, personality, strengthAbilityScore) {
                    super(name, breed, height, weight, personality, 'Black');
                    this._strengthAbilityScore = 1;
                    this.strengthAbilityScore = strengthAbilityScore;
                }
                get strengthAbilityScore() {
                    return this._strengthAbilityScore;
                }
                set strengthAbilityScore(value) {
                    if (value < 1 || value > 10) {
                        throw new Error('Strength ability score must be between 1 and 10.');
                    }
                    this._strengthAbilityScore = value;
                }
            };
            exports_1("BlackPigs", BlackPigs);
        }
    };
});
