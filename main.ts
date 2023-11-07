import { PigsController } from "./PigsService"
import { Pigs } from "./Pigs"
import { GreyPigs } from "./GreyPigs";
import { ChestnutPigs } from "./ChestnutPigs";
import { WhitePigs } from "./WhitePigs";
import { BlackPigs } from "./BlackPigs";

const pigsController = new PigsController();

enum PigCategory {
    Grey = "Grey",
    Chestnut = "Chestnut",
    White = "White",
    Black = "Black"
}

const breedsByCategory: Record<PigCategory, string[]> = {
    "Grey": ["Swimmer", "Diver", "Sailor"],
    "Chestnut": ["Polyglot", "Translator", "Linguist"],
    "White": ["Runner", "Sprinter", "Racer"],
    "Black": ["Lifter", "Builder", "Carrier"]
}

// Drop down text
let selectedCategory = '';
let selectedBreed = '';

const dropdownItems = document.querySelectorAll('.dropdown-item');
dropdownItems.forEach(item => {
    item.addEventListener('click', function(event) {
        // event.preventDefault();
        
        const target = event.target as HTMLElement
        const buttonText = target.textContent || '';
        const button = target.closest('.dropdown')?.querySelector('.dropdown-toggle') as HTMLButtonElement;
        const dynamicAttributesContainer = document.getElementById("dynamic-attributes") as HTMLElement;

        if (button && dynamicAttributesContainer) {
            button.textContent = buttonText;
            selectedCategory = buttonText.trim();

            dynamicAttributesContainer.innerHTML = renderDistinctAttributesByCategory(buttonText.trim());
            setupBreedDropdownListener();
        }
    });
});

function renderDistinctAttributesByCategory(category: string) {
    let attributeHTML = "";
    let breedDropdownHTML = "";
    if (category in breedsByCategory) {
        const breeds = breedsByCategory[category as PigCategory];

        breedDropdownHTML = `
            <div class="dropdown mb-2">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Choose the Breed
                </button>
                <ul class="dropdown-menu">
        `

        breeds.forEach(breed => {
            breedDropdownHTML += `
                <li><a class="dropdown-item" href="#">${breed}</a></li>
            ` 
        })

        breedDropdownHTML += `
                </ul>
            </div>
        `
    }

    switch (category) {
        case "Grey":
            attributeHTML = breedDropdownHTML +
                `<div class="input-group mb-3">
                    <span class="input-group-text">Swimming Ability (0-100)</span>
                    <input id="swimmingAbility" type="number" class="form-control" aria-label="swimmingAbility" aria-describedby="inputGroup-sizing-default" required>
                </div>`
            break;
        case "Chestnut":
            attributeHTML = breedDropdownHTML + 
                `<div class="input-group mb-3">
                    <span class="input-group-text">Spoken Language</span>
                    <input id="language" type="text" class="form-control" aria-label="SpokenLanguage" aria-describedby="inputGroup-sizing-default" required>
                </div>`
            break;
        case "White":
            attributeHTML = breedDropdownHTML +
                `<div class="input-group mb-3">
                    <span class="input-group-text">Running Ability (0-100)</span>
                    <input id="runningAbility" type="number" class="form-control" aria-label="runningAbility" aria-describedby="inputGroup-sizing-default" required>
                </div>`
            break;
        case "Black": 
            attributeHTML = breedDropdownHTML + 
                `<div class="input-group mb-3">
                    <span class="input-group-text">Strength Ability (1-10)</span>
                    <input id="strengthAbility" type="number" class="form-control" aria-label="strengthAbility" aria-describedby="inputGroup-sizing-default" required>
                </div>`
            break;
        default:
            attributeHTML = ""
    }
    
    return attributeHTML
}

function setupBreedDropdownListener() {
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(event) {
            
            const target = event.target as HTMLElement
            const buttonText = target.textContent || '';
            const button = target.closest('.dropdown')?.querySelector('.dropdown-toggle') as HTMLButtonElement;

            if (button) {
                button.textContent = buttonText;
                selectedBreed = buttonText.trim();
            }
        });
    });
}

// Handld add new pig form submission
const formData = document.getElementById("new-pig-form") as HTMLFormElement 
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
        const closeButton = document.querySelector('[data-bs-dismiss="modal"]') as HTMLElement;
        if (closeButton) {
            closeButton.click();
        }
    }
})

function getPigFormData(selectedCategory: string) {
    const nameInput = document.getElementById("pigName") as HTMLInputElement;
    const heightInput = document.getElementById("pigHeight") as HTMLInputElement;
    const weightInput = document.getElementById("pigWeight") as HTMLInputElement;
    const personalityInput = document.getElementById("pigPersonality") as HTMLInputElement;

    const nameVal = nameInput.value;
    const heightVal = heightInput.value;
    const weightVal = weightInput.value;
    const personalityVal = personalityInput.value;

    try {
        switch (selectedCategory) {
            case "Grey":
                const swimmingAbilityInput = document.getElementById("swimmingAbility") as HTMLInputElement;
                const swimmingScoreVal = parseInt(swimmingAbilityInput.value, 10);
                return new GreyPigs(nameVal, selectedBreed, parseFloat(heightVal), parseFloat(weightVal), personalityVal, swimmingScoreVal);
            case "Chestnut":
                const languageInput = document.getElementById("language") as HTMLInputElement;
                const languageVal = languageInput.value;
                return new ChestnutPigs(nameVal, selectedBreed, parseFloat(heightVal), parseFloat(weightVal), personalityVal, languageVal);
            case "White":
                const runningAbilityInput = document.getElementById("runningAbility") as HTMLInputElement;
                const runningAbilityVal = parseInt(runningAbilityInput.value, 10);
                return new WhitePigs(nameVal, selectedBreed, parseFloat(heightVal), parseFloat(weightVal), personalityVal, runningAbilityVal);
            case "Black": 
                const strengthAbilityInput = document.getElementById("strengthAbility") as HTMLInputElement;
                const strengthAbilityVal = parseInt(strengthAbilityInput.value, 10);
                return new BlackPigs(nameVal, selectedBreed, parseFloat(heightVal), parseFloat(weightVal), personalityVal, strengthAbilityVal);
        }
    } catch (error) {
        if (error instanceof Error) {
            alert(error.message);
        } else {
            alert('An unexpected error occurred');
        }
        return null;
    }
}

function renderPigsTable() {
    const tableBodyEle = document.getElementById("table-content") as HTMLTableSectionElement;
    if (tableBodyEle) {
        tableBodyEle.innerHTML = '';

        const pigsArray = pigsController.getAll();
        pigsArray.forEach((pig: Pigs) => {
            insertPigIntoTable(pig);
        });
    }
}

function isGrey(pig: Pigs): pig is GreyPigs {
    return pig.category === 'Grey';
}

function isChestnut(pig: Pigs): pig is ChestnutPigs {
    return pig.category === 'Chestnut'
}

function isWhite(pig: Pigs): pig is WhitePigs {
    return pig.category === 'White'
}

function isBlack(pig: Pigs): pig is BlackPigs {
    return pig.category === 'Black'
}

function insertPigIntoTable(pig: Pigs) {
    const tableBodyEle = document.getElementById("table-content") as HTMLTableSectionElement;
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
                } else if (isChestnut(pig)) {
                    distinctAttributeHTML += `
                        <div class="row">
                            <div class="col-6"><strong>Spoken language:</strong></div>
                            <div class="col-2">${pig._language}</div>
                        </div>
                    `;
                } else if (isWhite(pig)) {
                    distinctAttributeHTML += `
                        <div class="row">
                            <div class="col-6"><strong>Running Ability Score:</strong></div>
                            <div class="col-2">${pig._runningAbilityScore}</div>
                        </div>
                    `;
                } else if (isBlack(pig)) {
                    distinctAttributeHTML += `
                        <div class="row">
                            <div class="col-6"><strong>Strength Ability Score:</strong></div>
                            <div class="col-6">${pig._strengthAbilityScore}</div>
                        </div>
                    `;
                }

                const modalEl = document.getElementById("more-info") as HTMLFormElement;
                const modalBody = modalEl.querySelector('.modal-body') as HTMLElement;
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
                </div>`
            });
        }

        // Bind the delete button
        const deleteBtn = row.querySelector('.delete-btn') as HTMLButtonElement;
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

    const dynamicAttributesEle = document.getElementById("dynamic-attributes") as HTMLElement;
    const categoryBtn = document.getElementById("category-btn") as HTMLButtonElement;

    dynamicAttributesEle.innerHTML = '';
    categoryBtn.textContent = "Choose the Category";
}

const closeModalBtns = document.querySelectorAll('[data-bs-dismiss="modal"]');
closeModalBtns.forEach(button => {
    button.addEventListener("click", () => {
        clearForm();
    })
})

renderPigsTable();
