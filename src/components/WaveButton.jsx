import React, { useState, useRef, useReducer } from 'react'




const WaveButton = (props) => {
    const {type, selectedType, handleWaveTypeChange} = props;

    //const [buttonClass, setButtonClass] = useState("waveButton")
    let buttonClass;
    const handleClick = () => {

        handleWaveTypeChange(type);
    }

    if(selectedType === type){
        buttonClass = "waveButtonSelected"
    }
    else{
        buttonClass = "waveButton"
    }

    return (
            <button className = {buttonClass} onClick = {handleClick} >{type}</button>
    )
}

export default WaveButton;