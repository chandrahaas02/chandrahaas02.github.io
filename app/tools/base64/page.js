'use client'
import { useState, useEffect } from "react"



export default function Base64() {
    const [encode, setEncode] = useState(false)
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")

    useEffect(()=>{
        setInput(input=> localStorage.getItem("base64Input"))
    },[])

    useEffect(()=>{
        return () => {
            window.localStorage.setItem("base64Input",input)
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
        <div className="flex flex-col w-screen items-center p-5 bg-neutral-950">
            <div className="flex items-center">
                <div className="text-2xl">Decode</div>
                <input type="checkbox" className="toggle rounded-full m-5" onChange={toggleSwitch} />
                <div className="text-2xl">Encode</div>
            </div>
            <textarea placeholder="Input" className="textarea textarea-bordered w-3/4 m-5 text-2xl" onChange={handleInputChange} value={input}></textarea>
            <button className="btn btn-primary btn-1 m-5 rounded-full text-2xl" onClick={base64Convert} >{encode ? "Encode" : "Decode"}</button>
            <textarea placeholder="Output" className="textarea textarea-bordered w-3/4 m-5 text-2xl" readOnly value={output}></textarea>
            <div role="alert" className="alert w-fit">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    className="h-6 w-6 shrink-0">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                We trim input during decode as base64 length should be divisible by 4
            </div>
        </div>
    )
}