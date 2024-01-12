import { useState, useRef, useReducer } from 'react'
import WaveButton from './buttons/WaveButton'
import GenericButton from './buttons/GenericButton'
import ControlKnobPanel from './controlKnob/ControlKnobPanel'
import SoundModuleSelectionScreen from './soundModule/SoundModuleSelectionScreen'

/*
When no sound is selected, buttons and dials should be deactivated and visually dark/deactivated looking

when active the cursor should be click cursor

Originally choosing sounds, and they're setting were in different components. This component was dedicated to changin a specific sounds options/setting, hence the name.
Things have been rearranged since then, and this file and the sound board have become a bit redundant.

There is only really a distinction between the keyboard and the overall settings. Perhaps just call this the settings panel?
*/


const SelectedSoundOptions = (props) => {
    const {
        audioContext,
        dispatchSound,
        id,
        currentSoundId,
        waveType,
        octave,
        gain,
        setMouseMove,
        sounds,
        handleAddNewSound,
        handleSetCurrentSoundID
    } = props;

    const [playOrStop, setPlayOrStop] = useState("Play")
    const [soundState, setSoundState] = useState(null)
    const [controlsDisabled, setControlsDisabled] = useState(true);
    let baseFrequency = 16.35;

    const handlePlayOrStop = () => {
        if(playOrStop === "Play")
        {
            if(soundState === null)
            {
                let o = audioContext.createOscillator()
                let g = audioContext.createGain()
                o.connect(g)
                o.type = waveType;
                o.frequency.value = baseFrequency * Math.pow(2, octave);
                g.connect(audioContext.destination)
                o.start();
                g.gain.setValueAtTime(gain /100, audioContext.currentTime);
                setSoundState({o : o, g : g})
                setPlayOrStop("Stop")
                console.log("yuh")
            }
        }
        else{
            if(soundState !== null){
                soundState.o.stop();
                setSoundState(null)
                setPlayOrStop("Play")
            }
        }
    }
    /*==================================
    MODIFYING A SOUND MODULE
    Modifying the sound state is a two step process. The checks for (soundState !==null) is to see if the user is currently testing one specific sound. 
    If they are, then we update it so they can hear the change in real time.

    The second step is a dispatch to the soundReducer state. This updates the sound as its played when the play a note on a keyboard.
    ==================================*/

    const handleOctave = (value) => {
        if(soundState !==null){
            soundState.o.frequency.setValueAtTime((baseFrequency * Math.pow(2, value)), audioContext.currentTime)
        }
        dispatchSound({type : "ChangeOctave", octave : value, id : id})
    }
    const handleGain = (value) => {
        if(soundState !==null){
            soundState.g.gain.setValueAtTime(value /100, audioContext.currentTime);
        }
        dispatchSound({type : "ChangeGain", gain : value, id : id})
    }
    const handleWaveTypeChange = (value) => {
        if(soundState !==null){
            soundState.o.type = value;
        }
        dispatchSound({type : "ChangeWaveType", waveType : value, id : id})
    }
    const handleDelete = () => {
        if(sounds.length === 1){
            setControlsDisabled(true);
        }
        dispatchSound({type : "DeleteSound", id : currentSoundId})
    }

    const handleAddNewSound2 = () => { //this needs to be removed when components are consolidated
        setControlsDisabled(false);
        handleAddNewSound();
    }
    return (
        <>
        {/*<div style = {{width: "300px", height : "250px", boxSizing: "border-box",border: "solid grey 1px", padding: "10px", backgroundImage : "url(backgroundPanel.png)", backgroundPosition : "center"}}>*/}
                {/*<p>C Frequency at octave {octave}: {baseFrequency * Math.pow(2, octave)}</p>*/}
                <div id = "waveformContainer">
                    <div id = "waveformDisplayConatiner">
                        {/*<div id = "waveformDisplay">*/}
                            <SoundModuleSelectionScreen sounds = {sounds} audioContext = {audioContext} dispatchSound = {dispatchSound} handleSetCurrentSoundID = {handleSetCurrentSoundID} handleAddNewSound = {handleAddNewSound2} controlsDisabled = {controlsDisabled}/>
                        {/*</div>*/}
                    </div>
                    <div id = "buttonContainer">
                        <div style = {{display: "flex", justifyContent : "space-between", alignContent : "center", alignItems : "center"}}>
                            <p className = "controlPanelText">Wave Type</p>
                            <div style = {{display : "grid", gridTemplateColumns: "70px 70px"}}>
                                <WaveButton className = "waveButton" type = {"sine"} selectedType = {waveType} handleWaveTypeChange = {handleWaveTypeChange} controlsDisabled = {controlsDisabled}/>
                                <WaveButton className = "waveButton" type = {"square"} selectedType = {waveType} handleWaveTypeChange = {handleWaveTypeChange} controlsDisabled = {controlsDisabled}/>
                                <WaveButton className = "waveButton" type = {"sawtooth"} selectedType = {waveType} handleWaveTypeChange = {handleWaveTypeChange} controlsDisabled = {controlsDisabled}/>
                                <WaveButton className = "waveButton" type = {"triangle"} selectedType = {waveType} handleWaveTypeChange = {handleWaveTypeChange} controlsDisabled = {controlsDisabled}/>
                            </div>
                        </div>
                        <div style = {{marginTop: "10px", display: "flex", justifyContent : "space-between"}}>
                            <GenericButton clickFunction = {handlePlayOrStop} name = {playOrStop}  controlsDisabled = {controlsDisabled}/>
                            <GenericButton clickFunction = {handleDelete} name = {"remove sound"} controlsDisabled = {controlsDisabled}/>
                        </div>
                    </div>
                </div>
                <ControlKnobPanel setMouseMove = {setMouseMove} handleOctave = {handleOctave} octave = {octave} handleGain = {handleGain} gain = {gain} controlsDisabled = {controlsDisabled}/>
        {/*</div>*/}
        </>
    )
}
export default SelectedSoundOptions
//                <button onClick = {props.handleClick}>sounds</button>
