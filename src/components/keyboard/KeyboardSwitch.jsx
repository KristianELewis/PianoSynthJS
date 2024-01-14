import React from "react";



const KeyboardSwitch = (props) => {

    const {clickFunction, switchState, name} = props
    let switchClass = "keyboardSwitch clickable"

    if(switchState === false)
    {
        switchClass = "keyboardSwitchDown clickable"
    }
    return (
        <div style = {{display :"flex", flexDirection : "column",  alignItems : "center"}}>
            <p className = "controlPanelText" style = {{margin : "0px 0px 5px 0px", fontSize : "15px", textAlign: "center"}}>{name}</p>
            <div className = {switchClass} onClick = {clickFunction}/>
        </div>
    )
}


export default KeyboardSwitch;