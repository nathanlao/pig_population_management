System.register(["./PigsService", "./GreyPigs", "./ChestnutPigs", "./WhitePigs", "./BlackPigs"], function (exports_1, context_1) {
    "use strict";
    var PigsService_1, GreyPigs_1, ChestnutPigs_1, WhitePigs_1, BlackPigs_1, pigsController, PigCategory, breedsByCategory, selectedCategory, selectedBreed, dropdownItems, formData, closeModalBtns;
    var __moduleName = context_1 && context_1.id;
    function renderDistinctAttributesByCategory(category) {
        let attributeHTML = "";
        let breedDropdownHTML = "";
        if (category in breedsByCategory) {
            const breeds = breedsByCategory[category];
            breedDropdownHTML = `
            <div class="dropdown mb-2">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Choose the Breed
                </button>
                <ul class="dropdown-menu">
        `;
            breeds.forEach(breed => {
                breedDropdownHTML += `
                <li><a class="dropdown-item" href="#">${breed}</a></li>
            `;
            });
            breedDropdownHTML += `
                </ul>
            </div>
        `;
        }
        switch (category) {
            case "Grey":
                attributeHTML = breedDropdownHTML +
                    `<div class="input-group mb-3">
                    <span class="input-group-text">Swimming Ability (0-100)</span>
                    <input id="swimmingAbility" type="number" class="form-control" aria-label="swimmingAbility" aria-describedby="inputGroup-sizing-default" required>
                </div>`;
                break;
            case "Chestnut":
                attributeHTML = breedDropdownHTML +
                    `<div class="input-group mb-3">
                    <span class="input-group-text">Spoken Language</span>
                    <input id="language" type="text" class="form-control" aria-label="SpokenLanguage" aria-describedby="inputGroup-sizing-default" required>
                </div>`;
                break;
            case "White":
                attributeHTML = breedDropdownHTML +
                    `<div class="input-group mb-3">
                    <span class="input-group-text">Running Ability (0-100)</span>
                    <input id="runningAbility" type="number" class="form-control" aria-label="runningAbility" aria-describedby="inputGroup-sizing-default" required>
                </div>`;
                break;
            case "Black":
                attributeHTML = breedDropdownHTML +
                    `<div class="input-group mb-3">
                    <span class="input-group-text">Strength Ability (1-10)</span>
                    <input id="strengthAbility" type="number" class="form-control" aria-label="strengthAbility" aria-describedby="inputGroup-sizing-default" required>
                </div>`;
                break;
            default:
                attributeHTML = "";
        }
        return attributeHTML;
    }
    function setupBreedDropdownListener() {
        const dropdownItems = document.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', function (event) {
                var _a;
                const target = event.target;
                const buttonText = target.textContent || '';
                const button = (_a = target.closest('.dropdown')) === null || _a === void 0 ? void 0 : _a.querySelector('.dropdown-toggle');
                if (button) {
                    button.textContent = buttonText;
                    selectedBreed = buttonText.trim();
                }
            });
        });
    }
    function getPigFormData(selectedCategory) {
        const nameInput = document.getElementById("pigName");
        const heightInput = document.getElementById("pigHeight");
        const weightInput = document.getElementById("pigWeight");
        const personalityInput = document.getElementById("pigPersonality");
        const nameVal = nameInput.value;
        const heightVal = heightInput.value;
        const weightVal = weightInput.value;
        const personalityVal = personalityInput.value;
        try {
            switch (selectedCategory) {
                case "Grey":
                    const swimmingAbilityInput = document.getElementById("swimmingAbility");
                    const swimmingScoreVal = parseInt(swimmingAbilityInput.value, 10);
                    return new GreyPigs_1.GreyPigs(nameVal, selectedBreed, parseFloat(heightVal), parseFloat(weightVal), personalityVal, swimmingScoreVal);
                case "Chestnut":
                    const languageInput = document.getElementById("language");
                    const languageVal = languageInput.value;
                    return new ChestnutPigs_1.ChestnutPigs(nameVal, selectedBreed, parseFloat(heightVal), parseFloat(weightVal), personalityVal, languageVal);
                case "White":
                    const runningAbilityInput = document.getElementById("runningAbility");
                    const runningAbilityVal = parseInt(runningAbilityInput.value, 10);
                    return new WhitePigs_1.WhitePigs(nameVal, selectedBreed, parseFloat(heightVal), parseFloat(weightVal), personalityVal, runningAbilityVal);
                case "Black":
                    const strengthAbilityInput = document.getElementById("strengthAbility");
                    const strengthAbilityVal = parseInt(strengthAbilityInput.value, 10);
                    return new BlackPigs_1.BlackPigs(nameVal, selectedBreed, parseFloat(heightVal), parseFloat(weightVal), personalityVal, strengthAbilityVal);
            }
        }
        catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
            else {
                alert('An unexpected error occurred');
            }
            return null;
        }
    }
    function renderPigsTable() {
        const tableBodyEle = document.getElementById("table-content");
        if (tableBodyEle) {
            tableBodyEle.innerHTML = '';
            const pigsArray = pigsController.getAll();
            pigsArray.forEach((pig) => {
                insertPigIntoTable(pig);
            });
        }
    }
    function isGrey(pig) {
        return pig.category === 'Grey';
    }
    function isChestnut(pig) {
        return pig.category === 'Chestnut';
    }
    function isWhite(pig) {
        return pig.category === 'White';
    }
    function isBlack(pig) {
        return pig.category === 'Black';
    }
    function insertPigIntoTable(pig) {
        const tableBodyEle = document.getElementById("table-content");
        if (tableBodyEle) {
            const row = tableBodyEle.insertRow();
            row.innerHTML = `
            <tr>
                <td>${pig.name}</td>
                <td>${pig.category}</td>
                <td>
                    <button class="more-data-link btn btn-outline-dark btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#more-info"
                    >
                        more info
                    </button>
                </td>
                <td>
                    <button class="btn btn-outline-danger btn-sm delete-btn"
                        data-id="${pig.id}"
                    >
                        delete
                    </button>
                </td>
            </tr>
        `;
            // Render more info about the pig 
            const moreDataLink = row.querySelector('.more-data-link');
            if (moreDataLink) {
                moreDataLink.addEventListener('click', (event) => {
                    event.preventDefault();
                    let distinctAttributeHTML = '';
                    if (isGrey(pig)) {
                        distinctAttributeHTML += `
                        <div class="row">
                            <div class="col-6"><strong>Swimming Ability Score:</strong></div>
                            <div class="col-2">${pig._swimmingAbilityScore}</div>
                        </div>
                    `;
                    }
                    else if (isChestnut(pig)) {
                        distinctAttributeHTML += `
                        <div class="row">
                            <div class="col-6"><strong>Spoken language:</strong></div>
                            <div class="col-2">${pig._language}</div>
                        </div>
                    `;
                    }
                    else if (isWhite(pig)) {
                        distinctAttributeHTML += `
                        <div class="row">
                            <div class="col-6"><strong>Running Ability Score:</strong></div>
                            <div class="col-2">${pig._runningAbilityScore}</div>
                        </div>
                    `;
                    }
                    else if (isBlack(pig)) {
                        distinctAttributeHTML += `
                        <div class="row">
                            <div class="col-6"><strong>Strength Ability Score:</strong></div>
                            <div class="col-6">${pig._strengthAbilityScore}</div>
                        </div>
                    `;
                    }
                    const modalEl = document.getElementById("more-info");
                    const modalBody = modalEl.querySelector('.modal-body');
                    modalBody.innerHTML = `
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-6"><strong>Name:</strong></div>
                            <div class="col-6">${pig.name}</div>
                        </div>
                        <div class="row">
                            <div class="col-6"><strong>Breed:</strong></div>
                            <div class="col-6">${pig.breed}</div>
                        </div>
                        <div class="row">
                            <div class="col-6"><strong>Category:</strong></div>
                            <div class="col-6">${pig.category}</div>
                        </div>
                        <div class="row">
                            <div class="col-6"><strong>Height:</strong></div>
                            <div class="col-6">${pig.height}</div>
                        </div>
                        <div class="row">
                            <div class="col-6"><strong>Weight:</strong></div>
                            <div class="col-6">${pig.weight}</div>
                        </div>
                        <div class="row">
                            <div class="col-6"><strong>Personality:</strong></div>
                            <div class="col-6">${pig.personality}</div>
                        </div>
                        ${distinctAttributeHTML}
                </div>`;
                });
            }
            // Bind the delete button
            const deleteBtn = row.querySelector('.delete-btn');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', (event) => {
                    event.preventDefault();
                    const userConfirmed = confirm(`Are you sure you want to delete the pig with name: ${pig.name}?`);
                    if (userConfirmed) {
                        const idAttr = deleteBtn.getAttribute('data-id');
                        if (idAttr) {
                            const idToDelete = parseInt(idAttr, 10);
                            pigsController.delete(idToDelete);
                            row.remove();
                        }
                    }
                });
            }
        }
    }
    function clearForm() {
        // Clear the form data and dynamic attributes
        formData.reset();
        const dynamicAttributesEle = document.getElementById("dynamic-attributes");
        const categoryBtn = document.getElementById("category-btn");
        dynamicAttributesEle.innerHTML = '';
        categoryBtn.textContent = "Choose the Category";
    }
    return {
        setters: [
            function (PigsService_1_1) {
                PigsService_1 = PigsService_1_1;
            },
            function (GreyPigs_1_1) {
                GreyPigs_1 = GreyPigs_1_1;
            },
            function (ChestnutPigs_1_1) {
                ChestnutPigs_1 = ChestnutPigs_1_1;
            },
            function (WhitePigs_1_1) {
                WhitePigs_1 = WhitePigs_1_1;
            },
            function (BlackPigs_1_1) {
                BlackPigs_1 = BlackPigs_1_1;
            }
        ],
        execute: function () {
            pigsController = new PigsService_1.PigsController();
            (function (PigCategory) {
                PigCategory["Grey"] = "Grey";
                PigCategory["Chestnut"] = "Chestnut";
                PigCategory["White"] = "White";
                PigCategory["Black"] = "Black";
            })(PigCategory || (PigCategory = {}));
            breedsByCategory = {
                "Grey": ["Swimmer", "Diver", "Sailor"],
                "Chestnut": ["Polyglot", "Translator", "Linguist"],
                "White": ["Runner", "Sprinter", "Racer"],
                "Black": ["Lifter", "Builder", "Carrier"]
            };
            // Drop down text
            selectedCategory = '';
            selectedBreed = '';
            dropdownItems = document.querySelectorAll('.dropdown-item');
            dropdownItems.forEach(item => {
                item.addEventListener('click', function (event) {
                    // event.preventDefault();
                    var _a;
                    const target = event.target;
                    const buttonText = target.textContent || '';
                    const button = (_a = target.closest('.dropdown')) === null || _a === void 0 ? void 0 : _a.querySelector('.dropdown-toggle');
                    const dynamicAttributesContainer = document.getElementById("dynamic-attributes");
                    if (button && dynamicAttributesContainer) {
                        button.textContent = buttonText;
                        selectedCategory = buttonText.trim();
                        dynamicAttributesContainer.innerHTML = renderDistinctAttributesByCategory(buttonText.trim());
                        setupBreedDropdownListener();
                    }
                });
            });
            // Handld add new pig form submission
            formData = document.getElementById("new-pig-form");
            formData.addEventListener("submit", (event) => {
                event.preventDefault();
                if (!selectedCategory) {
                    alert("Please select a category.");
                    return;
                }
                if (!selectedBreed) {
                    alert("Please select a breed.");
                    return;
                }
                const pig = getPigFormData(selectedCategory);
                if (pig) {
                    pigsController.add(pig);
                    renderPigsTable();
                    clearForm();
                    // Close the modal by simulating a click on the close button
                    const closeButton = document.querySelector('[data-bs-dismiss="modal"]');
                    if (closeButton) {
                        closeButton.click();
                    }
                }
            });
            closeModalBtns = document.querySelectorAll('[data-bs-dismiss="modal"]');
            closeModalBtns.forEach(button => {
                button.addEventListener("click", () => {
                    clearForm();
                });
            });
            renderPigsTable();
        }
    };
});
