import React from 'react'
import SoundButton from './SoundButton';
import KeyboardInput from './KeyboardInput'

import notes from '../notes'

const Keyboard = (props) => {

    const {handleButtonClick} = props

    //Easiest way to keep the keyboard centered is to use flex
    return (
        <div style = {{width : "400px", height : "125px", backgroundImage : "url(pianoPanel400W.png)"}}>
            <div id="keys" style = {{position : "relative", width : "280px", height : "125px", marginLeft : "60px", marginTop : "2px"}}>
                {notes.map((freqChild) => {
                    if(freqChild.type === 0) return <SoundButton key = {freqChild.note} handleButtonClick = {handleButtonClick} noteInfo = {freqChild}/>
                })}
                {notes.map((freqChild) => {
                    if(freqChild.type === 1) return <SoundButton key = {freqChild.note} handleButtonClick = {handleButtonClick} noteInfo = {freqChild}/>
                })}
            </div>
        </div>
    )
}

export default Keyboard
//<KeyboardInput handleButtonClick = {handleButtonClick}/>
//        <div style = {{textAlign : "center"}}>

//        </div>