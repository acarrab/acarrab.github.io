export default class Node {
    p = [0, 0, 2, 1]
    oldP = [0, 0, 2, 1]
    saved = Date.now()
    saved2 = Date.now()
    getPosRad() {
        if (this.p.length < 4) { this.p.push(1); }
        if (this.oldP.length < 4) { this.oldP.push(1); }
        let current = Date.now();
        if (current > this.saved + settings.transitionTime && current > this.saved2 + settings.swellTime) {
            return [this.p[0], this.p[1], this.p[2] * this.p[3]];
        }
        let x = (current - this.saved) / settings.transitionTime;
        let y = 1 - x;
        if (current > this.saved2 + settings.swellTime) {
            return [this.p[0] * x + this.oldP[0] * y, this.p[1] * x + this.oldP[1] * y, (this.p[2] * x + this.oldP[2] * y) * this.p[3]];
        }
        let swell = this.p[3] * ((current - this.saved2) / settings.swellTime) + this.oldP[3] * (1 - (current - this.saved2) / settings.swellTime);
        if (current > this.saved + settings.transitionTime) {
            return [this.p[0], this.p[1], this.p[2] * swell];
        }
        return [this.p[0] * x + this.oldP[0] * y, this.p[1] * x + this.oldP[1] * y, (this.p[2] * x + this.oldP[2] * y) * swell];
    }
    getPosRadBase() {
        let result = this.getPosRad();
        result[2] = this.p[2];
        return result;
    }
    getCombo() {
        let current = Date.now();
        if (current > this.saved + settings.transitionTime && current > this.saved2 + settings.swellTime) {
            return [this.p[0], this.p[1], this.p[2], this.p[3]];
        }
        let x = (current - this.saved) / settings.transitionTime;
        let y = 1 - x;
        if (current > this.saved2 + settings.swellTime) {
            return [this.p[0] * x + this.oldP[0] * y, this.p[1] * x + this.oldP[1] * y, this.p[2] * x + this.oldP[2] * y, this.p[3]];
        }
        let swell = this.p[3] * ((current - this.saved2) / settings.swellTime) + this.oldP[3] * (1 - (current - this.saved2) / settings.swellTime);
        if (current > this.saved + settings.transitionTime) {
            return [this.p[0], this.p[1], this.p[2], swell];
        }
        return [this.p[0] * x + this.oldP[0] * y, this.p[1] * x + this.oldP[1] * y, (this.p[2] * x + this.oldP[2] * y), swell];
    }
    getNewPosRad() {
        return this.p;
    }
    finishTransition() {
        this.oldP = [this.p[0], this.p[1], this.p[2], this.p[3]];
    }
    addSwell(ratio: number) {
        this.oldP[3] = this.getCombo()[3];
        this.saved2 = Date.now()
        this.p[3] = ratio;
    }
    setPosRad(newP:[number,number, number]) {
        let x = this.getCombo();
        x[3] = this.oldP[3];
        this.oldP = x;
        this.saved = Date.now();
        this.p = newP;
    }

    connected = [];
    connRadians = [];
    depth = 0;
    originalDepth = 0;
    index = 0;
    partOfPath = false;
    text: string;

    visited: boolean;
}