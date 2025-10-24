/* eslint-disable react/no-children-prop */
'use client'
import { useState, useEffect, useRef } from "react"
import { openDB } from "idb";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import markdownStyles from "@/utils/markdown-styles.module.css";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Pen, Eye, SeparatorVertical, FolderOpen, FolderClosed, Trash } from "lucide-react";


export default function MarkdownEditor() {

    const [note, setNote] = useState({ id: null, title: "", content: "" });
    const [notes, setNotes] = useState([]);
    const [showDrawer, setShowDrawer] = useState(false);
    const [viewMode, setViewMode] = useState("markdown");
    const saveTimeout = useRef(null); // markdown | preview | split

    useEffect(() => {
        initDB();
        loadNotes();
    }, []);

    const initDB = async () => {
        const db = await openDB("markdownDB", 1, {
            upgrade(db) {
                if (!db.objectStoreNames.contains("notes")) {
                    db.createObjectStore("notes", { keyPath: "id", autoIncrement: true });
                }
            },
        });
        return db;
    };

    const loadNotes = async () => {
        const db = await initDB();
        const allNotes = await db.getAll("notes");
        setNotes(allNotes.reverse());
    };

    useEffect(() => {
        const saveNote = async () => {
            const db = await initDB();
            const updatedNote = Object.fromEntries(
                Object.entries(note).filter(([, value]) => value !== null)
            );
            updatedNote['updatedAt'] = new Date().toLocaleString();
            const key = await db.put("notes", updatedNote);
            if (!note.id) {
                setNote({ ...note, id: key });
                console.log("Note saved", key);
            }
        };
        if (!note.title.trim() && !note.content.trim()) return;
        clearTimeout(saveTimeout.current);
        saveTimeout.current = setTimeout(() => {
            saveNote();
        }, 500);
        return () => clearTimeout(saveTimeout.current);
    }, [note]);


    const loadNote = async (id) => {
        const db = await initDB();
        const saved = await db.get("notes", id);
        setNote(saved);
    };

    const handleclick = async () => {
        await loadNotes();
        setShowDrawer(!showDrawer);
    }

    const deleteNote = async (id) => {
        const db = await initDB();
        await db.delete("notes", id);
        loadNotes();
    };

    const newNote = () => {
        setNote({ id: null, title: "", content: "" });
    };

    const handleChange = (e) => {
        setNote({ ...note, content: e.target.value });
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

    const currentTextWidthClass = getTextWidth(viewMode);
    const currentPreviewWidthClass = getPreviewWidth(viewMode);

    return (
        <div className="flex flex-col w-screen items-center bg-neutral-950">
            <div className="w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden">
                <div className="flex p-2 rounded-t-xl space-x-2">
                    < input type="text" placeholder="Title" className="input input-ghost flex-1 text-lg"
                        value={note.title} onChange={(e) => setNote({ ...note, title: e.target.value })} />
                    <div className="flex btn-group">
                        <button className={`btn btn-ghost ${viewMode === "markdown" ? "btn-active" : ""}`} onClick={() => setViewMode("markdown")}><Pen /></button>
                        <button className={`btn btn-ghost ${viewMode === "preview" ? "btn-active" : ""}`} onClick={() => setViewMode("preview")}><Eye /></button>
                        <button className={`btn btn-ghost ${viewMode === "split" ? "btn-active" : ""}`} onClick={() => setViewMode("split")}><SeparatorVertical /></button>
                    </div>
                    <button onClick={handleclick}>{showDrawer ? <FolderOpen /> : <FolderClosed />}</button>
                </div>
            </div>
            <div className="flex flex-row w-full h-full">
                <textarea className={`textarea bg-neutral-950 sm:m-5 h-full text-lg ${currentTextWidthClass}`} onChange={handleChange} value={note.content} />
                <div className={markdownStyles["markdown"] + " sm:m-5 h-full overflow-auto p-5 text-xl " + currentPreviewWidthClass}>
                    <Markdown
                        children={note.content || "No content yet!"}
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
                {showDrawer && (
                    <div className="right-0 h-full w-80 bg-neutral-950 p-4 z-50 overflow-y-auto">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-lg font-semibold">Saved Notes</h3>
                        </div>
                        <ul className="flex flex-col gap-2">
                            <li className="p-2 rounded-lg hover:bg-base-300 cursor-pointer flex justify-center items-center bg-neutral-800" onClick={newNote}>
                                <p className="font-medium">New Note</p>
                            </li>
                            {notes.map((n) => (
                                <li
                                    key={n.id}
                                    className={`p-2 rounded-lg ${note.id === n.id ? 'bg-slate-100' : ''}hover:bg-base-300 cursor-pointer flex justify-between items-center`}
                                    onClick={() => loadNote(n.id)}
                                >
                                    <div>
                                        <p className="font-medium">{n.title}</p>
                                        <p className="text-xs opacity-60">{n.updatedAt}</p>
                                    </div>
                                    <button
                                        className="btn btn-xs btn-ghost text-error"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteNote(n.id);
                                        }}
                                    >
                                        <Trash />
                                    </button>
                                </li>
                            ))}
                        </ul>
                        {notes.length === 0 && (
                            <p className="mt-4 text-sm">No saved notes yet.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}