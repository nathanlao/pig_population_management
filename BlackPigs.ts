import { Pigs } from "./Pigs"

class BlackPigs extends Pigs {
    _strengthAbilityScore: number = 1;
    constructor(name: string, breed: string, height: number, weight: number, 
        personality: string, strengthAbilityScore: number) {

        super(name, breed, height, weight, personality, 'Black');
        this.strengthAbilityScore = strengthAbilityScore;
    }

    get strengthAbilityScore(): number {
        return this._strengthAbilityScore;
    }

    set strengthAbilityScore(value: number) {
        if (value < 1 || value > 10) {
            throw new Error('Strength ability score must be between 1 and 10.')
        }
        this._strengthAbilityScore = value;
    }
}

export { BlackPigs }