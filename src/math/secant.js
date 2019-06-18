//
// Secant method implementation
//
const { sin, cos, atan, sqrt } = Math;

const secant = (x, f, d=0.0001)=> {
    const _d = (f(x+d)-f(x)) / d;

    return x - f(x) / _d;
}

const bisec = (x1,x2, f)=>{
    const fx1 = f(x1);
    const fx2 = f(x2);

    const xr = (x1+x2)/2;
    const fxr = f(xr);

    if(fx1 * fxr < 0) {
        x2 = xr;
    } else {
        x1 = xr;
    }

    return [x1, x2];
}

export const secantRoot = (func, x)=>{

    var xr = x;
    var __E = 1;
    var s = 0;

    var x1 = 0;
    var x2 = 0;

    while (true) {

        if(func(xr) == 0) {
            return [xr, s, 0];
        }
        
        var _xr;
        
        _xr = secant(xr, func);
        
        // Error calculation
        const v = (_xr-xr);
        const _E = Math.abs(v / _xr);
        xr = _xr;

        // // Changing velocity
        // if(method == 0) {
        //     if(E < 0.4) {
        //         method = 1;
        //         x1 = xr;
        //         console.log(v);
        //         x2 = xr+(v / Math.abs(v))*v;
        //     }
        // }

        s ++;

        __E = _E;        
        if(_E<Math.pow(10, -5) || s > 50) {
            break;
        }
    }

    return [xr, s, __E];
}

export const bisecRoot = (func, x1, x2)=>{
    
    var __E = 1;
    var s = 0;

    while (true) {

        if(func(xr) == 0) {
            return [xr, s, 0];
        }        
        
        var [x1, x2] = bisec(x1, x2, func);
        
        const v = (x2-xr);
        const _E = Math.abs(v / x2);
        xr = x2;

        s ++;

        __E = _E;        
        if(_E<Math.pow(10, -5) || s > 50) {
            break;
        }

    }

    return [xr, s, __E];
}