import React from "react";

const GenericButton = (props) => {
    const {clickFunction, name} = props;

    return (
        <button className = "genericButton" onClick = {clickFunction}>{name}</button>
    )
}

export default GenericButton;