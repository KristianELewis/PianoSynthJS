import { useState, useRef, useReducer, useEffect } from 'react'
import SelectedSoundOptions from './SelectedSoundOptions';
import Keyboard from './keyboard/Keyboard';
import soundReducer from './soundReducer';
import notes from '../notes';
/*    
    Everything is being passed from here into the next component. The design has changed enough that this component should just be removed and the next component has taken its place

    Im currently in the process of making major changes to the sounds reducer.
    I may pass down setters and values differently.
    Octave, gain, waveType things may be removed. They can be derived from the soundModules reducer, so they don't have to be derived and passed down from this component
    */

const SoundBoard = () => {
    const id = useRef(-1);
    const [audioContext, setAudioContext] = useState(() => {return new AudioContext()})
    //dispatch is named incorrectly, sounds is also a bad name. Maybe soundModules? and change the component to soundModule?
    const [soundModules, dispatchSound] = useReducer(soundReducer, {sounds : [], currentSoundId : -1, currentIndex : -1})
    const [controlsDisabled, setControlsDisabled] = useState(true);

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

    /*================================================================

    HANDLING KEYBOARD EVENTS AND MOUSE/POINTER EVENTS

    This should never really be relevant for mobile/touch devices. Hopefully it does not interfere with either.
    I used mouseEnter because from my understanding, pointer enter is only really helpful for funtionality that includes both mouse and touch devices. Im speciuifically targeting mice
    
    Maybe in the future Ill remove the mouseEnter/leave portion of this and just use a "switch" on the sound board that when switched on will listen for keyboard events
    That might be easier to deal with in general, and also a better expereince for thew user.
    I'll explore that idea when I add switches for showing the notes and corresponding phsyical keyboard key
    ================================================================*/
    const [mouseMove, setMouseMove] = useState(null)
    const [mouseIn, setMouseIn] = useState(false);

    const handleMouseEnter = () => {
        setMouseIn(true)
    }
    //These are pointer rather than mouse events because touch devices control the control knobs in the same way. This are used in the control knobs
    const handlePointerLeave = () => {
        setMouseIn(false)
        setMouseMove(null)
    }
    //Had these as separate functions, but I may just remove this handle function. Not important to worry about
    const handlePointerUp = () => {
        setMouseMove(null)
    }
    useEffect(() => {
        const keyUpFunction = (e) => {
            if(mouseIn){
                console.log("keyup");
                let element = notes.find((element) => element.letter === e.key)
                //console.log(soundModules.sounds)
                if(element !== undefined){
                    handleButtonClick({baseFrequency : element.baseFrequency})
                }
            }
        }
        window.addEventListener("keyup", keyUpFunction);

        return () => {
            window.removeEventListener("keyup", keyUpFunction);
        }
    },[mouseIn, soundModules])
    
    return (
        <>
        <div className = "soundBoard" onPointerMove = {mouseMove} onPointerLeave = {handlePointerLeave} onPointerUp = {handlePointerUp} onMouseEnter = {handleMouseEnter}>
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
                    waveType = {soundModules.currentIndex === -1 ? "sine" : soundModules.sounds[soundModules.currentIndex].waveType} 
                    octave = {soundModules.currentIndex === -1 ? 0 : soundModules.sounds[soundModules.currentIndex].octave} 
                    gain = {soundModules.currentIndex === -1 ? 0 : soundModules.sounds[soundModules.currentIndex].gain} 
                    setMouseMove = {setMouseMove}
                    controlsDisabled = {controlsDisabled}
                    setControlsDisabled = {setControlsDisabled}
                />
            </div>
            <Keyboard handleButtonClick = {handleButtonClick} controlsDisabled = {controlsDisabled}></Keyboard>
        </div>
        </>
    )
}
export default SoundBoard;