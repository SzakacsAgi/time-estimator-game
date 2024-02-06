import {useRef, useState} from "react";

export default function Player() {
    const input = useRef();
    const [username, setUsername] = useState()
    function handelButtonClick(){
        setUsername(input.current.value);
    }
  return (
    <section id="player">
      <h2>Welcome {username ? username : 'unknown entity'}</h2>
      <p>
        <input type="text" ref={input}/>
        <button onClick={handelButtonClick}>Set Name</button>
      </p>
    </section>
  );
}
