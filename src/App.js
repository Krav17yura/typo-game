import React, {useState, useEffect} from 'react';
import './App.css';
import useCountDown from 'react-countdown-hook'

const secondsToCount = 10;
const paragraph = `Coding is the best. We are able to build something from scratch. It is literally imagination incarnate. Solving our own problems through coding is one of the coolest things we could do!`;


const findTypo = (str1, str2) => {
    let typos = [];
    [...str2].forEach((item, index) => {
        if (item !== str1.charAt(index)) typos.push(index)
    })
    return typos
}

function App() {
    const [timeLeft, {start, reset}] = useCountDown(secondsToCount * 1000, 100);
    const [typedText, setTypedText] = useState("")
    const [typoIndexes, setTypoIndexes] = useState([2])


    useEffect(() => {
        setTypoIndexes(findTypo(paragraph, typedText))
    }, [typedText])

    useEffect(() => {
        if (typedText.length === 0) return;
        if (timeLeft !== 0) return;

        const wordsTyped = (typedText.length - typoIndexes.length)
        alert(wordsTyped.toFixed(0))
    }, [timeLeft])


    function startTimer() {
        setTypedText('');
        start();
    }

    function resetTimer() {
        setTypedText('');
        reset();
    }

    return (
        <div className="app">
            <div className="sidebar">
                <div className="timer">{(timeLeft / 1000).toFixed(2)}</div>
                <button className="start" onClick={() => startTimer()}>Start</button>
                <button className="reset" onClick={() => resetTimer()}>Reset</button>
            </div>
            <div className="content">
                <p>{[...paragraph].map((character, index) => {
                    let characterClass = '';
                    let hasBeenTyped = typedText.length > index

                    if (hasBeenTyped) {
                        characterClass = typoIndexes.includes(index) ? 'incorrect' : 'correct'
                    }
                    return <span key={index} className={characterClass}>{character}</span>
                })}</p>
                <form>
                    <textarea
                        rows="10"
                        placeholder="Test your typing skills..."
                        value={typedText}
                        onChange={event => setTypedText(event.target.value)}/>
                </form>
            </div>
        </div>
    )
}

export default App;
