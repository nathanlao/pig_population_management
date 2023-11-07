abstract class Pigs {
    id: number;
    name: string;
    breed: string;
    height: number;
    weight: number;
    personality: string;
    category: string;

    constructor(name: string, breed: string, height: number, weight: number, personality: string, category: string) {
        this.id = new Date().getTime(); // Ensure the id is unique
        this.name = name;
        this.breed = breed;
        this.height = height;
        this.weight = weight;
        this.personality = personality;
        this.category = category;
    }
}

export { Pigs }