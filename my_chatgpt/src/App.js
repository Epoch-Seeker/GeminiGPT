import logo from './logo.svg';
import './normal.css';
import './App.css';
import {useState , useEffect , useRef} from 'react';

function App() {

  useEffect(() => {
    getEngines();
  },[])
  const [input, setInput] = useState("");
  const [models, setModels] = useState([]);
  const [currentModel, setCurrentModel] = useState("models/gemini-1.5-pro");
  const [chatLog, setChatLog] = useState([]);

//clear chat button
function clearChat(){
  setChatLog([]);
}

function scrollToBottom() {
  const chatContainer = document.getElementById("chatContainer");
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function getEngines() {
  fetch("http://localhost:3080/models")
    .then(res => res.json())
    .then(data => {
      console.log("Full API Response:", data);

      if (data.models && Array.isArray(data.models)) { 
        setModels(data.models); // Assuming data.models is an array
      } else {
        console.error("Unexpected API response format:", data);
      }
    })
    .catch(err => console.error("Error fetching models:", err));
}



async function handleSubmit(e) {
  e.preventDefault();
  
  // Add the user's message to the chat log (properly using state updates)
  const updatedChatLog = [...chatLog, { user: "me", message: input }];
  await setChatLog(updatedChatLog);  
  await setInput("");

  try {
      // Send the updated chat log to the backend
      const response = await fetch("http://localhost:3080/", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              message: updatedChatLog.map((msg) => msg.message).join("\n"),
              currentModel
          })
      });

      // Parse response from the backend
      const data = await response.json();

      // Append the bot's response to the chat log
      await setChatLog([...updatedChatLog, { user: "gpt", message: data.message }]);

      scrollToBottom();

  } catch (error) {
      console.error("Error fetching response:", error);
  }
}



  return (
    <div className="App">
    <aside className="sidemenu">
      <div className="side-menu-button" onClick={clearChat}>
        <span>+</span>
        New Chat
      </div>
      <div className="models">
  <label>Select Your Model</label>
  <select onChange={(e) => setCurrentModel(e.target.value)}>
    {models.length > 0 ? (
      models.map((model) => (
        <option key={model.id} value={model.id}>
          {model.name}
        </option>
      ))
    ) : (
      <option disabled>Loading models...</option>
    )}
  </select>
</div>


    </aside>
    <section className="chatbox">
    <div className="chat-log">
      {
        chatLog.map((message, index) => (
          <ChatMessage message={message} key={index}/>
        ))
      }
    </div>
      <div className="chat-input-holder">
    <form onSubmit={handleSubmit}>
        <input rows="1"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="chat-input-textarea" placeholder="Ask anything">
          
        </input>
        </form>
      </div>
    </section>
    </div>
  );
}

const Chat = ({ messages }) => {
  const chatRef = useRef(null);
  const lastMsgRef = useRef(null);

  useEffect(() => {
      if (lastMsgRef.current) {
          lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
      }
  }, [messages]); // Scroll when messages update

  return (
      <div ref={chatRef} className="chat-container" aria-live="polite">
          {messages.map((msg, index) => (
              <div
                  key={index}
                  className="chat-message"
                  ref={index === messages.length - 1 ? lastMsgRef : null}
              >
                  {msg}
              </div>
          ))}
      </div>
  );
};


const  ChatMessage = ({message}) => {
  return (
  <div className={`chat-message ${message.user === "gpt" && 
    "chatgpt"
  }`}>
        <div className="chat-message-center">
          <div className={`avatar ${message.user === "gpt" && 
            "chatgpt"
          }`}>
          {message.user === "gpt" && <svg  xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    className="h-2/3 w-2/3"
  >
    <text x={-9999} y={-9999}>
      {"ChatGPT"}
    </text>
    <path
      fill="currentColor"
      d="M9.205 8.765v-2.26c0-.19.071-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.567 0 .166 0 .356-.024.547l-4.71-2.76a.797.797 0 0 0-.856 0l-5.97 3.473Zm10.609 8.8v-5.399c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.432.432 0 0 1 .476 0l4.543 2.617c1.309.761 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163ZM7.802 12.81l-1.95-1.142c-.167-.095-.239-.238-.239-.428V6.006c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.174c-.285.166-.428.404-.428.737v6.898ZM12 15.235l-2.795-1.57v-3.33L12 8.765l2.795 1.57v3.33L12 15.235Zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472Zm-5.638-5.303-4.543-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 0 1 4.21 6.434v5.423c0 .334.143.571.428.738l5.947 3.449-1.95 1.118a.433.433 0 0 1-.477 0Zm-.261 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523Zm5.899 2.83a5.947 5.947 0 0 0 5.828-4.756c2.663-.69 4.376-3.188 4.376-5.733 0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0 0 10.205.107a5.947 5.947 0 0 0-5.827 4.757C1.713 5.554 0 8.052 0 10.597c0 1.665.714 3.282 1.998 4.448-.119.5-.19.999-.19 1.498 0 3.401 2.759 5.947 5.946 5.947.642 0 1.26-.095 1.88-.31a5.96 5.96 0 0 0 4.162 1.713Z"
    />
  </svg> }
          </div>
          <div className="message">
            {message.message}
          </div>
        </div>
      </div>
  )
}

export default App;