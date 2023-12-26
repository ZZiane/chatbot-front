import { useState } from "react";
import "./App.css";
import logoMQL from "./logoMQL.png";
import logout from "./logout.png";
/* eslint-disable no-restricted-globals */

function App() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const chat = async (e, message) => {
    e.preventDefault();

    if (!message) return;
    setIsTyping(true);
    scrollTo(0, 1e10);
    var formdata = new FormData();
    formdata.append("msg",message);
    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);

    setMessage("");
    //URL
    fetch(URL, {
      method: "POST",
      body: formdata,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        msgs.push({ role: "MQL Bot", content: data.output });
        setChats(msgs);
        setIsTyping(false);
        scrollTo(0, 1e10);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div class="container">

     
      <header>
      <img  className="logo-mql" src={logoMQL} alt="Logo" />
      <img  className="logo-logout" src={logout} alt="Logo" />
      </header>
       <main>
      <h1>MQL CHATBOT</h1>

      <section>
        {chats && chats.length
          ? chats.map((chat, index) => (
              <p key={index} className={chat.role === "user" ? "user_msg" : ""}>
                <span>
                  <b>{chat.role.toUpperCase()}</b>
                </span>
                <span>:</span>
                <span>{chat.content}</span>
              </p>
            ))
          : ""}
      </section>

      <div className={isTyping ? "" : "hide"}>
        <p>
          <i>{isTyping ? "Typing" : ""}</i>
        </p>
      </div>

      <form action="" onSubmit={(e) => chat(e, message)}>
        <input
          type="text"
          name="message"
          value={message}
          placeholder="Type a message here "
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
       </main>

</div>
  );
}

export default App;
