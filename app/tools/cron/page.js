'use client'
import { useState, useEffect } from "react"

export default function JsonConvertor() {

    const [output,setOutput] = useState("");
    const [error,setError] = useState(false)


    const getOutput = (arr) => {
        const monthNames = ["JAN", "FEB", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEP", "OCT", "NOV", "DEC"];
        const dayOfWeekNames = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
        let str = "At "
        if (arr[0]==="*"){
            str+="every minute"
        } else if (!isNaN(arr[0])&& parseInt(arr[0])<60){
            str += `${arr[0]} minute`
        } else {
            const subString = arr[0].split("/")
            if (subString.length === 2 && subString[0]==="*" && !isNaN(subString[1] && parseInt(subString[1])<60 )){
                str+=`every ${subString[1]} minute`
            } else {
                setError(error=> true)
                return "Error in minutes string"
            }
        }

        str += " "

        if (arr[1]=="*") {
            str+=""
        } else if (!isNaN(arr[1])&& parseInt(arr[1])<24){
            str+=`past hour ${arr[1]}`
        } else {
            const subString = arr[1].split("/")
            if (subString.length === 2 && subString[0]==="*" && !isNaN(subString[1]) && parseInt(subString[1])<24){
                str+=`every ${subString[1]} hour`
            } else {
                setError(error=> true)
                return "Error in hour string"
            }
        }

        str += " "

        if(arr[2]=="*") {
            str+=""
        } else if (!isNaN(arr[2]) ) {
            str+=`on ${arr[2]} of the month `
        } else {
            const subString = arr[2].split("/")
            if (subString.length === 2 && subString[0]==="*" && !isNaN(subString[1])){
                str+=`every ${subString[1]} day of month`
            } else {
                setError(error=> true)
                return "Error in day in month string"
            }
        }

        str+=" "

        if(arr[4]=="*") {
            str+=""
        } else if (!isNaN(arr[4]) && parseInt(arr[4]) < 8 ) {
            str+=`on ${dayOfWeekNames[arr[4]-1]}`
        } else {
            const subString = arr[4].split("/")
            if (subString.length === 2 && subString[0]==="*" && !isNaN(subString[1])){
                str+=`every ${subString[1]} day of week`
            } else {
                setError(error=> true)
                return "Error in day in week string"
            }
        }


        str+=" "

        if (arr[3]=="*") {
            str+=""
        } else if (!isNaN(arr[3])&& parseInt(arr[3])<12){
            str+=`in ${monthNames[arr[3]-1]}`
        } else {
            const subString = arr[3].split("/")
            if (subString.length === 2 && subString[0]==="*" && !isNaN(subString[1]) && parseInt(subString[1])<12){
                str+=`every ${subString[1]} month`
            } else {
                setError(error=> true)
                return "Error in year string"
            }
        }

        setError(error=> false)
        return str
    }

    const handleInput = (e) => {
        let inputText = e.target.value.trim().split(" ")
        if (inputText.length === 5) {
            const outputString = getOutput(inputText)
            setOutput(output=>outputString)
        } else {
            setError(error=> true)
            setOutput(output => "Required 5 strings")
        }
    }


    return (
        <div className="flex flex-col w-full items-center justify-center m-5">
            {output && <span className={`text-5xl m-5 ${error? "text-error": "text-success"}`} >{output}</span>}
            <textarea type="text" placeholder="Type here"
            className="textarea textarea-bordered rounded-full text-5xl text-center box-border" onChange={handleInput}/>
        </div>
    )
}