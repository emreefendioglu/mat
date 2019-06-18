import { G } from "@svgdotjs/svg.js";

export default function(draw: G, points:{x:number, y:number}[]): G {
    const body = draw.group();

    points.map( point =>
        body
            .circle(12)
            .cx(point.x)
            .cy(point.y)
            .fill('white')
            .stroke({color: "#000", width:4})
    );
    
    points.map( point =>
        body
            .text(`(${point.x.toPrecision(4)},${point.y.toPrecision(4)})`)
            .cx(point.x)
            .cy(point.y-30)
            .size(17)
    );

    body
        .polyline(
            [...points, points[0]].map(p => [p.x, p.y])
        )
        .stroke({ color: '#000', width: 4, linecap: 'round', linejoin: 'round' })
        .fill("#555")
        .back();
    
    return body;
}