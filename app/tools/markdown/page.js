/* eslint-disable react/no-children-prop */
'use client'
import { useState, useEffect } from "react"
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import markdownStyles from "@/utils/markdown-styles.module.css";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'


export default function MarkdownEditor() {

    const tabsData = [
        { id: 'markdown', title: 'Markdown' },
        { id: 'preview', title: 'Preview' },
        { id: 'split', title: 'Split Screen' },
    ];

    const [markdown, setMarkdown] = useState('## markdown preview');
    const [activeTab, setActiveTab] = useState(tabsData[0].id);

    useEffect(() => {
        setMarkdown(markdown => localStorage.getItem("markdown"))
    }, [])

    useEffect(() => {
        return () => {
            window.localStorage.setItem("markdown", markdown)
        }
    })

    const handleChange = (e) => {
        setMarkdown(e.target.value);
    };

    const getTextWidth = (activeTab) => {
        switch (activeTab) {
            case "markdown":
                return 'w-full';
            case "preview":
                return 'hidden';
            case "split":
                return 'w-1/2';
            default:
                return 'w-auto'; // A fallback class
        }
    };
    const getPreviewWidth = (activeTab) => {
        switch (activeTab) {
            case "markdown":
                return 'hidden';
            case "preview":
                return 'w-full';
            case "split":
                return 'w-1/2';
            default:
                return 'w-auto'; // A fallback class
        }
    };

    const currentTextWidthClass = getTextWidth(activeTab);
    const currentPreviewWidthClass = getPreviewWidth(activeTab);

    return (
        <div className="flex flex-col w-screen items-center bg-neutral-950">
            <div className="w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden">
                <div className="flex p-2 rounded-t-xl space-x-2">
                    {tabsData.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                flex-1 py-3 px-4 text-sm font-semibold rounded-lg transition-all duration-300 ease-in-out
                ${activeTab === tab.id
                                    ? 'bg-neutral-700 shadow-md transform scale-105'
                                    : ' hover:bg-neutral-800'
                                }
                ${tab.id === 'split' ? 'hidden sm:block' : ''}
              `}
                        >
                            {tab.title}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex flex-row w-full h-full">
                <textarea className={`textarea bg-inherit sm:m-5 h-full text-lg ${currentTextWidthClass}`} onChange={handleChange} value={markdown} />
                <div className={markdownStyles["markdown"] + " sm:m-5 h-full overflow-auto p-5 text-xl " + currentPreviewWidthClass}>
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