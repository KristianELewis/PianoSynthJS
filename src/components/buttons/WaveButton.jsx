import React, { useState, useRef, useReducer } from 'react'




const WaveButton = (props) => {
    const {type, selectedType, handleWaveTypeChange, controlsDisabled} = props;

    //const [buttonClass, setButtonClass] = useState("waveButton")
    let buttonClass;
    const handleClick = () => {

        handleWaveTypeChange(type);
    }

    if(selectedType === type && !controlsDisabled){
        buttonClass = "waveButtonSelected clickable"
    }
    else if(!controlsDisabled){
        buttonClass = "waveButton clickable"
    }
    else {
        buttonClass = "waveButton"
    }

    return (
            <button disabled = {controlsDisabled} className = {buttonClass} onClick = {handleClick} >{type}</button>
    )
}

export default WaveButton;