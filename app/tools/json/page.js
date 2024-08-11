'use client'
import { useState, useEffect } from "react"

export default function JsonConvertor() {
    const [input,setInput] = useState(localStorage.getItem("jsonInput")|| "")
    const [output,setOutput] = useState("")

    useEffect(()=>{
        return () => {
            localStorage.setItem("jsonInput",input)
        }
    })

    const handleInputChange = (e) => {
        setInput(input=>e.target.value)
    }

    const jsonPrettify = () => {
        const answer = JSON.stringify(JSON.parse(input), null, 4)
        setInput(input=>answer)
    }

    const copyref = () => {
        setOutput(output =>input)
    }

    return (
        <div className="flex flex-col w-full items-center m-5">
            <div>
            <button className="btn btn-primary rounded-full m-5" onClick={jsonPrettify}>Prettify</button>
            <button className="btn btn-primary rounded-full m-5" onClick={copyref}>Copy Reference</button>
            </div>
            <div className="flex h-full w-full items-center">
            <textarea placeholder="Input" className="textarea textarea-bordered w-1/2 h-full m-5 text-2xl" onChange={handleInputChange} value={input}/>
            {output && <div className="flex flex-col w-1/2 h-full items-center"><label for="Reference" className="text-2xl">Reference</label><textarea placeholder="Output" name="Reference" className="textarea textarea-bordered w-full h-full m-5 text-2xl" value={output}/></div> }
            </div>
        </div>
    )
}