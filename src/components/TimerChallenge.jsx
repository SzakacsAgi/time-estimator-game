import {useRef, useState} from "react";
import ResultModal from "./ResultModal.jsx";

export default function TimerChallenge({title, challengeTime}){
    let timer = useRef();
    let modal = useRef();
    const [remainingTime, setRemainingTime] = useState(challengeTime * 1000);
    let isChallengeStarted = (remainingTime > 0) && (remainingTime<challengeTime*1000);

    if (remainingTime <= 0){
        handelStopChallenge();
    }

    function handelStartChallenge(){
        timer.current = setInterval(() =>{
            setRemainingTime(prevState => prevState - 10);
        }, 10)
    }

    function handelStopChallenge(){
        clearInterval(timer.current);
        modal.current.open();
    }

    function handelResetChallenge(){
        setRemainingTime(challengeTime * 1000);
        modal.current.close();
    }

    return (
        <section className="challenge">
            <ResultModal ref={modal} targetTime={challengeTime} remainingTime={remainingTime} onReset={handelResetChallenge}/>
            <h2>{title}</h2>
            <p className="challenge-time">
                {challengeTime + " second"}{challengeTime > 1 ? "s" : ''}
            </p>
            <button onClick={isChallengeStarted ? handelStopChallenge : handelStartChallenge}>
                {isChallengeStarted ? 'Stop' : 'Start'} Challenge
            </button>
            <p>
                {isChallengeStarted ? 'Time is running...' : 'Timer is inactive'}
            </p>
        </section>
    )
}