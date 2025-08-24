import { useEffect, useRef, useState } from 'react'


export default function useRecorder({ onStop }) {
    const [isRecording, setIsRecording] = useState(false)
    const [error, setError] = useState('')
    const mediaRecorderRef = useRef(null)
    const chunksRef = useRef([])


    useEffect(() => {
        return () => {
            try { mediaRecorderRef.current?.state !== 'inactive' && mediaRecorderRef.current?.stop() } catch { }
        }
    }, [])


    async function start() {
        setError('')
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            const mime = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
                ? 'audio/webm;codecs=opus'
                : 'audio/webm'
            const mr = new MediaRecorder(stream, { mimeType: mime })
            mediaRecorderRef.current = mr
            chunksRef.current = []


            mr.ondataavailable = (e) => { if (e.data?.size) chunksRef.current.push(e.data) }
            mr.onstop = async () => {
                const blob = new Blob(chunksRef.current, { type: mr.mimeType })
                chunksRef.current = []
                onStop && onStop(blob)
                stream.getTracks().forEach((t) => t.stop())
            }


            mr.start()
            setIsRecording(true)
        } catch (e) {
            console.error(e)
            setError('Microphone permission denied or browser not supported.')
        }
    }


    function stop() {
        try { mediaRecorderRef.current?.stop() } catch { }
        setIsRecording(false)
    }


    function toggleRecording() { isRecording ? stop() : start() }


    return { isRecording, error, start, stop, toggleRecording }
}