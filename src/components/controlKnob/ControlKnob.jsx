import React, {useState, useRef} from "react"

const ControlKnob = (props) => {
    const {setMouseMove, selectionCount, handleFunction, value} = props;

    const rotateRef = useRef(null) //this only needed to get the positioning for the knobs
    //these need to be refs not state
    const targetX = useRef(0);
    const targetY = useRef(0);
    /*
    const [targetX, setTargetX] = useState(0)
    const [targetY, setTargetY] = useState(0)
    */

    const increment = 180 / selectionCount;
    //https://math.stackexchange.com/questions/707673/find-angle-in-degrees-from-one-point-to-another-in-2d-space

    //const [rotationString, setRotationString] = useState(`rotate(${value * increment}deg)`)

    const rotate = (e) => {
        e.preventDefault();// needed to prevent selected text while dragging, also prevents dragging the div
        const deltaX = (targetX.current - e.clientX)
        const deltaY = (targetY.current - e.clientY)
        const rotation = Math.atan2(deltaY, deltaX)*(180 / Math.PI)
        if(rotation >= 0 ) //for now I'm only doing 0-180deg, the other degrees are negative 
        {
            //play clicking noise
            //setRotationString(`rotate(${(increment * Math.floor(rotation / increment))}deg)`)
            //rotateRef.current.style.transform = `rotate(${(increment * Math.floor(rotation / increment))}deg)`
            handleFunction(Math.floor(rotation / increment))
        }
    }
    //I'm having issues where clicking on the knob doesnt do anything
    const handleRotate = (e) => {
        targetX.current = (rotateRef.current.offsetLeft + 25) //This should be okay. It sets the knob as the center using the ref for its location.
        targetY.current = (rotateRef.current.offsetTop + 25) //This allows the controlKnobLine to use handleRotate
        rotate(e)
        setMouseMove(() => rotate)
    }

    return (
        <div className = "controlKnob" style = {{transform : `rotate(${value * increment}deg)`}} onPointerDown = {e => handleRotate(e)} ref = {rotateRef}>
            <div className = "controlKnobLine" onPointerDown = {e => handleRotate(e)}>
            </div>
        </div>
    )
}


export default ControlKnob;