import './App.css';

import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { nanoid } from 'nanoid';

const socket = io("http://localhost:5000");
const userName: string = nanoid(4)

const  App = () => {

const [message, setMessage] = useState<string>('');
const [chat, setChat] = useState<Array<{ message: string, userName: string }>>([]);

const sendChat = (e: React.FormEvent<HTMLFormElement>): void => {
e.preventDefault()
socket.emit("chat", { message, userName })
setMessage('');

}

useEffect(() => {
socket.on("chat", (payload: { message: string, userName: string }) => {
setChat([...chat, payload])
})
}, [chat])

return (
<div className="App">
<header className="App-header">
<h1>
Chat App
</h1>
{chat.map((payload, index) => {
      return (
        <p key={index}>{payload.message}:<span> id:{payload.userName}</span></p>
      )
    })}

    <form onSubmit={sendChat}>
      <input type="text" name="chat"
        placeholder="send text"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value)
        }}
      />
      <button type='submit'>Send</button>

    </form>

  </header>
</div>
);
}

export default App;