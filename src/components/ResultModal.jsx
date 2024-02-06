import {forwardRef, useImperativeHandle, useRef} from "react";
import {createPortal} from "react-dom";

const ResultModal = forwardRef( function ResultModal({targetTime, remainingTime, onReset}, ref){
    const dialog = useRef();
    useImperativeHandle(ref, () =>{
        return {
            open(){dialog.current.showModal()},
            close(){dialog.current.close()}
        }
    })
    const won = remainingTime > 0;
    const score = (targetTime * 1000 - remainingTime)/ 1000;

    return (
        createPortal( <dialog ref={dialog} className="result-modal" onClose={onReset}>
                {won && <h2>You scored: {score}</h2>}
                {!won && <h2>You lost</h2>}
                <p>The target time was <strong>{targetTime} second{targetTime > 1 ? 's' : ''}.</strong></p>
                <p>You stopped the timer with <strong>{remainingTime / 1000} seconds left</strong></p>
                <form action="dialog" onSubmit={(event) => event.preventDefault()}>
                    <button onClick={onReset}>Close</button>
                </form>
            </dialog>,
            document.getElementById('modal')
        ))
})

export default ResultModal;