import { useState } from 'react'

/*
I think I want to add the ability to name soundModules from here.


class Should be renamed to soundModule
*/

const SoundModule = (props) => {
    const { setCurrentSoundId, id, waveType, currentSoundId } = props;


    return (
            <button className = "soundButton" style = {(id === currentSoundId) ? {color: "lime"} : {color : "green"}} onClick = {()=>{setCurrentSoundId(id)}}>A {waveType} Wave</button>
    )
}

export default SoundModule;