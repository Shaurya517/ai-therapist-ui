import React, { useEffect, useRef, useState } from 'react'
import { Send } from 'lucide-react'
import MessageBubble from './MessageBubble'
import { sendTextMessage } from '../lib/apiClient'

const seed = [
    { id: '1', role: 'assistant', text: 'Hi, how can I help you today?' },
    { id: '2', role: 'user', text: "I'm feeling overwhelmed" },
    { id: '3', role: 'assistant', text: "I'm sorry to hear that. Can you tell me more?" },
]

export default function ChatPanel({ active }) {
    const [messages, setMessages] = useState(seed)
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const endRef = useRef(null)

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    async function onSubmit(e) {
        e.preventDefault()
        if (!input.trim() || loading) return

        const userMsg = { id: crypto.randomUUID(), role: 'user', text: input }
        setMessages((m) => [...m, userMsg])
        setInput('')
        setLoading(true)

        try {
            const reply = await sendTextMessage(input)
            const botMsg = { id: crypto.randomUUID(), role: 'assistant', text: reply }
            setMessages((m) => [...m, botMsg])
        } catch (err) {
            console.error(err)
            const botMsg = { id: crypto.randomUUID(), role: 'assistant', text: 'Sorry, something went wrong. Please try again.' }
            setMessages((m) => [...m, botMsg])
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            className={`rounded-3xl p-6 border bg-white/80 shadow-lg backdrop-blur-sm transition-all ${active ? 'scale-100 opacity-100' : 'scale-95 opacity-70'
                }`}
            style={{ minHeight: '520px', width: '100%' }}
        >
            {/* Chat messages */}
            <div className="h-[460px] overflow-y-auto pr-3 space-y-3">
                {messages.map((m) => (
                    <MessageBubble key={m.id} role={m.role} text={m.text} />
                ))}
                {loading && (
                    <MessageBubble role="assistant" text="Thinking…" typing />
                )}
                <div ref={endRef} />
            </div>

            {/* Input area */}
            <form onSubmit={onSubmit} className="mt-5 flex items-center gap-3">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message…"
                    className="flex-1 rounded-xl border border-gray-200 bg-white/90 px-4 py-3 text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                />
                <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-xl bg-indigo-500 px-4 py-3 text-white shadow-md hover:bg-indigo-600 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!input.trim() || loading}
                    aria-label="Send"
                    title="Send"
                >
                    <Send className="w-5 h-5" />
                </button>
            </form>
        </div>
    )
}