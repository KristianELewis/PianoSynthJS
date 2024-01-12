import { useState, useRef, useReducer } from 'react'
import SelectedSoundOptions from './SelectedSoundOptions';
import Keyboard from './keyboard/Keyboard';
import soundReducer from './soundReducer';

/*
    Im gonna completely rework this soon. The accordian nonsense is annoying me, probably want different event handling for the keyboard, and maybe more options for continous noise and what not
    
    Everything is being passed from here into the next component. The design has changed enough that this component should just be removed and the next component has taken its place

    Im currently in the process of making major changes to the sounds reducer. Moving the currently selected sound into the reducer. This will also make the dedicated gain, wavetype, octave states redundant
    I will focus on moving the reducer into its own file, and getting the state mangement hooked in, I may pass down setters and values differently.
    */



const SoundBoard = () => {
    const id = useRef(-1);
    const [audioContext, setAudioContext] = useState(() => {return new AudioContext()})
    //dispatch is named incorrectly, sounds is also a bad name. Maybe soundModules? and change the component to soundModule?
    const [soundModules, dispatchSound] = useReducer(soundReducer, {sounds : [], currentSoundId : -1, currentIndex : -1})
    const [mouseMove, setMouseMove] = useState(null)

    //These all need to become apart of the sound reducer

    const handleSetCurrentSoundID = (id) => {
        dispatchSound({type : "setCurrentId", id : id})
    }

    const handleAddNewSound = () => {
        id.current++;
        dispatchSound({type: "AddSound", id : id.current})
    }
    const handleButtonClick = (params) => {
        const {baseFrequency} = params;
        for(const sound of soundModules.sounds)
        {
            let o = audioContext.createOscillator()
            let g = audioContext.createGain()
            o.connect(g)
            o.type = sound.waveType
            o.frequency.value = baseFrequency * Math.pow(2, sound.octave);
            g.connect(audioContext.destination)
            o.start();
            g.gain.setValueAtTime(sound.gain /100, audioContext.currentTime);
            g.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.9)
            o.stop(audioContext.currentTime + 1)
        } 
    }
    const handleClick = () => {
        console.log(sounds)
    }
    const handleThing = () =>  {
        setMouseMove(null)
    }
    // A new solution needs to be figured out for
    return (
        <>
        <div className = "soundBoard" onPointerMove = {mouseMove} onPointerLeave = {handleThing} onPointerUp = {handleThing}>
            <div className = "settingsContainer">
                {/*The majority of these setters will not do anything and should be removed */}
                <SelectedSoundOptions 
                    audioContext = {audioContext}
                    dispatchSound = {dispatchSound}
                    handleSetCurrentSoundID = {handleSetCurrentSoundID}
                    id = {soundModules.currentSoundId}
                    currentSoundId = {soundModules.currentSoundId}//why are there two versions of this
                    handleAddNewSound = {handleAddNewSound}
                    sounds = {soundModules.sounds}
                    handleClick = {handleClick}
                    waveType = {soundModules.currentIndex === -1 ? "sine" : soundModules.sounds[soundModules.currentIndex].waveType} 
                    octave = {soundModules.currentIndex === -1 ? 0 : soundModules.sounds[soundModules.currentIndex].octave} 
                    gain = {soundModules.currentIndex === -1 ? 0 : soundModules.sounds[soundModules.currentIndex].gain} 
                    setMouseMove = {setMouseMove}
                />
            </div>
            <Keyboard handleButtonClick = {handleButtonClick}></Keyboard>
        </div>
        </>
    )
}
export default SoundBoard;
//                <button onClick = {handleClick}>sounds</button>