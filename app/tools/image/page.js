'use client'
import { useState, useEffect, useCallback } from "react"
import { Jimp } from "jimp";

export default function JsonConvertor() {
    const [selectedFile, setSelectedFile] = useState(null)
    const [selectedImagePreview, setSelectedImagePreview] = useState(null)
    const [format, setFormat] = useState('jpeg')
    const [image, setImage] = useState(null)

    const handleFileChange = useCallback((event) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0])
        }
        let reader = new FileReader()
        reader.onloadend = async () => {
            // setSelectedImagePreview(reader.result)
            const image = await Jimp.read(reader.result)
            setImage(image)
            const base64 = await image.getBase64("image/jpeg");
            setSelectedImagePreview(base64)

        }
        reader.readAsDataURL(event.target.files[0])
    }, [])

    const handleDownload = () => {
        const a = document.createElement('a');
        a.href = selectedImagePreview;
        a.download = 'modified_image.'+ format; // Replace 'downloaded_image.png' with your desired file name
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const changeFormat = useCallback(async (e) => {
        setFormat(format => e.target.value);
        let mimeType
        switch (format) {
            case 'png':
                mimeType = "image/png"
                break
            case 'bmp':
                mimeType = "image/bmp"
                break
            default:
                mimeType = "image/jpeg"
        }

        if (image) {
            const convertedBuffer = await image.getBase64(mimeType);
            setSelectedImagePreview(convertedBuffer)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className="flex flex-col w-screen items-center p-5 bg-neutral-950">
            <h1>Hello From Image Converter</h1>
            <input type="file" className="file-input file-input-bordered w-full max-w-xs m-5 rounded-full"
                onChange={handleFileChange} />
            <div className="m-2">
                <span className="mr-5">Convert To:</span>
                <select className="select w-full rounded-lg" value={format} onChange={changeFormat}>
                    <option value="jpeg">JPEG</option>
                    <option value="png">PNG</option>
                    <option value="bmp">BMP</option>
                </select>
            </div>
            <button className="btn btn-primary rounded-lg" onClick={handleDownload}>Download</button>
            {selectedImagePreview && (
                <div className="mb-4">
                    <h2 className="text-lg font-semibold mb-2">Selected Image:</h2>
                    <img src={selectedImagePreview} alt="Selected" className="max-w-96 h-auto rounded-lg shadow" />
                </div>
            )}
        </div>
    )
}