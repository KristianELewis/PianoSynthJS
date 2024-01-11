import { useState, useRef, useReducer } from 'react'
import SelectedSoundOptions from './SelectedSoundOptions';
import IndividualNoise from './IndividualNoise';
import Keyboard from './Keyboard';

import NoiseScreen from './NoiseScreen'
/*
    Im gonna completely rework this soon. The accordian nonsense is annoying me, probably want different event handling for the keyboard, and maybe more options for continous noise and what not
    Everything is being passed from here into the next component. The design has changed enough that this component should just be removed and the next component has taken its place
*/

function soundReducer(state, action) {
    switch (action.type){
        case "AddSound":
            return [...state, {id : action.id, waveType : "sine", gain : 50, octave : 4}]
        case "DeleteSound":
            const index = state.findIndex(sound => sound.id === action.id)
            const newarr = state.toSpliced(index, 1)
            return newarr
        case "ChangeWaveType":
            let newSoundState = state.map(sound => {
                if (sound.id === action.id)
                {
                    return {...sound, waveType : action.waveType}
                }
                else{
                    return sound
                }
            })
            return newSoundState
        case "ChangeGain":
            let newSoundStateG = state.map(sound => {
                if (sound.id === action.id)
                {
                    return {...sound, gain : action.gain}
                }
                else{
                    return sound
                }
            })
            return newSoundStateG
        case "ChangeOctave":
            let newSoundStateF = state.map(sound => {
                if (sound.id === action.id)
                {
                    return {...sound, octave : action.octave}
                }
                else{
                    return sound
                }
            })
            return newSoundStateF
    }
}

const SoundBoard = () => {
    const id = useRef(-1);
    const [audioContext, setAudioContext] = useState(() => {return new AudioContext()})
    const [sounds, dispatchSound] = useReducer(soundReducer, [])
    const [currentSoundId, setCurrentSoundId] = useState(null)

    const [mouseMove, setMouseMove] = useState(null)

    const [waveType, setWaveType] = useState("sine")
    const [octave, setOctave] = useState(4);
    const [gain, setGain] = useState(50);

    const handleSetCurrentSoundID = (id) => {
        setCurrentSoundId(id)
        const index = sounds.findIndex(sound => sound.id === id)
        const currentSound = sounds[index];
        setWaveType(currentSound.waveType)
        setOctave(currentSound.octave)
        setGain(currentSound.gain)
    }

    const handleAddNewSound = () => {
        id.current++;
        dispatchSound({type: "AddSound", id : id.current})
    }
    const handleButtonClick = (params) => {
        const {baseFrequency} = params;
        for(const sound of sounds)
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
    return (
        <>
        <div className = "soundBoard" onPointerMove = {mouseMove} onPointerLeave = {handleThing} onPointerUp = {handleThing}>
            <div style = {{ height : "100%", display : "flex", flexDirection : "row", justifyContent : "center", alignItems : "center"}}>
                <SelectedSoundOptions 
                    audioContext = {audioContext}
                    dispatchSound = {dispatchSound}
                    handleSetCurrentSoundID = {handleSetCurrentSoundID}
                    id = {currentSoundId}
                    currentSoundId = {currentSoundId}
                    handleAddNewSound = {handleAddNewSound}
                    sounds = {sounds}
                    handleClick = {handleClick}
                    waveType = {waveType} setWaveType = {setWaveType}
                    octave = {octave} setOctave = {setOctave}
                    gain = {gain} setGain = {setGain} setMouseMove = {setMouseMove}
                />
            </div>
            <Keyboard handleButtonClick = {handleButtonClick}></Keyboard>
        </div>
        </>
        
    )
}
export default SoundBoard;
//                <button onClick = {handleClick}>sounds</button>