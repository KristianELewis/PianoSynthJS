import React from "react";

const GenericButton = (props) => {
    const {clickFunction, name, controlsDisabled} = props;

    return (
        <button disabled = {controlsDisabled} className = "genericButton" onClick = {clickFunction}>{name}</button>
    )
}

export default GenericButton;