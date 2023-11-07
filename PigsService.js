System.register([], function (exports_1, context_1) {
    "use strict";
    var PigsController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            PigsController = class PigsController {
                constructor() {
                    this.Pigs = JSON.parse(localStorage.getItem('PigsArray') || '[]');
                }
                add(pig) {
                    this.Pigs.push(pig);
                    localStorage.setItem('PigsArray', JSON.stringify(this.Pigs));
                }
                getAll() {
                    const pigsArray = JSON.parse(localStorage.getItem('PigsArray') || '[]');
                    // Group pigs by category
                    const groupedPigs = pigsArray.reduce((acc, pig) => {
                        if (!acc[pig.category]) {
                            acc[pig.category] = [];
                        }
                        // Add the current pig into the appropriate category
                        acc[pig.category].push(pig);
                        return acc;
                    }, {});
                    // Sort the category (keys)
                    const sortedCategories = Object.keys(groupedPigs).sort();
                    // Sort pigs by name within each category
                    const sortedPigs = [];
                    sortedCategories.forEach((category) => {
                        groupedPigs[category].sort((a, b) => a.name.localeCompare(b.name));
                        sortedPigs.push(...groupedPigs[category]); // concatenate arrays
                    });
                    return sortedPigs;
                }
                delete(id) {
                    this.Pigs = this.Pigs.filter((pig) => {
                        return pig.id != id;
                    });
                    localStorage.setItem('PigsArray', JSON.stringify(this.Pigs));
                }
            };
            exports_1("PigsController", PigsController);
        }
    };
});
