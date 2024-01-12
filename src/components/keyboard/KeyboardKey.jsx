import React from 'react'

/*

easiest way to get hover on keys, was to make a keys class and in the app.css add a hover option. Really need to get a css style engine

When I want to scale the whole project up depending on screen size, these keys will be an issue. I either need a hook for screen dimensions
or I need to figure out a way to place the key depending on css.
Maybe I can work some magic with em?
*/

 const WhiteKey = (props) => {
    const {handleClick, placement} = props;
    const left = (40 * placement);
    return (
        <div
            className = "keys"
            onClick = {handleClick}
            style = {{
                backgroundImage : "url(whiteKey40W.png)",
                width : "40px", 
                height : "100px", 
                backgroundColor : "white", 
                position : "absolute",
                top : "0px",
                left : left + "px",
                boxSizing : "border-box"
                }}>
            
        </div>
    )
}

const BlackKey = (props) => {
    const {handleClick, placement} = props;
    const left = (40 * placement) -10; //The 11 is half the width of a black key. It so a black key will be inbetween 2 different white keys
    return (
        <div
            className = "keys"
            onClick = {handleClick}
            style = {{
                backgroundImage : "url(blackKey20W.png)",
                width : "20px", 
                height : "70px", 
                backgroundColor : "black", 
                position : "absolute",
                top : "0px",
                left : left + "px",
                boxSizing : "border-box"
                }}>

        </div>
    )
}

const KeyboardKey = (props) => {
    const {handleButtonClick, noteInfo} = props;
    const {baseFrequency, note, type, placement} = noteInfo;
    const handleClick = () => {
        handleButtonClick({baseFrequency: baseFrequency})
    }
    return( 
        <>
            {type === 0 ? <WhiteKey handleClick = {handleClick} note = {note} placement = {placement}/> : <BlackKey handleClick = {handleClick} note = {note} placement = {placement}/>}
        </>
    )
}
export default KeyboardKey;
//onPointerDown = {handlePointerDown}  onPointerUp = {handlePointerUp}

//        <WhiteKey handleClick = {handleClick} note = {note}/>


/*


------This is some old stuff from when I was trying continuos sound, worth looking at if I try again

const [soundState, setSoundState] = useState(null);

const handlePointerDown = () => {
    if(soundState!== null)
    {
        setSoundState(prevState => {
            prevState.oscilator.stop();
            //prevState.context.close()
            return null
        })
    }
    let audioContext = new AudioContext()
    let o = audioContext.createOscillator()
    let g = audioContext.createGain()
    o.connect(g)
    o.type = "sine"
    o.frequency.value = baseFrequency * Math.pow(2, sliderAmount);
    g.connect(audioContext.destination)
    o.start(0);
    setSoundState({
        context : audioContext,
        oscilator : o,
        gain : g
    });
}

const handlePointerUp = () => {
    if(soundState !== null)
    {
        //soundState.stop();
        soundState.gain.gain.exponentialRampToValueAtTime(
            0.00001, soundState.context.currentTime + .1
        )
        setTimeout(() => setSoundState(prevState => {
            prevState.oscilator.stop();
            //prevState.context.close()
            return null
        }),
        100
        )

    }
}

*/