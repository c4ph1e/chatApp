import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

function ChatPage() {
    const [messages,setMessages] = useState([]);
    const [message,setMessage] = useState("");
    const [loading,setLoading] = useState(true);
    const containerRef = useRef(null);
    const location = useLocation();
    let mail , uid;
    location.state === null ? mail = null : mail = location.state.mail;
    location.state === null ? uid = null : uid = location.state.uid;

    const getDate = () => {
        const dt = new Date();
        return dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds() 
        + " - " + dt.getDate() + "/" + (dt.getMonth() + 1) + "/"+ dt.getFullYear();
    }

    const handleSendMessage = () => {
        setMessages(prevMessages => [...prevMessages,{mail:mail,message:message,message_date:getDate()}]);
        fetch("http://localhost:3001/sendGlobal" , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uid: uid , message : message })
        })
        setMessage("");
    }

    useEffect(() => {
        if (containerRef.current) 
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }, [messages]);

    useEffect(() => {
        fetch("http://localhost:3001/getGlobal")
        .then((response) => {
            if (response.status === 200)
                return response.json();
            else
                console.log("Something went wrong while trying to get global chat");
        })
        .then((data) => {
            setMessages(data.res);
            setLoading(false);
        })

        setInterval(() => {
            fetch("http://localhost:3001/getGlobal")
            .then((response) => {
                if (response.status === 200)
                    return response.json();
                else
                    console.log("Something went wrong while trying to get global chat");
            })
            .then((data) => {
                setMessages(data.res);
                setLoading(false);
            })
        } , 3000);
    } , []);


    return (
        mail === null ? <div>no accessplease go back to login..</div>:
        <div className="chatPageContainer">
            <h3>user mail : {mail}</h3>
            {loading ? 
            <div>Loading chat data ...</div>:
            <div className="chatBox">
                <div className="globalChatMessageDisplay" ref = {containerRef}>
                    <ul>
                        {messages.map((message,messageIndex) => 
                            <li className="messageContainer" key = {messageIndex}>
                                <span>{message.mail} says : {message.message}</span>
                                <span>{message.message_date}</span>
                            </li>
                        )}
                    </ul>
                </div>
                <input 
                    className="globalChatInput" 
                    placeholder="write your message"
                    onChange={(event) => setMessage(event.target.value)}
                    value = {message}
                />
                <button 
                    id = "sendMessageBtn" 
                    onClick={handleSendMessage}
                >
                    Send your message
                </button>

                
            </div>
            }
        </div>
    )
}

export default ChatPage;