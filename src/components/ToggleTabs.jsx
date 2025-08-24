import React from 'react'
import { MessageCircle, Mic } from 'lucide-react'


export default function ToggleTabs({ mode, onChange }) {
    const tabBase = 'flex items-center gap-2 px-4 py-2 rounded-xl transition-colors'
    const active = 'bg-indigo-600 text-white shadow'
    const idle = 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'


    return (
        <div className="flex gap-2">
            <button
                className={`${tabBase} ${mode === 'chat' ? active : idle}`}
                onClick={() => onChange('chat')}
                aria-pressed={mode === 'chat'}
            >
                <MessageCircle className="w-4 h-4" /> Chat
            </button>
            <button
                className={`${tabBase} ${mode === 'voice' ? active : idle}`}
                onClick={() => onChange('voice')}
                aria-pressed={mode === 'voice'}
            >
                <Mic className="w-4 h-4" /> Voice
            </button>
        </div>
    )
}