import { Pigs } from "./Pigs"

class GreyPigs extends Pigs {
    _swimmingAbilityScore: number = 0;
    constructor(name: string, breed: string, height: number, weight: number, 
        personality: string, swimmingAbilityScore: number) {

        super(name, breed, height, weight, personality, 'Grey');
        this.swimmingAbilityScore = swimmingAbilityScore; // Invoke setter and catching the invalid error 
    }

    get swimmingAbilityScore(): number {
        return this._swimmingAbilityScore;
    }

    set swimmingAbilityScore(value: number) {
        if (value < 0 || value > 100) {
            throw new Error('Swimming ability score must be between 0 and 100.')
        }
        this._swimmingAbilityScore = value;
    }
}

export { GreyPigs }