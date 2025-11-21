/* eslint-disable react/no-children-prop */
'use client'
import { useState, useEffect, useRef } from "react"
import { openDB } from "idb";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import markdownStyles from "@/utils/markdown-styles.module.css";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Pen, Eye, SeparatorVertical, FolderOpen, FolderClosed, Trash, Maximize2, Minimize2 } from "lucide-react";


export default function MarkdownEditor() {

    const [note, setNote] = useState({ id: null, title: "", content: "" });
    const [notes, setNotes] = useState([]);
    const [showDrawer, setShowDrawer] = useState(false);
    const [viewMode, setViewMode] = useState("markdown");
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [font, setFont] = useState("font-mono"); // font-mono, font-sans, font-serif
    const saveTimeout = useRef(null); // markdown | preview | split

    useEffect(() => {
        initDB();
        loadNotes();

        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                setIsFullscreen(false);
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
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

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
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

    const wordCount = note.content ? note.content.trim().split(/\s+/).filter(Boolean).length : 0;

    return (
        <div className={`flex flex-col gap-4 transition-all duration-300 ${isFullscreen ? 'fixed inset-0 z-[100] bg-black p-8' : 'w-full h-[calc(100vh-150px)]'}`}>
            <div className={`w-full transition-all duration-300 ${isFullscreen ? 'opacity-0 hover:opacity-100' : 'opacity-100'} bg-white/5 border border-white/10 rounded-xl p-2 flex items-center gap-2`}>
                <input
                    type="text"
                    placeholder="Untitled Note"
                    className="input bg-transparent flex-1 text-lg font-bold text-white focus:outline-none placeholder-zinc-600"
                    value={note.title}
                    onChange={(e) => setNote({ ...note, title: e.target.value })}
                />

                <div className="px-3 py-1 text-xs font-mono text-zinc-500 border-r border-white/10 mr-2">
                    {wordCount} words
                </div>

                <div className="flex items-center gap-2 bg-black/20 rounded-lg p-1">
                    <select
                        className="bg-transparent text-zinc-400 text-sm focus:outline-none cursor-pointer hover:text-white px-2"
                        value={font}
                        onChange={(e) => setFont(e.target.value)}
                    >
                        <option value="font-mono">Mono</option>
                        <option value="font-sans">Sans</option>
                        <option value="font-serif">Serif</option>
                    </select>
                </div>

                <div className="flex bg-black/20 rounded-lg p-1">
                    <button
                        className={`p-2 rounded-md transition-colors ${viewMode === "markdown" ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
                        onClick={() => setViewMode("markdown")}
                        title="Editor Only"
                    >
                        <Pen size={18} />
                    </button>
                    <button
                        className={`p-2 rounded-md transition-colors ${viewMode === "split" ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
                        onClick={() => setViewMode("split")}
                        title="Split View"
                    >
                        <SeparatorVertical size={18} />
                    </button>
                    <button
                        className={`p-2 rounded-md transition-colors ${viewMode === "preview" ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
                        onClick={() => setViewMode("preview")}
                        title="Preview Only"
                    >
                        <Eye size={18} />
                    </button>
                </div>

                <button
                    onClick={toggleFullscreen}
                    className={`p-2 rounded-lg transition-colors ${isFullscreen ? 'text-white bg-white/10' : 'text-zinc-400 hover:text-white'}`}
                    title={isFullscreen ? "Exit Zen Mode (Esc)" : "Enter Zen Mode"}
                >
                    {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                </button>

                <button
                    onClick={handleclick}
                    className="p-2 text-zinc-400 hover:text-white transition-colors"
                    title={showDrawer ? "Hide Notes" : "Show Notes"}
                >
                    {showDrawer ? <FolderOpen size={20} /> : <FolderClosed size={20} />}
                </button>
            </div>

            <div className="flex flex-row w-full flex-1 overflow-hidden gap-4 relative">
                {showDrawer && (
                    <div className="absolute inset-y-0 left-0 w-64 bg-neutral-900 border border-white/10 rounded-xl p-4 z-20 overflow-y-auto shadow-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Saved Notes</h3>
                        </div>
                        <ul className="flex flex-col gap-2">
                            <li className="p-3 rounded-lg hover:bg-white/5 cursor-pointer flex items-center justify-center border border-dashed border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-all" onClick={newNote}>
                                <span className="font-medium text-sm">+ New Note</span>
                            </li>
                            {notes.map((n) => (
                                <li
                                    key={n.id}
                                    className={`p-3 rounded-lg cursor-pointer flex justify-between items-center group transition-colors ${note.id === n.id ? 'bg-white/10 text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'}`}
                                    onClick={() => loadNote(n.id)}
                                >
                                    <div className="overflow-hidden">
                                        <p className="font-medium truncate text-sm">{n.title || "Untitled"}</p>
                                        <p className="text-xs opacity-50">{n.updatedAt}</p>
                                    </div>
                                    <button
                                        className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-opacity"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteNote(n.id);
                                        }}
                                    >
                                        <Trash size={14} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                        {notes.length === 0 && (
                            <p className="mt-4 text-center text-xs text-zinc-600">No saved notes yet.</p>
                        )}
                    </div>
                )}

                <textarea
                    className={`textarea bg-transparent border-none focus:outline-none focus:ring-0 h-full text-lg ${font} text-zinc-200 resize-none p-6 ${currentTextWidthClass} ${isFullscreen ? 'max-w-3xl mx-auto' : ''}`}
                    onChange={handleChange}
                    value={note.content}
                    placeholder="Start writing..."
                />

                <div className={`bg-transparent border-none h-full overflow-auto p-6 ${markdownStyles["markdown"]} ${font} ${currentPreviewWidthClass} ${isFullscreen && viewMode === 'preview' ? 'max-w-3xl mx-auto' : ''}`}>
                    <Markdown
                        children={note.content || "*No content yet!*"}
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
                                        customStyle={{ background: 'transparent', padding: 0 }}
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