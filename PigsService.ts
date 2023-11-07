import * as Model from "./Pigs"
import Pigs = Model.Pigs

interface PigsServices {
    add(pig: Pigs): void;
    getAll: () => Pigs[];
    delete(id: number): void
}

interface PigGroup {
    [category: string]: Pigs[];
}

class PigsController implements PigsServices {
    Pigs: Pigs[];

    constructor() {
        this.Pigs = JSON.parse(localStorage.getItem('PigsArray') || '[]');
    }

    add(pig: Pigs) {
        this.Pigs.push(pig)
        localStorage.setItem('PigsArray', JSON.stringify(this.Pigs));
    }

    getAll() {
        const pigsArray: Pigs[] = JSON.parse(localStorage.getItem('PigsArray') || '[]');

        // Group pigs by category
        const groupedPigs: PigGroup = pigsArray.reduce((acc: PigGroup, pig: Pigs) => {
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
        const sortedPigs: Pigs[] = [];
    
        sortedCategories.forEach((category) => {
            groupedPigs[category].sort((a: Pigs, b: Pigs) => a.name.localeCompare(b.name));
            sortedPigs.push(...groupedPigs[category]); // concatenate arrays
        })
        
        return sortedPigs;
    }

    delete(id: number){
        this.Pigs = this.Pigs.filter((pig)=>{
            return pig.id != id
        })
        localStorage.setItem('PigsArray', JSON.stringify(this.Pigs));
    }
}

export { PigsController }