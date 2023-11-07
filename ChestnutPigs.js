System.register(["./Pigs"], function (exports_1, context_1) {
    "use strict";
    var Pigs_1, ChestnutPigs;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Pigs_1_1) {
                Pigs_1 = Pigs_1_1;
            }
        ],
        execute: function () {
            ChestnutPigs = class ChestnutPigs extends Pigs_1.Pigs {
                constructor(name, breed, height, weight, personality, language) {
                    super(name, breed, height, weight, personality, 'Chestnut');
                    this._language = "";
                    this.language = language;
                }
                get language() {
                    return this._language;
                }
                set language(value) {
                    this._language = value;
                }
            };
            exports_1("ChestnutPigs", ChestnutPigs);
        }
    };
});
