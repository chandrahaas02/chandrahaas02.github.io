/* eslint-disable react/no-children-prop */
'use client'
import { useState, useEffect } from "react"
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import markdownStyles from "@/utils/markdown-styles.module.css";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'


export default function MarkdownEditor() {
    const [markdown, setMarkdown] = useState('## markdown preview');
    const [preview, setPreview] = useState(false)

    useEffect(()=>{
        setMarkdown(markdown=> localStorage.getItem("markdown"))
    },[])

    useEffect(()=>{
        return () => {
            window.localStorage.setItem("markdown",markdown)
        }
    })

    const handleChange = (e) => {
        setMarkdown(e.target.value);
    };

    const togglePreview = () => {
        setPreview(!preview)
    }

    return (
        <div className="flex flex-col w-full items-center m-5">
            <button className="btn btn-secondary mb-5 rounded-full sm:hidden" onClick={togglePreview}>{preview ? "Show Markdown" : "Show Preview"}</button>
            <div className="flex flex-row w-full h-full">
                <textarea className={"textarea textarea-bordered w-full sm:w-1/2 h-full sm:m-5 text-2xl min-w-[30vw] "+ (preview ? "max-sm:hidden" : "max-sm:flex")} onChange={handleChange} value={markdown} />
                <div className={markdownStyles["markdown"] + " w-full sm:max-w-[40vw] "+  (preview ? "max-sm:flex max-sm:flex-col" : "max-sm:hidden")}>
                    <Markdown
                        children={markdown}
                        remarkPlugins={[remarkGfm]}
                        components={{
                            code(props) {
                                const { children, className, node, ...rest } = props
                                const match = /language-(\w+)/.exec(className || '')
                                return match ? (
                                    <SyntaxHighlighter
                                        {...rest}
                                        PreTag="div"
                                        children={String(children).replace(/\n$/, '')}
                                        language={match[1]}
                                        style={atomDark}
                                    />
                                ) : (
                                    <code {...rest} className={className}>
                                        {children}
                                    </code>
                                )
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}