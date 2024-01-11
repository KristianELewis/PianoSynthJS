import React from "react";
import ControlKnob from "./ControlKnob";




const ControlKnobPanel = (props) => {
    const {setMouseMove, handleOctave, octave, handleGain, gain, controlsDisabled} = props;

    //I don't love this, but its a simple way to make the knobs no interactive. Just puts a transparent div over the entire panel
    if(controlsDisabled){
        return (
            <div id = "controlKnobsContainer" style = {{position: "relative"}}>
                {/*Maybe make a component for these or condense them into the controlknob component*/}
                <div style = {{width: "100px", textAlign: "center"}}>
                    <p className = "controlPanelText">{0}</p>
                    <ControlKnob setMouseMove = {setMouseMove} selectionCount = {8} handleFunction = {handleOctave} value = {0}/>
                    <p className = "controlPanelText">OCTAVE</p>
                </div>
                <div style = {{width: "100px", textAlign: "center"}}>
                    <p className = "controlPanelText">{0}</p>
                    <ControlKnob setMouseMove = {setMouseMove} selectionCount = {100} handleFunction = {handleGain} value = {0}/>
                    <p className = "controlPanelText">GAIN</p>
                </div>
                <div style = {{height: "100%", width : "100%", backgroundColor : "transparent", position: "absolute"}}></div>
            </div>
        )
    }
    else{
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
}


export default ControlKnobPanel