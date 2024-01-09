import { useState, useRef, useReducer } from 'react'
import SelectedSoundOptions from './SelectedSoundOptions';
import IndividualNoise from './IndividualNoise';
import Keyboard from './Keyboard';

/*
    Im gonna completely rework this soon. The accordian nonsense is annoying me, probably want different event handling for the keyboard, and maybe more options for continous noise and what not
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
                console.log("inside")

                console.log(action.waveType)
                console.log(action.id)
                console.log(sound.id)

                if (sound.id === action.id)
                {


                    return {...sound, waveType : action.waveType}
                }
                else{
                    return sound
                }
            })
            console.log("Change")
            console.log(newSoundState)
            console.log(action.waveType)
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

    const [waveType, setWaveType] = useState("sine")
    const [octave, setOctave] = useState(4);
    const [gain, setGain] = useState(50);

    const handleSetCurrentSoundID = (id) => {
        console.log(currentSoundId)
        setCurrentSoundId(id)
        const index = sounds.findIndex(sound => sound.id === id)
        const currentSound = sounds[index];
        console.log(currentSound)
        setWaveType(currentSound.waveType)
        setOctave(currentSound.octave)
        setGain(currentSound.gain)
    }

    
    /*
    const setCurrrentSound = (id) => {
        console.log("Doing stuff")
        //probably could just remove this funciton and use the dispatch in the individual sound
        const  index = sounds.findIndex(sound => sound.id === id)
        setCurrentSound(sounds[index]);
    }*/

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
    return (
        <div style = {{ height : "100%", minHeight: "400px", display : "flex", flexDirection : "row", justifyContent : "center", alignItems : "center"}}>

                <div style = {{display: "flex", flexDirection : "column", alignItems : "center", boxSizing : "border-box", paddingTop : "10px", paddingBottom : "10px", marginBottom : "10px", width : "325px", maxHeight : "350px", overflowY : "scroll", border: "grey 1px", borderStyle : "solid none solid none "}}>
                    {sounds.map((sound) => {
                        return(
                            <IndividualNoise key = {sound.id} audioContext = {audioContext} dispatchSound = {dispatchSound} setCurrentSoundId = {handleSetCurrentSoundID} id = {sound.id}/>
                        )
                    })}
                    <button style ={{width : "294px"}} onClick = {handleAddNewSound}>Add New Sound</button>
                </div>
                <SelectedSoundOptions audioContext = {audioContext} dispatchSound = {dispatchSound} id = {currentSoundId} currentSoundId = {currentSoundId} sounds = {sounds}
                    handleClick = {handleClick}
                    waveType = {waveType} setWaveType = {setWaveType}
                    octave = {octave} setOctave = {setOctave}
                    gain = {gain} setGain = {setGain}
                />
        </div>
        
    )
}
export default SoundBoard;
//                <button onClick = {handleClick}>sounds</button>

//                <Keyboard handleButtonClick = {handleButtonClick}></Keyboard>