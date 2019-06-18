import _ from "lodash";
import 'console.table';

const { sin, cos, atan, sqrt } = Math;

const toRad = val => val * (Math.PI / 180)
const toDeg = val => val * (180 / Math.PI)


class FBLSolver { 

    constructor({a,b,c,d}) {
        this.K1 = d / c;
        this.K2 = d / a;
        this.K3 = (a**2-b**2+c**2+d**2)/(2*a*c);
    }

    output(angle) {
        let phi = toRad(angle);

        let A = sin(phi);
        let B = cos(phi)-this.K2;
        let C = this.K1*cos(phi)-this.K3;
        
        return [
            toDeg(2*atan(
                (A+sqrt(A**2+B**2-C**2))/(B+C)
            )),
            toDeg(2*atan(
                (A-sqrt(A**2+B**2-C**2))/(B+C)
            ))
        ];
    }
}


const solver = new FBLSolver({a:50, b:200, c:150, d:205});

console.table(
    ["Input", "Output +", "Output -"],
    _.range(0,365,15)
        .map(val => [val, ...solver.output(val).map(val => Math.round(val*10)/10)])
);