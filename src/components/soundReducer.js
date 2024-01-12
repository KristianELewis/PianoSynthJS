function soundReducer(state, action) {
    switch (action.type){
        case "AddSound":
            //Maybe refactor this a little bit for clarity sake.
            //the current index is set to the index of the last element in the sound arrays.
            //This happens top be the length of the array before the new element is added.
            //Hence why I used state.sounds.length, because it was the quickest way to do it at the time.
            //Maybe this explanation will do
            return {sounds: [...state.sounds, {id : action.id, waveType : "sine", gain : 50, octave : 4}], currentSoundId : action.id, currentIndex : state.sounds.length}
            
        case "DeleteSound":
            //This can be refactored for sure
            if(state.sounds.length === 1)
            {
                return {sounds : [], currentSoundId : -1, currentIndex : -1}
            }

            const index = state.sounds.findIndex(sound => sound.id === action.id)
            const newarr = state.sounds.toSpliced(index, 1)
            let newIndex = newarr.length - 1;
            let newId = newarr[newIndex].id

            return {sounds : newarr, currentSoundId : newId, currentIndex : newIndex}

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

        case "setCurrentId":
            const anotherIndex = state.sounds.findIndex(sound => sound.id === action.id)
            return {...state, currentSoundId: action.id, currentIndex : anotherIndex}
    }
}

export default soundReducer;