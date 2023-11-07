import { Pigs } from "./Pigs"

class ChestnutPigs extends Pigs {
    _language: string = "";
    constructor(name: string, breed: string, height: number, weight: number, 
        personality: string, language: string) {
            
        super(name, breed, height, weight, personality, 'Chestnut');
        this.language = language;
    }

    get language(): string {
        return this._language;
    }

    set language(value: string) {
        this._language = value;
    }
}

export { ChestnutPigs }