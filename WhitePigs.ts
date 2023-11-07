import { Pigs } from "./Pigs"

class WhitePigs extends Pigs {
    _runningAbilityScore: number = 0;
    constructor(name: string, breed: string, height: number, weight: number, 
        personality: string, runningAbilityScore: number) {

        super(name, breed, height, weight, personality, "White");
        this.runningAbilityScore = runningAbilityScore; // Invoke setter and catching the invalid error 
    }

    get runningAbilityScore(): number {
        return this._runningAbilityScore;
    }

    set runningAbilityScore(value: number) {
        if (value < 0 || value > 100) {
            throw new Error('Running ability score must be between 0 and 100.');
        }
        this._runningAbilityScore = value;
    }
}

export { WhitePigs }