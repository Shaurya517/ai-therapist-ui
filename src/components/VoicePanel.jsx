import React, { useState } from 'react'
import { Mic, PhoneOff } from 'lucide-react'
import useRecorder from '../hooks/useRecorder'
import { transcribeAudio } from '../lib/apiClient'
import Orb from './Orb'  // ✅ Import the Orb

export default function VoicePanel({ active }) {
    const [status, setStatus] = useState('idle') // idle | listening | processing
    const [lastResult, setLastResult] = useState(null)

    const { isRecording, error, toggleRecording } = useRecorder({
        onStop: async (blob) => {
            setStatus('processing')
            try {
                const data = await transcribeAudio(blob)
                setLastResult(data) // { transcript, reply }
            } catch (e) {
                console.error(e)
            } finally {
                setStatus('idle')
            }
        },
    })

    return (
        <div className={`rounded-2xl p-5 border bg-white/70 ${active ? '' : 'opacity-60'}`}>
            <div className="h-[440px] flex flex-col items-center justify-center space-y-6">

                {/* Orb replaces emoji */}
                <div className="relative flex items-center justify-center">
                    <Orb active={isRecording} />
                </div>

                {/* Status Text */}
                <p className="text-gray-600 min-h-[24px]">
                    {isRecording ? 'Listening…' : status === 'processing' ? 'Processing…' : 'Tap mic to start'}
                </p>

                {/* Control Buttons */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleRecording}
                        className={`h-12 w-12 rounded-full flex items-center justify-center border shadow transition-all 
              ${isRecording ? 'bg-indigo-600 text-white border-indigo-600 scale-110' : 'bg-white hover:bg-gray-50'}
            `}
                        aria-pressed={isRecording}
                        aria-label="Toggle microphone"
                        title="Toggle microphone"
                    >
                        <Mic className="w-5 h-5" />
                    </button>

                    <button
                        onClick={() => {
                            if (isRecording) toggleRecording()
                            setStatus('idle')
                        }}
                        className="h-12 w-12 rounded-full flex items-center justify-center bg-red-500 text-white shadow hover:bg-red-600"
                        aria-label="End"
                        title="End"
                    >
                        <PhoneOff className="w-5 h-5" />
                    </button>
                </div>

                {/* Error Message */}
                {error && <p className="text-sm text-red-600">{error}</p>}

                {/* Transcript + Reply Box */}
                {lastResult && (
                    <div className="w-full max-w-sm text-sm bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                        <p className="font-medium text-gray-700">Transcript</p>
                        <p className="text-gray-600 mt-1">{lastResult.transcript || '—'}</p>
                        <p className="font-medium text-gray-700 mt-3">Reply</p>
                        <p className="text-gray-600 mt-1">{lastResult.reply || '—'}</p>
                    </div>
                )}
            </div>
        </div>
    )
}