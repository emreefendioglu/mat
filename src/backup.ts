
import {Svg} from "@svgdotjs/svg.js";
import Bar from "./2d-elements/bar";
import {
    SliderJoint, 
    EllipseJoint, 
    SuperEllipseJoint, 
    CircleJoint
} from "./2d-elements/joint";

import solver from './solution';
import 'console.table';

const draw = (new Svg("drawing").size('100%', '100%')).group();

const joint1 = CircleJoint(draw, {x:200, y:-500}, 100);
//const joint2 = EllipseJoint(draw, {x:650, y:-600}, 200, 300);

const joint2 = SliderJoint(draw, 600, 830, (x)=> -500);

const l = 520;


const rotatePoint = (ang, p1, p) =>{
    return {
        x: p1.x + p.x*Math.cos(ang) - p.y*Math.sin(ang),
        y: p1.y + p.y*Math.cos(ang) + p.x*Math.sin(ang)
    }
}

const findPoints = (joint1, joint2, l)=>{
    return joint1.pSet.reduce((result, p)=>{
        
        const start = performance.now();
        var [r, s, e] = solver({
            x: (x=0)=> p[0],
            y: (x=0)=> p[1]
        }, {
            x: joint2.x,
            y: joint2.y
        }, l, { min: joint2.minX, max: joint2.maxX } );

        return [...result, [
            {x: p[0], y: -p[1]},
            {x:r, y: -joint2.y(r)},
            {s, e, time: performance.now()-start}
        ]];

    }, []);
}

const results = findPoints(joint1, joint2, l)
    /*.map( frame =>{
        const tan = (frame[1].y - frame[0].y) / (frame[1].x - frame[0].x);
        const ang = Math.atan(tan);

        return [
            frame[0],
            rotatePoint(ang, frame[0], {x: 200, y:-50}),
            frame[1],
            frame[2]
        ];
    });*/

//const results2 = findPoints({ pSet: results.map(p => [p[1].x, -p[1].y] ) }, joint3, 300);

/*
console.table([...results[0].slice(0,-1).reduce((header, r, i)=> [...header, `x${i+1}`, `y${i+1}`], []), "s", "e"], results.map(row =>{
    return [
        ...row.slice(0,-1).reduce((result, s)=> [...result, s.x.toPrecision(5),s.y.toPrecision(5)], []),
        row.slice(-1)[0].s,
        row.slice(-1)[0].e.toPrecision(5)
    ];
}));

console.log(
    results
    .map(row => row.slice(0,-1).reduce((result, s)=> [...result, s.x.toPrecision(5),s.y.toPrecision(5)], []).join(",")).join("\n")
)

console.log(
    results2
    .map(row => row.slice(0,-1).reduce((result, s)=> [...result, s.x.toPrecision(5),s.y.toPrecision(5)], []).join(";")).join("\n")
)

console.log(
    results
    .filter((r, i)=> i%20 == 0 )
    .map(row =>{
        return [
            ...row.slice(0,-1).reduce((result, s)=> [...result, s.x.toPrecision(5),s.y.toPrecision(5)], []),
            row.slice(-1)[0].s,
            row.slice(-1)[0].e.toPrecision(5)
        ].join(" & ");
    }).join(" \\\\\n"),
    "\n\n Total time:", results.reduce((t, r)=> t+r.slice(-1)[0].time, 0), "ms"
);
*/

var bars = [];
const drawStep = (i)=>{
    bars.forEach(bar => bar.remove());
    bars = [
        Bar.apply(this, [draw, results[i].slice(0,-1)]),
        //Bar.apply(this, [draw, results2[i].slice(0,-1)])
    ];
}

drawStep(0);

document.getElementsByTagName("input")[0].max = `${results.length-1}`;
document.getElementsByTagName("input")[0].addEventListener("input", function(e) {
    drawStep(this.value);
});