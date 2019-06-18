import * as React from 'react';
import Slider from '@material-ui/lab/Slider';

import { Svg, G } from '@svgdotjs/svg.js';

import {
    SliderJoint, 
    EllipseJoint, 
    SuperEllipseJoint, 
    CircleJoint,
    Joint
} from "../2d-elements/joint";

import { findPoints } from '../solution';
import Bar from '../2d-elements/bar';

var draw:G = null;

export default ({joints})=>{

    const canvasRef = React.useRef(null);
    const [solution, setSolution] = React.useState(0);
    const [results, setResults] = React.useState([]);
    const [step, setStep] = React.useState(null);
    const [bars, setBars] = React.useState([]);

    React.useEffect(()=>{
        draw = (new Svg(canvasRef.current).size("100%", "100%")).group();

        return ()=>{
            draw.remove();
        };
    }, []);

    React.useEffect(()=>{
        bars.forEach(bar => bar.remove());
        if(step != null && results.length > 0) {            
            setBars([Bar(draw, results[step].slice(0,-1))]);
        }
    }, [step]);

    React.useEffect(()=>{
        const j1 = new Joint(draw, {x:200, y:-400}, 100, 100, 2);
        const j2 = new Joint(draw, {x:600, y:-400}, 150, 200, 4);

        const results = findPoints(j1, j2, 400).filter((p)=> p[1].x && p[1].y);

        j1.on('dragstart', ()=>{
            setStep(null);
            setResults([]);
        });
        j2.on('dragstart', ()=>{
            setStep(null);
            setResults([]);
        });
        
        j2.on('dragend', ()=>{
            const results = findPoints(j1, j2, 400).filter((p)=> p[1].x && p[1].y);
            setResults(results);
            setStep(0);
        });

        setTimeout(()=>{
            setResults(results);
            setStep(0);
        });
    }, []);


    return (
        <div className="workspace">
            <svg className="canvas" ref={canvasRef} />
            {
                results.length > 0 &&
                <Slider
                    max={results.length-1}
                    onChange={(e, value)=> setStep(value as number)}
                    value={step}
                />
            }
        </div>
    );
}