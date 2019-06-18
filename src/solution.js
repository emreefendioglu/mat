import { secantRoot as root } from './math/secant';

const euclidDistance = (p1, p2, l)=>{
    return (x)=>{
        return (
            Math.pow(p2.x(x)-p1.x(x), 2)+
            Math.pow(p2.y(x)-p1.y(x), 2)
        - Math.pow(l, 2));
    } 
}

const solver = (p1, p2, l, {max, min})=>{
    const f = euclidDistance(p1, p2, l);
    const lr = max - (f(max)*(min-max))/(f(min)-f(max));
    
    return root(f, lr);
}

export default solver;

export const findPoints = (joint1, joint2, l)=>{
    
    return joint1.rLine.array().reduce((result, p)=>{

        const start = performance.now();
        var [r, s, e] = solver({
            x: (x=0)=> p[0],
            y: (x=0)=> -p[1]
        }, {
            x: (x)=> joint2.fx(x),
            y: (x)=> joint2.fy(x)
        }, l, { min: joint2.min, max: joint2.max } );

        if(r) {
            return [...result, [
                {x: p[0], y: p[1]},
                {x:r, y: -joint2.fy(r)},
                {s, e, time: performance.now()-start}
            ]];
        } else {
            var [r, s, e] = solver({
                x: (x=0)=> p[0],
                y: (x=0)=> -p[1]
            }, {
                x: (x)=> joint2.fy(x),
                y: (x)=> joint2.fx(x)
            }, l, { min: joint2.min, max: joint2.max } );

            return [...result, [
                {x: p[0], y: p[1]},
                {x:joint2.fy(r), y: -r},
                {s, e, time: performance.now()-start}
            ]];
        }
        
    }, []);
}