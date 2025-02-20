import React, { useState } from 'react';
import { Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown'
import { Prism as syntaxHighliter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { GoogleGenerativeAI } from '@google/generative-ai';


function ChatApp(props) {
    const [message, setMessage] = useState([])
    const [input, setInput]=useState("")
    comst [isTyping, setis]


    return (
        <div>
         ChatApp   
        </div>
    );
}

export default ChatApp;