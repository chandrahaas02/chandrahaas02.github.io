/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useState, useCallback, useRef, useEffect } from "react"


export default function ScreenRecorder() {

    const [recording, setRecording] = useState(false);
    const [cameraSize, setCameraSize] = useState(20) // percentage of screen width
    const [isPiPActive, setIsPiPActive] = useState(false)
    const [camEnable, setCamEnable] = useState(false)

    const screenVideoRef = useRef(null)
    const cameraVideoRef = useRef(null)
    const pipWindowRef = useRef(null)
    const mediaRecorderRef = useRef(null)
    const outputVideoRef = useRef(null)
    const audioStreamRef = useRef(null)

    let cameraStream

    const startRecording = useCallback(async () => {
        try {
            const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
            const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true })

            audioStreamRef.current = audioStream

            if (screenVideoRef.current && cameraVideoRef.current) {
                screenVideoRef.current.srcObject = screenStream
            }

            togglePictureInPicture()

            // Combine streams
            let combinedStream
            if (cameraVideoRef.current && cameraVideoRef.current.srcObject instanceof MediaStream) {
                combinedStream = new MediaStream([
                    ...screenStream.getVideoTracks(),
                    ...cameraVideoRef.current.srcObject.getVideoTracks(),
                    ...screenStream.getAudioTracks(),
                    ...audioStream.getAudioTracks()
                ])
            } else {
                combinedStream = new MediaStream([
                    ...screenStream.getVideoTracks(),
                    ...screenStream.getAudioTracks(),
                    ...audioStream.getAudioTracks()
                ])
            }

            const mediaRecorder = new MediaRecorder(combinedStream)
            mediaRecorderRef.current = mediaRecorder

            mediaRecorder.ondataavailable = (event) => {
                if (outputVideoRef.current) {
                    outputVideoRef.current.src = URL.createObjectURL(event.data)
                }
            }

            mediaRecorder.start()
            setRecording(true)
        } catch (error) {
            console.error("Error starting recording:", error)
        }
    }, [cameraSize])

    const togglePictureInPicture = useCallback(async () => {
        if (!cameraVideoRef.current) return;

        try {
            if (document.pictureInPictureElement) {
                await document.exitPictureInPicture()
                setIsPiPActive(false)
            } else {
                pipWindowRef.current = await cameraVideoRef.current.requestPictureInPicture()
                pipWindowRef.current.onresize = () => {
                    if (cameraVideoRef.current && pipWindowRef.current) {
                        const pipWidth = pipWindowRef.current.width * (cameraSize / 100)
                        cameraVideoRef.current.style.width = `${pipWidth}px`
                        cameraVideoRef.current.style.height = 'auto'
                    }
                }
                setIsPiPActive(true)
            }
        } catch (error) {
            console.error("Error toggling Picture-in-Picture:", error)
        }
    }, [cameraSize])


    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop()
            setRecording(false)

            if (screenVideoRef.current && screenVideoRef.current.srcObject instanceof MediaStream) {
                screenVideoRef.current.srcObject.getTracks().forEach(track => track.stop())
            }
            if (cameraVideoRef.current && cameraVideoRef.current.srcObject instanceof MediaStream) {
                cameraVideoRef.current.srcObject.getTracks().forEach(track => track.stop())
            }
            if (audioStreamRef.current && audioStreamRef.current instanceof MediaStream) {
                audioStreamRef.current.getTracks().forEach(track => track.stop())
            }
            setCamEnable(camEnable => false)
            if (pipWindowRef.current) {
                document.exitPictureInPicture()
            }
        }
    }, [])

    const handleRecord = () => {
        const current = recording
        setRecording(recording => !recording)
        if (current) {
            stopRecording()
        } else {
            startRecording()
        }
    }

    const handleCamera = () => {
        if (!camEnable) {
            navigator.mediaDevices.getUserMedia({ video: true }).then(
                (stream) => {
                    cameraStream = stream
                    cameraVideoRef.current.srcObject = cameraStream
                }
            )
        } else {
            if (cameraVideoRef.current && cameraVideoRef.current.srcObject instanceof MediaStream) {
                cameraVideoRef.current.srcObject.getTracks().forEach(track => track.stop())
                cameraVideoRef.current.srcObject = null
            }
        }
        setCamEnable(camEnable => !camEnable)
    }

    useEffect(() => {
        return () => {
            if (pipWindowRef.current) {
                document.exitPictureInPicture()
            }
        }
    }, [])

    return (
        <div className="flex flex-col w-screen items-center p-5 bg-neutral-950">
            <div className="flex-1 flex flex-col w-full items-center">
                <span className="text-3xl text-primary-content">Hello From ScreenRecorder</span>
                <div className="flex gap-5">
                    <button className="btn my-5 rounded-xl btn-primary" onClick={handleRecord}>{recording ? "Stop" : "Start"}</button>
                    <button className="btn my-5 rounded-xl btn-primary" onClick={handleCamera}>{camEnable ? "No Camera" : "Use Camera"}</button>
                </div>
                {!recording && (<div className="flex flex-col items-center">
                    <video id="recorded-media" ref={outputVideoRef} controls></video>
                </div>)}
                <div className="aspect-video">
                    <video id="camFeed" ref={cameraVideoRef} autoPlay muted></video>
                    <video id="desktopFeed" ref={screenVideoRef} autoPlay muted className="hidden"></video>
                </div>
            </div>
            <div role="alert" className="alert">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="stroke-info h-6 w-6 shrink-0">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>If you are looking for production grade recorder software checkout <a href="https://screenity.io/en/" target="_blank"> Secreenity</a> </span>
            </div>
        </div>

    )
}
