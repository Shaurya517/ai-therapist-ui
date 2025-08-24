const BASE = import.meta.env.VITE_API_BASE_URL
const USE_MOCK = !BASE // if no env set, use mock replies for local dev


async function http(path, { method = 'GET', headers = {}, body } = {}) {
    const url = `${BASE}${path}`
    const res = await fetch(url, { method, headers, body })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
}


export async function sendTextMessage(text) {
    if (USE_MOCK) {
        await wait(500)
        return "Thanks for sharing that. I'm here with you—what's one small step we could explore together?"
    }
    const data = await http('/chat/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
    })
    // expected { reply: string }
    return data.reply
}


export async function transcribeAudio(blob) {
    if (USE_MOCK) {
        await wait(800)
        return { transcript: 'I feel a bit anxious today.', reply: 'That makes sense. What do you notice in your body when anxiety shows up?' }
    }
    const fd = new FormData()
    fd.append('audio', blob, 'clip.webm')
    return http('/chat/voice', { method: 'POST', body: fd })
}


function wait(ms) { return new Promise((r) => setTimeout(r, ms)) }