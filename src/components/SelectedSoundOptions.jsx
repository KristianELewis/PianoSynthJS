import { useState, useRef, useReducer } from 'react'

const SelectedSoundOptions = (props) => {
    const {audioContext, dispatchSound, id, currentSoundId,
        waveType, setWaveType, 
        octave, setOctave,
        gain, setGain} = props;
    if(currentSoundId === null)
    {
        return <p>no sound</p>
    }
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
    const handleOctave = (e) => {
        if(soundState !==null){
            soundState.o.frequency.setValueAtTime((baseFrequency * Math.pow(2, e.target.value)), audioContext.currentTime)
        }
        setOctave(e.target.value)
        dispatchSound({type : "ChangeOctave", octave : e.target.value, id : id})
    }
    const handleGain = (e) => {
        if(soundState !==null){
            soundState.g.gain.setValueAtTime(e.target.value /100, audioContext.currentTime);
        }
        setGain(e.target.value)
        dispatchSound({type : "ChangeGain", gain : e.target.value, id : id})

    }
    const handleWaveTypeChange = (e) => {
        if(soundState !==null){
            soundState.o.type = e.target.value;
        }
        setWaveType(e.target.value)
        dispatchSound({type : "ChangeWaveType", waveType : e.target.value, id : id})
    }
    const handleDelete = () => {
        dispatchSound({type : "DeleteSound", id : id})
    }
    
    return (
        <div style = {{width: "400px", height : "250px", border: "solid grey 1px", padding: "10px"}}>
                <p>C Frequency at octave {octave}: {baseFrequency * Math.pow(2, octave)}</p>
                <div>
                    <p>Octave: {octave}</p>
                    <input type="range" step={1} min = {0} max = {8} onChange = {handleOctave} value = {octave}/>
                </div>
                <div>
                    <p>Volume: {gain}</p>
                    <input type="range" step={1} min = {0} max = {100} onChange = {handleGain} value = {gain}/>
                </div>
                <div style = {{display: "flex", justifyContent : "space-between", alignContent : "center", alignItems : "center"}}>
                    <p>Wave Type:</p>
                    <select onChange = {handleWaveTypeChange} value = {waveType} size="small">
                        <option value="sine">sine</option>
                        <option value="square">square</option>
                        <option value="sawtooth">sawtooth</option>
                        <option value="triangle">triangle</option>
                    </select>
                </div>
                <div style = {{marginTop: "10px", display: "flex", justifyContent : "space-between"}}>
                    <button onClick = {handlePlayOrStop} >{playOrStop}</button>
                    <button onClick = {handleDelete} >remove sound</button>
                </div>

        </div>
    )
}
export default SelectedSoundOptions
//                <button onClick = {props.handleClick}>sounds</button>
