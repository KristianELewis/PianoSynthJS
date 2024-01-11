import { useState, useRef, useReducer } from 'react'
import ControlKnob from './ControlKnob'
import WaveButton from './WaveButton'
import GenericButton from './GenericButton'
import ControlKnobPanel from './ControlKnobPanel'
import NoiseScreen from './NoiseScreen'

/*
When no sound is selected, buttons and dials should be deactivated and visually dark/deactivated looking

when active the cursor should be click cursor

*/


const SelectedSoundOptions = (props) => {
    const {audioContext, dispatchSound, id, currentSoundId,
        waveType, setWaveType, 
        octave, setOctave,
        gain, setGain, setMouseMove, sounds, handleAddNewSound, handleSetCurrentSoundID} = props;
    /*if(currentSoundId === null)
    {
        return <p>no sound</p>
    }*/
    const [playOrStop, setPlayOrStop] = useState("Play")
    const [soundState, setSoundState] = useState(null)

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
    const handleOctave = (value) => {
        if(soundState !==null){
            soundState.o.frequency.setValueAtTime((baseFrequency * Math.pow(2, value)), audioContext.currentTime)
        }
        setOctave(value)
        dispatchSound({type : "ChangeOctave", octave : value, id : id})
    }
    const handleGain = (value) => {
        if(soundState !==null){
            soundState.g.gain.setValueAtTime(value /100, audioContext.currentTime);
        }
        setGain(value)
        dispatchSound({type : "ChangeGain", gain : value, id : id})

    }
    const handleWaveTypeChange = (value) => {
        if(soundState !==null){
            soundState.o.type = value;
        }
        setWaveType(value)
        dispatchSound({type : "ChangeWaveType", waveType : value, id : id})
    }
    const handleDelete = () => {
        dispatchSound({type : "DeleteSound", id : id})
    }
    


    return (
        <>
        {/*<div style = {{width: "300px", height : "250px", boxSizing: "border-box",border: "solid grey 1px", padding: "10px", backgroundImage : "url(backgroundPanel.png)", backgroundPosition : "center"}}>*/}
                {/*<p>C Frequency at octave {octave}: {baseFrequency * Math.pow(2, octave)}</p>*/}
                <ControlKnobPanel setMouseMove = {setMouseMove} handleOctave = {handleOctave} octave = {octave} handleGain = {handleGain} gain = {gain}/>
                <div id = "waveformContainer">
                    <div id = "waveformDisplayConatiner">
                        {/*<div id = "waveformDisplay">*/}
                            <NoiseScreen sounds = {sounds} audioContext = {audioContext} dispatchSound = {dispatchSound} handleSetCurrentSoundID = {handleSetCurrentSoundID} handleAddNewSound = {handleAddNewSound}/>
                        {/*</div>*/}
                    </div>
                    <div id = "buttonContainer">
                        <div style = {{display: "flex", justifyContent : "space-between", alignContent : "center", alignItems : "center"}}>
                            <p className = "controlPanelText">Wave Type</p>
                            <div style = {{display : "grid", gridTemplateColumns: "70px 70px"}}>
                                <WaveButton className = "waveButton" type = {"sine"} selectedType = {waveType} handleWaveTypeChange = {handleWaveTypeChange}/>
                                <WaveButton className = "waveButton" type = {"square"} selectedType = {waveType} handleWaveTypeChange = {handleWaveTypeChange}/>
                                <WaveButton className = "waveButton" type = {"sawtooth"} selectedType = {waveType} handleWaveTypeChange = {handleWaveTypeChange}/>
                                <WaveButton className = "waveButton" type = {"triangle"} selectedType = {waveType} handleWaveTypeChange = {handleWaveTypeChange}/>
                            </div>
                        </div>
                        <div style = {{marginTop: "10px", display: "flex", justifyContent : "space-between"}}>
                            <GenericButton clickFunction = {handlePlayOrStop} name = {playOrStop}/>
                            <GenericButton clickFunction = {handleDelete} name = {"remove sound"}/>
                        </div>
                    </div>
                </div>
        {/*</div>*/}
        </>
    )
}
export default SelectedSoundOptions
//                <button onClick = {props.handleClick}>sounds</button>
