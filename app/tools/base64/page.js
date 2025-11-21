'use client'
import { useState, useEffect } from "react"



export default function Base64() {
    const [encode, setEncode] = useState(false)
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")

    useEffect(() => {
        setInput(input => localStorage.getItem("base64Input"))
    }, [])

    useEffect(() => {
        return () => {
            window.localStorage.setItem("base64Input", input)
        }
    })

    const toggleSwitch = (e) => {
        setEncode(encode => e.target.checked)
    }
    const handleInputChange = (e) => {
        setInput(input => e.target.value)
    }

    const base64Convert = () => {
        if (encode) {
            setOutput(output => btoa(input))
        } else {
            const lenmax = input.length - (input.length) % 4
            setOutput(output => atob(input.slice(0, lenmax)))
        }
    }

    return (
        <div className="flex flex-col w-full max-w-2xl mx-auto items-center gap-6">
            <div className="flex items-center gap-4">
                <span className={`text-lg ${!encode ? 'text-white font-bold' : 'text-zinc-500'}`}>Decode</span>
                <input type="checkbox" className="toggle toggle-lg bg-zinc-800 border-zinc-600 [--tglbg:theme(colors.zinc.400)] checked:bg-zinc-800 checked:border-zinc-600 checked:[--tglbg:theme(colors.white)]" onChange={toggleSwitch} checked={encode} />
                <span className={`text-lg ${encode ? 'text-white font-bold' : 'text-zinc-500'}`}>Encode</span>
            </div>

            <div className="w-full space-y-2">
                <label className="text-sm text-zinc-500 font-mono uppercase tracking-wider">Input</label>
                <textarea
                    placeholder="Paste text here..."
                    className="textarea w-full h-40 bg-white/5 border border-white/10 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 text-lg resize-none rounded-xl"
                    onChange={handleInputChange}
                    value={input}
                ></textarea>
            </div>

            <button className="btn w-full bg-white/10 hover:bg-white/20 border-none text-white text-lg h-12 rounded-xl" onClick={base64Convert}>
                {encode ? "Encode to Base64" : "Decode from Base64"}
            </button>

            <div className="w-full space-y-2">
                <label className="text-sm text-zinc-500 font-mono uppercase tracking-wider">Output</label>
                <textarea
                    placeholder="Result will appear here..."
                    className="textarea w-full h-40 bg-white/5 border border-white/10 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 text-lg resize-none rounded-xl"
                    readOnly
                    value={output}
                ></textarea>
            </div>

            <div role="alert" className="alert bg-blue-900/20 border-blue-900/50 text-blue-200 text-sm rounded-xl flex items-start gap-3">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    className="h-5 w-5 shrink-0 mt-0.5">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Note: Input is trimmed during decode as Base64 length must be divisible by 4.</span>
            </div>
        </div>
    )
}