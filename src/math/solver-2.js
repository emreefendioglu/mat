import _ from "lodash";
import 'console.table';
import secant from "./secant";

const { sin, cos, atan, sqrt } = Math;

const toRad = val => val * (Math.PI / 180)
const toDeg = val => val * (180 / Math.PI)


export class FBLSolver { 

    constructor({a,b,c,d}) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;

        this.result = [-5, 5];
    }

    equation(x1, y1) {

        const eq = teta => {
            let x2 = -cos(teta)*this.c+this.d;
            let y2 = sin(teta)*this.c;

            return (sqrt((x2-x1)**2+(y2-y1)**2)-this.b) / 100;
        }

        return [toDeg(secant(eq, toRad(this.result[0]))), toDeg(secant(eq, toRad(this.result[1])))];        
    }

    output(angle) {
        let x1 = cos(toRad(angle))*this.a;
        let y1 = sin(toRad(angle))*this.a;

        this.result = this.equation(x1, y1);
        
        return this.result;
    }
}