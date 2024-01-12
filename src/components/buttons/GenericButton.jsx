import React from "react";

const GenericButton = (props) => {
    const {clickFunction, name, controlsDisabled} = props;

    let buttonClass;
    if(!controlsDisabled){
        buttonClass = "genericButton clickable"
    }
    else {
        buttonClass = "genericButton"
    }
    return (
        <button disabled = {controlsDisabled} className = {buttonClass} onClick = {clickFunction}>{name}</button>
    )
}

export default GenericButton;