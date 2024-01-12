import { useState } from 'react'

import notes from '../../notes'

/*

This was the old way to let the user use their own keyboard.

I'm going to switch over to the useEffect custom hook thing I made for my image Viewer in the desktop app
*/

const KeyboardInput = (props) => {
    const {handleButtonClick} = props
    const [inputText, setInputText] = useState("Click to use keyboard")
    const [backColor, setBackColor] = useState("#212121")
    const handleFocus = () => {
        setInputText("Using keyboard")
        setBackColor("#424242")
    }
    const handleBlur = () => {
        setInputText("Click to use keyboard")
        setBackColor("#212121")
    }
    const handleKeyUp = (e) => {
        let element = notes.find((element) => element.letter === e.key)

        if(element !== undefined){
            handleButtonClick({baseFrequency : element.baseFrequency})
        }
    }
    return (
        <div style={{marginTop: "10px", position: "relative", width : "294px", height: "75px", backgroundColor : backColor}}>
            <p style = {{position : 'absolute', top: "25px", width : "294px", userSelect : "none"}}>{inputText}</p>
            <input style = {{position : 'absolute', left : "0", caretColor: "transparent", width : "294px", height: "75px", backgroundColor : "transparent"}} onKeyUp = {handleKeyUp} onFocus = {handleFocus} onBlur={handleBlur} value = ""></input>
        </div>
    )
}

export default KeyboardInput;