import { useState, useRef, useReducer } from 'react'
import SelectedSoundOptions from './SelectedSoundOptions';
import IndividualNoise from './IndividualNoise';
import Keyboard from './Keyboard';

import NoiseScreen from './NoiseScreen'
/*
    Im gonna completely rework this soon. The accordian nonsense is annoying me, probably want different event handling for the keyboard, and maybe more options for continous noise and what not
    
    Everything is being passed from here into the next component. The design has changed enough that this component should just be removed and the next component has taken its place

    Im currently in the process of making major changes to the sounds reducer. Moving the currently selected sound into the reducer. This will also make the dedicated gain, wavetype, octave states redundant
    I will focus on moving the reducer into its own file, and getting the state mangement hooked in, I may pass down setters and values differently.
    */

function soundReducer(state, action) {
    switch (action.type){
        case "AddSound"://This either needs better destructuring, or it should set the current id and index to the new sound
            return {sounds: [...state.sounds, {id : action.id, waveType : "sine", gain : 50, octave : 4}], currentSoundId : action.id, currentIndex : state.sounds.length}
        case "DeleteSound"://This can be refactored for sure
            if(state.sounds.length === 1)
            {
                return {sounds : [], currentSoundId : -1, currentIndex : -1}
            }

            const index = state.sounds.findIndex(sound => sound.id === action.id)
            const newarr = state.sounds.toSpliced(index, 1)
            let newIndex = newarr.length - 1;
            let newId = newarr[newIndex].id

            return {sounds : newarr, currentSoundId : newId, currentIndex : newIndex}

            //These shouldn't need to change too much
        case "ChangeWaveType":
            let newSoundState = state.sounds.map(sound => {
                if (sound.id === action.id)
                {
                    return {...sound, waveType : action.waveType}
                }
                else{
                    return sound
                }
            })
            return {...state, sounds: newSoundState}
        case "ChangeGain":
            let newSoundStateG = state.sounds.map(sound => {
                if (sound.id === action.id)
                {
                    return {...sound, gain : action.gain}
                }
                else{
                    return sound
                }
            })
            return {...state, sounds: newSoundStateG}
        case "ChangeOctave":
            let newSoundStateF = state.sounds.map(sound => {
                if (sound.id === action.id)
                {
                    return {...sound, octave : action.octave}
                }
                else{
                    return sound
                }
            })
            return {...state, sounds: newSoundStateF}

        //new
        case "setCurrentId":
            const anotherIndex = state.sounds.findIndex(sound => sound.id === action.id)
            return {...state, currentSoundId: action.id, currentIndex : anotherIndex}
    }
}

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
            <div style = {{ height : "100%", display : "flex", flexDirection : "row", justifyContent : "center", alignItems : "center"}}>
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