import React from 'react'


export default function MessageBubble({ role, text, typing }) {
    const isUser = role === 'user'
    return (
        <div className={`w-full flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
            <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm border ${isUser ? 'bg-indigo-100 border-indigo-200' : 'bg-white border-gray-200'
                    }`}
            >
                {typing ? (
                    <span className="inline-flex gap-1">
                        <i className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-.2s]"></i>
                        <i className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></i>
                        <i className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:.2s]"></i>
                    </span>
                ) : (
                    <p className="leading-relaxed">{text}</p>
                )}
            </div>
        </div>
    )
}