import React from 'react'
import KeyboardKey from './KeyboardKey';
import KeyboardInput from './KeyboardInput'

import notes from '../../notes'

const Keyboard = (props) => {

    const {handleButtonClick, controlsDisabled} = props
    let clickClass = "";

    //maybe if controls are disabled put a gray transparent div over the keys
    if(!controlsDisabled){
        clickClass = "clickable";
    }
    else {
        clickClass = "";
    }
    //Easiest way to keep the keyboard centered is to use flex
    return (
        <div className = "keyboardContainer">
            {/*Not sure about this keys ID */}
            <div id="keys" className = "keyboard">
                {notes.map((freqChild) => {
                    if(freqChild.type === 0) return <KeyboardKey key = {freqChild.note} handleButtonClick = {handleButtonClick} noteInfo = {freqChild} clickClass = {clickClass}/>
                })}
                {notes.map((freqChild) => {
                    if(freqChild.type === 1) return <KeyboardKey key = {freqChild.note} handleButtonClick = {handleButtonClick} noteInfo = {freqChild} clickClass = {clickClass}/>
                })}
            </div>
        </div>
    )
}

export default Keyboard
//<KeyboardInput handleButtonClick = {handleButtonClick}/>
//        <div style = {{textAlign : "center"}}>

//        </div>