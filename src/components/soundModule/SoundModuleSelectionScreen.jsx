import React from 'react'
import SoundModule from './SoundModule';

const SoundModuleSelectionScreen = (props) => {
    const {sounds, audioContext, dispatchSound, handleSetCurrentSoundID, handleAddNewSound} = props;

    return (
            <div className = "sounds">
                {sounds.map((sound) => {
                    return(
                        <SoundModule key = {sound.id} audioContext = {audioContext} dispatchSound = {dispatchSound} setCurrentSoundId = {handleSetCurrentSoundID} id = {sound.id} waveType = {sound.waveType}/>
                    )
                })}
                <button className = "soundButton" onClick = {handleAddNewSound}>Add New Sound</button>
            </div>
    )
}

export default SoundModuleSelectionScreen;
//<div style = {{padding: "25px", height: "300px", width: "300px",  boxSizing : "border-box", backgroundImage: "url(soundScreenBorder.png)"}}>
//style = {{display: "flex", boxSizing : "border-box", flexDirection : "column", width: "250px", height : "250px", alignItems : "center", padding: "10px", overflowY : "scroll", border: "grey 1px solid"}}