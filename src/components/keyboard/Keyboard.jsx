import React, {useState} from 'react'
import KeyboardKey from './KeyboardKey';

import KeyboardSwitch from './KeyboardSwitch';
import notes from '../../notes'

const Keyboard = (props) => {

    const {handleButtonClick, controlsDisabled} = props

    const [noteDisplayed, setNoteDisplayed] = useState(false)
    const [letterDisplayed, setLetterDisplayed] = useState(false)

    let clickClass = "";

    //maybe if controls are disabled put a gray transparent div over the keys
    if(!controlsDisabled){
        clickClass = "clickable";
    }
    else {
        clickClass = "";
    }
    const handleToggleNoteDisplay = () => {
        setNoteDisplayed((prevState) => {
            if(prevState){
                return false;
            }
            else{
                return true;
            }
        })
    }
    const handleToggleLetterDisplay = () => {
        setLetterDisplayed((prevState) => {
            if(prevState){
                return false;
            }
            else{
                return true;
            }
        })
    }
    //Switches have their own panel for now. Maybe if I redesign the keyboard maybe I'll integrate them into the keyboards panel
    //They'll be buttons first, just to get the functionality down. Then they'll be "proper" swicthes once I've made an image for them
    return (
        <>
            <div className = "keyboardSwitchPanel">
                <KeyboardSwitch name = {"Display Note"} clickFunction = {handleToggleNoteDisplay} switchState = {noteDisplayed}/>
                <KeyboardSwitch name = {"Display Key"} clickFunction = {handleToggleLetterDisplay} switchState = {letterDisplayed}/>
            </div>
            <div className = "keyboardContainer">
                {/*Not sure about this keys ID */}
                <div id="keys" className = "keyboard">
                    {notes.map((freqChild) => {
                        if(freqChild.type === 0) return <KeyboardKey key = {freqChild.note} noteDisplayed = {noteDisplayed} letterDisplayed = {letterDisplayed} handleButtonClick = {handleButtonClick} noteInfo = {freqChild} clickClass = {clickClass}/>
                    })}
                    {notes.map((freqChild) => {
                        if(freqChild.type === 1) return <KeyboardKey key = {freqChild.note} noteDisplayed = {noteDisplayed} letterDisplayed = {letterDisplayed} handleButtonClick = {handleButtonClick} noteInfo = {freqChild} clickClass = {clickClass}/>
                    })}
                </div>
            </div>
        </>
    )
}

export default Keyboard
//<KeyboardInput handleButtonClick = {handleButtonClick}/>
//        <div style = {{textAlign : "center"}}>

//        </div>