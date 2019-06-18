import { G, Polyline, Text } from "@svgdotjs/svg.js";
import * as _ from 'lodash';
import { runInThisContext } from "vm";

export const SuperEllipseJoint = (draw: G, p:{x:number, y:number}, r1:number, r2:number, n:number=2)=> {
    const y = (x, sign=1)=> sign*Math.pow((1-Math.pow(x-p.x, n)/Math.pow(r1,n))*Math.pow(r2,n), 1/n)+p.y;

    const pSet = [
        ...
        _
        .range(p.x-r1, p.x+r1, 1)
        .map((x)=> [x, y(x)])
        ,
        ...
        _
        .range(p.x+r1, p.x-r1-1, -1)
        .map((x)=> [x, y(x, -1)])
    ];


    const group = draw
        .polyline(pSet.map(p => [p[0], -p[1]]))
        .fill("rgba(0,0,0,0.01)")
        .stroke({
            width: 1,
            dasharray: "5",
            color: "black"
        });
    
    group.draggable();
    
    return {
        pSet,
        maxX: p.x-r1,
        minX: p.x+r1,
        x: (x)=> x,
        y,
        p,
        group
    }
}

export const EllipseJoint = (draw: G, p:{x:number, y:number}, r1:number, r2:number)=> {
    return SuperEllipseJoint(draw, p, r1, r2, 2);
}

export const CircleJoint = (draw: G, p:{x:number, y:number}, r:number)=> {
    return EllipseJoint(draw, p, r, r);
}

export const SliderJoint = (draw: G, x1:number, x2:number, y)=> {
    const pSet = _.range(x1, x2, 1).map((x)=> [x, y(x)]);

    const group = draw
    .polyline(pSet.map(p => [p[0], -p[1]]))
    .fill("none")
    .stroke({
        width: 1,
        dasharray: "5",
        color: "black"
    });

    return {
        pSet,
        maxX: x1,
        minX: x2,
        x: (x)=> x,
        y: y,
        group
    }
}

export class Joint extends G {

    p: {x:number, y:number}
    r1: number
    r2: number
    n: number

    container: G
    rLine: Polyline
    centerText: Text

    constructor(node:G, p:{x:number, y:number}, r1:number, r2:number, n:number=2) {
        super();

        this.addTo(node);

        this.p = p;
        this.r1 = r1;
        this.r2 = r2;
        this.n = n;

        this.renderRline();
        this.centerText = this
            .text(`(${p.x}, ${-p.y})`)
            .cx(p.x)
            .cy(-(p.y+20));
        
        this
            .circle(12)
            .cx(p.x)
            .cy(-p.y)
            .fill('white')
            .stroke({color: "#333", width:1})
        
        this.on('dragmove', ()=>{
            this.p = this.cCenter()
            this.centerText.text(`(${this.p.x}, ${-this.p.y})`)
        });
        
        this.draggable();
    }

    renderRline() {
        const {p, r1} = this;

        const pSet = [
            ...
            _
            .range(p.x-r1, p.x+r1, 1)
            .map((x)=> [x, this.fy(x)])
            ,
            ...
            _
            .range(p.x+r1, p.x-r1-1, -1)
            .map((x)=> [x, this.fy(x, -1)])
        ];

        if(this.rLine) {
            this.rLine.remove();
        }

        this.rLine = this
            .polyline(pSet.map(p => [p[0], -p[1]]))
            .fill("rgba(0,0,0,0.01)")
            .stroke({
                width: 1,
                dasharray: "5",
                color: "#333"
            });
    }

    get min() {
        return this.p.x-this.r1;
    }
    
    get max() {
        return this.p.x+this.r1;
    }

    cCenter() {
        return {
            x: this.rLine.x() + this.rLine.width()/2,
            y: -this.rLine.y() - this.rLine.height()/2
        }
    }


    fx(x) {
        return x;
    }

    fy(x, sign=1) {
        const {p, r1, r2, n} = this;
        return sign*Math.pow((1-Math.pow(x-p.x, n)/Math.pow(r1,n))*Math.pow(r2,n), 1/n)+p.y;
    }
}