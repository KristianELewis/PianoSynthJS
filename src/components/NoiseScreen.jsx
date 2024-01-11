import React from 'react'
import IndividualNoise from './IndividualNoise';

const NoiseScreen = (props) => {
    const {sounds, audioContext, dispatchSound, handleSetCurrentSoundID, handleAddNewSound} = props;

    return (
            <div className = "sounds">
                {sounds.map((sound) => {
                    return(
                        <IndividualNoise key = {sound.id} audioContext = {audioContext} dispatchSound = {dispatchSound} setCurrentSoundId = {handleSetCurrentSoundID} id = {sound.id}/>
                    )
                })}
                <button className = "soundButton" onClick = {handleAddNewSound}>Add New Sound</button>
            </div>
    )
}
        //<div style = {{padding: "25px", height: "300px", width: "300px",  boxSizing : "border-box", backgroundImage: "url(soundScreenBorder.png)"}}>

        //</div>

export default NoiseScreen;

//style = {{display: "flex", boxSizing : "border-box", flexDirection : "column", width: "250px", height : "250px", alignItems : "center", padding: "10px", overflowY : "scroll", border: "grey 1px solid"}}