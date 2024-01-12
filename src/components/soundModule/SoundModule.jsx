import { useState } from 'react'

/*
I think I want to add the ability to name soundModules from here.


class Should be renamed to soundModule
*/

const SoundModule = (props) => {
    const { setCurrentSoundId, id } = props;

    return (
            <button className = "soundButton" onClick = {()=>{setCurrentSoundId(id)}}>A Sound</button>
    )
}

export default SoundModule;