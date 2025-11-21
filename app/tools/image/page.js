'use client'
import { useState, useEffect, useCallback } from "react"

export default function JsonConvertor() {
    const [selectedFile, setSelectedFile] = useState(null)
    const [selectedImagePreview, setSelectedImagePreview] = useState(null)
    const [format, setFormat] = useState('jpeg')

    const handleFileChange = useCallback((event) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0])
        }
        let reader = new FileReader()
        reader.onloadend = async () => {
            setSelectedImagePreview(reader.result)
        }
        reader.readAsDataURL(event.target.files[0])
    }, [])

    const handleDownload = () => {
        const a = document.createElement('a');
        a.href = selectedImagePreview;
        const filename = selectedFile.name.split('.').slice(0, -1).join('.');
        a.download = filename + "_ch_mod." + format; // Replace 'downloaded_image.png' with your desired file name
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const changeFormat = useCallback(async (e) => {
        setFormat(format => e.target.value);
    }, [])

    return (
        <div className="flex flex-col w-full max-w-xl mx-auto items-center gap-8">
            <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold text-white">Image Converter</h1>
                <p className="text-zinc-400">Convert images to different formats locally</p>
            </div>

            <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center gap-6">
                <input
                    type="file"
                    className="file-input file-input-bordered w-full bg-black/20 border-white/10 text-zinc-300"
                    onChange={handleFileChange}
                    accept="image/*"
                />

                {selectedImagePreview && (
                    <div className="w-full space-y-4 animate-in fade-in zoom-in duration-300">
                        <div className="relative aspect-video w-full bg-black/40 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center">
                            <img src={selectedImagePreview} alt="Selected" className="max-w-full max-h-full object-contain" />
                        </div>

                        <div className="flex items-end gap-4">
                            <div className="flex-1 space-y-2">
                                <label className="text-sm text-zinc-500 font-mono uppercase tracking-wider">Convert To</label>
                                <select
                                    className="select select-bordered w-full bg-black/20 border-white/10 text-white focus:outline-none focus:border-zinc-500"
                                    value={format}
                                    onChange={changeFormat}
                                >
                                    <option value="jpeg">JPEG</option>
                                    <option value="png">PNG</option>
                                    <option value="bmp">BMP</option>
                                    <option value="webp">WEBP</option>
                                </select>
                            </div>
                            <button
                                className="btn bg-white/10 hover:bg-white/20 text-white border-none px-8"
                                onClick={handleDownload}
                            >
                                Download
                            </button>
                        </div>
                    </div>
                )}

                {!selectedImagePreview && (
                    <div className="text-center py-8 text-zinc-600 border-2 border-dashed border-white/5 rounded-xl w-full">
                        <p>Select an image to get started</p>
                    </div>
                )}
            </div>
        </div>
    )
}