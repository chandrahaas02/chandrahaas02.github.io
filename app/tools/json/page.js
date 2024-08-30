'use client'
import { useState, useEffect } from "react"

export default function JsonConvertor() {
    const [input,setInput] = useState("")
    const [output,setOutput] = useState("")
    const [error,setError] = useState("")

    useEffect(()=>{
        setInput(input=> localStorage.getItem("jsonInput"))
    },[])

    useEffect(()=>{
        return () => {
            window.localStorage.setItem("jsonInput",input)
        }
    })

    const handleInputChange = (e) => {
        setInput(input=>e.target.value)
    }

    const jsonPrettify = () => {
        try{
            const answer = JSON.stringify(JSON.parse(input), null, 4)
            setInput(input=>answer)
            setError(error=> "")
        } catch(err) {
            setError(error=> err.toString())
        }
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
            <div>
            {error && <div role="alert" className="alert alert-error">{error}</div>}
            </div>
            <div className="flex h-full w-full items-center mt-5">
            <textarea placeholder="Input" className="textarea textarea-bordered w-1/2 h-full m-5 text-2xl" onChange={handleInputChange} value={input}/>
            {output &&<textarea placeholder="Output" name="Reference" className="textarea textarea-bordered w-1/2 h-full m-5 text-2xl" value={output}/>}
            </div>
        </div>
    )
}