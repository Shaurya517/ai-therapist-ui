import React, { useState } from 'react'
import ChatPanel from './components/ChatPanel'
import VoicePanel from './components/VoicePanel'
import ToggleTabs from './components/ToggleTabs'


export default function App() {
  const [mode, setMode] = useState('chat') // 'chat' | 'voice'


  return (
    <div className="min-h-screen py-10 px-4 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur rounded-3xl shadow-soft border border-white/60">
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 class="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">AI-Therapist</h1>

            <ToggleTabs mode={mode} onChange={setMode} />
          </div>


          {/* Content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChatPanel active={mode === 'chat'} />
            <VoicePanel active={mode === 'voice'} />
          </div>
        </div>
      </div>
    </div>
  )
}