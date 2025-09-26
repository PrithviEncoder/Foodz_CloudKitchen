import React, { useContext, useState } from 'react';
import axios from 'axios';
import './ChatBot.css';
import { StoreContext } from '../../ContextApi/StoreContext';

const ChatBot = ({ cancel, setCancel }) => {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const { SERVER_URL } = useContext(StoreContext)
    const token = localStorage.getItem("token")

    const sendMessage = async () => {
        if (input.trim() === '') return;

        const userMessage = { role: 'user', content: input };
        setMessages([...messages, userMessage]);
        setInput('');

        try {
            const res = await axios.post(SERVER_URL + '/api/chat/bot', { message: input }, { headers: { token } });
            const botMessage = { role: 'bot', content: res.data.reply };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.log(error.res?.data?.message || "error in fetching bot msg");
            setMessages((prev) => [...prev, { role: 'bot', content: 'Sorry, something went wrong!' }]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key == 'Enter') {
            e.preventDefault()
            sendMessage()
        }
    }

    return (
        <div className={`chatbot-container ${cancel ? 'right-[-300px] transition-all' : 'right-[0px] transition-all'}`}>

            <div className="btns">
                <button
                    onClick={() => setCancel(true)}
                    className='chatbot-remove'>Hide</button>
                <button
                    onClick={() => setMessages([])}
                    className='chatbot-clear'>Clear Chat</button>
            </div>

            <div className="chat-window">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.role}`}>
                        {msg.content}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about cart ..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatBot;
