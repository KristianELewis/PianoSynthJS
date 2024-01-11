import React from "react";
import ControlKnob from "./ControlKnob";




const ControlKnobPanel = (props) => {
    const {setMouseMove, handleOctave, octave, handleGain, gain} = props;
    return (
        <div id = "controlKnobsContainer">
            {/*Maybe make a component for these or condense them into the controlknob component*/}
            <div style = {{width: "100px", textAlign: "center"}}>
                <p className = "controlPanelText">{octave}</p>
                <ControlKnob setMouseMove = {setMouseMove} selectionCount = {8} handleFunction = {handleOctave} value = {octave}/>
                <p className = "controlPanelText">OCTAVE</p>
            </div>
            <div style = {{width: "100px", textAlign: "center"}}>
                <p className = "controlPanelText">{gain}</p>
                <ControlKnob setMouseMove = {setMouseMove} selectionCount = {100} handleFunction = {handleGain} value = {gain}/>
                <p className = "controlPanelText">GAIN</p>
            </div>
        </div>
    )
}


export default ControlKnobPanel