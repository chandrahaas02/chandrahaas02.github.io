'use client'
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Download} from 'lucide-react';

const ScreenCameraRecorder = () => {
  const [isSetup, setIsSetup] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState('Click "Setup Streams" to begin');
  const [recordings, setRecordings] = useState([]);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [isClient, setIsClient] = useState(false);

  const screenPreviewRef = useRef(null);
  const cameraPreviewRef = useRef(null);
  const screenStreamRef = useRef(null);
  const cameraStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);
  const screenVideoRef = useRef(null);
  const cameraVideoRef = useRef(null);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const updateStatus = useCallback((message) => {
    setStatus(message);
    console.log(message);
  }, []);

  const formatFileSize = useCallback((bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, []);

  const setupStreams = async () => {
    if (!isClient) return;

    try {
      updateStatus('Setting up camera and screen capture...');

      // Check if APIs are available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Media devices not supported in this browser');
      }

      if (!navigator.mediaDevices.getDisplayMedia) {
        throw new Error('Screen sharing not supported in this browser');
      }

      // Get camera stream first
      const cameraStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        }
      });

      // Get screen stream
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          frameRate: { ideal: 30 }
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        }
      });

      screenStreamRef.current = screenStream;
      cameraStreamRef.current = cameraStream;

      // Display previews
      if (screenPreviewRef.current) {
        screenPreviewRef.current.srcObject = screenStream;
      }
      if (cameraPreviewRef.current) {
        cameraPreviewRef.current.srcObject = cameraStream;
      }

      setIsSetup(true);
      updateStatus('Ready to record! Click "Start Recording" to begin.');

    } catch (error) {
      console.error('Error setting up streams:', error);
      updateStatus(`Error: ${error.message}`);
    }
  };

  const startRecording = async () => {
    if (!isClient || !screenStreamRef.current || !cameraStreamRef.current) return;

    try {
      updateStatus('Starting recording...');

      // Create canvas for combining streams
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 1920;
      canvas.height = 1080;
      canvasRef.current = canvas;

      // Create video elements
      const screenVideo = document.createElement('video');
      const cameraVideo = document.createElement('video');

      screenVideoRef.current = screenVideo;
      cameraVideoRef.current = cameraVideo;

      screenVideo.srcObject = screenStreamRef.current;
      cameraVideo.srcObject = cameraStreamRef.current;

      screenVideo.muted = true;
      cameraVideo.muted = true;

      // Wait for videos to be ready
      await new Promise((resolve) => {
        let loadedCount = 0;
        const checkLoaded = () => {
          loadedCount++;
          if (loadedCount === 2) resolve();
        };

        screenVideo.onloadedmetadata = checkLoaded;
        cameraVideo.onloadedmetadata = checkLoaded;

        screenVideo.play();
        cameraVideo.play();
      });

      // Audio setup
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const destination = audioContext.createMediaStreamDestination();

      // Add audio tracks
      const audioTracks = [];

      if (screenStreamRef.current.getAudioTracks().length > 0) {
        const screenAudio = audioContext.createMediaStreamSource(screenStreamRef.current);
        const gainNode = audioContext.createGain();
        gainNode.gain.value = 0.8; // Slightly reduce screen audio
        screenAudio.connect(gainNode);
        gainNode.connect(destination);
        audioTracks.push(...screenStreamRef.current.getAudioTracks());
      }

      if (cameraStreamRef.current.getAudioTracks().length > 0) {
        const cameraAudio = audioContext.createMediaStreamSource(cameraStreamRef.current);
        const gainNode = audioContext.createGain();
        gainNode.gain.value = 1.0; // Full camera audio
        cameraAudio.connect(gainNode);
        gainNode.connect(destination);
        audioTracks.push(...cameraStreamRef.current.getAudioTracks());
      }

      // Canvas rendering
      let renderInterval = null;

      const renderFrame = () => {
        if (!screenVideo || !cameraVideo) return;

        try {
          // Clear canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Draw screen capture
          if (screenVideo.readyState >= 2) {
            ctx.drawImage(screenVideo, 0, 0, canvas.width, canvas.height);
          }

          // Draw camera overlay
          if (cameraVideo.readyState >= 2) {
            const cameraWidth = 300;
            const cameraHeight = 225;
            const x = canvas.width - cameraWidth - 20;
            const y = canvas.height - cameraHeight - 20;

            // Camera border
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.fillRect(x - 3, y - 3, cameraWidth + 6, cameraHeight + 6);

            // Camera feed
            ctx.drawImage(cameraVideo, x, y, cameraWidth, cameraHeight);
          }
        } catch (error) {
          console.error('Rendering error:', error);
        }
      };

      // Start rendering
      renderInterval = setInterval(renderFrame, 1000 / 30);

      // Create combined stream
      const canvasStream = canvas.captureStream(30);
      const combinedStream = new MediaStream();

      // Add video track
      canvasStream.getVideoTracks().forEach(track => {
        combinedStream.addTrack(track);
      });

      // Add audio tracks
      destination.stream.getAudioTracks().forEach(track => {
        combinedStream.addTrack(track);
      });

      // Setup MediaRecorder with better options
      let mimeType = 'video/webm;codecs=vp9,opus';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/webm;codecs=vp8,opus';
      }
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/webm';
      }

      const mediaRecorder = new MediaRecorder(combinedStream, {
        mimeType: mimeType,
        videoBitsPerSecond: 5000000, // 5 Mbps
        audioBitsPerSecond: 128000   // 128 kbps
      });

      recordedChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        console.log('Data available:', event.data.size, 'bytes');
        if (event.data && event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        console.log('Recording stopped, chunks:', recordedChunksRef.current.length);
        if (renderInterval) {
          clearInterval(renderInterval);
          renderInterval = null;
        }
        saveRecording();

        // Cleanup
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
        }

        // Close audio context
        if (audioContext.state !== 'closed') {
          audioContext.close();
        }
      };

      mediaRecorder.onerror = (event) => {
        console.error('MediaRecorder error:', event);
        updateStatus('Recording error occurred');
      };

      mediaRecorderRef.current = mediaRecorder;

      // Start recording with smaller timeslice for better data collection
      mediaRecorder.start(100);
      setIsRecording(true);

      updateStatus('Recording in progress...');

    } catch (error) {
      console.error('Error starting recording:', error);
      updateStatus(`Error: ${error.message}`);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      console.log('Stopping recording...');
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsSetup(false);
      updateStatus('Recording stopped. Processing video...');
    }
  };

  const saveRecording = () => {
    console.log('Saving recording, chunks:', recordedChunksRef.current.length);

    if (recordedChunksRef.current.length === 0) {
      updateStatus('Error: No data recorded');
      return;
    }

    const blob = new Blob(recordedChunksRef.current, {
      type: 'video/webm'
    });

    console.log('Blob created:', blob.size, 'bytes');

    if (blob.size === 0) {
      updateStatus('Error: Recording file is empty');
      return;
    }

    const timestamp = new Date().toLocaleString();

    const recording = {
      id: Date.now(),
      url: null,
      blob: blob,
      timestamp: timestamp,
      size: formatFileSize(blob.size)
    };

    setRecordings(prev => [...prev, recording]);
    updateStatus(`Recording saved! File size: ${recording.size}`);
  };

  const playRecording = (recording) => {
    recording.url = URL.createObjectURL(recording.blob);
    setPlayingVideo(recording);
  };

  useEffect(() => {
    if (playingVideo) {
      const modal = document.getElementById('my_modal');
      if (modal) {
        modal.showModal();
      }
    }
  }, [playingVideo]);

  const handleModalClose = () => {
    // Reset the state that controls the modal's existence/content
    setPlayingVideo(null);
  };

  const downloadRecording = (recording) => {
    recording.url = URL.createObjectURL(recording.blob);
    const a = document.createElement('a');
    a.href = recording.url;
    a.download = `screen-recording-${recording.id}.webm`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (cameraStreamRef.current) {
        cameraStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      // Clean up video elements
      if (screenVideoRef.current) {
        screenVideoRef.current.srcObject = null;
      }
      if (cameraVideoRef.current) {
        cameraVideoRef.current.srcObject = null;
      }

      // Clean up object URLs
      recordings.forEach(recording => {
        URL.revokeObjectURL(recording.url);
      });
    };
  }, [recordings]);

  // Don't render on server side
  if (!isClient) {
    return (
      <div className="flex flex-col w-screen items-center bg-neutral-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Loading Screen Recorder...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-screen items-center bg-neutral-950">
      {/* Recording Indicator */}
      {isRecording && (
        <div className="fixed top-5 right-5 border-2 border-red-950 text-white px-5 py-2 rounded-full font-bold flex items-center gap-3 z-50">
          <div className="w-3 h-3 bg-red-700 rounded-full animate-ping"></div>
          <span>Recording in progress...</span>
        </div>
      )}

      {/* Video Modal */}
      {playingVideo && (
        <dialog id="my_modal" className="modal bg-black" onClose={handleModalClose}>
          <div className="max-w-4xl">
            <video
              src={playingVideo.url}
              controls
              autoPlay
              className="rounded-lg shadow-2xl"
            />
          </div>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
        </dialog>
      )}

      <div className="container mx-auto px-5 py-5 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="text-3xl font-bold mb-2 drop-shadow-lg">
            Screen Recorder with Camera
          </h1>
          <p className="text-xl text-neutral-400">
            Capture your screen with camera overlay for recordings
          </p>
        </div>

        {/* Main Recorder Container */}
        <div className="rounded-3xl p-8">
          {/* Preview Section */}
          <div className={`relative mb-8 ${isSetup? 'flex':'hidden'} rounded-2xl overflow-hidden bg-black min-h-[400px]`}>
            <video
              ref={screenPreviewRef}
              autoPlay
              muted
              playsInline
              className="w-full h-[400px] object-contain bg-black rounded-2xl"
            />
            <video
              ref={cameraPreviewRef}
              autoPlay
              muted
              playsInline
              className="absolute bottom-5 right-5 w-48 h-36 border-2 border-opacity-80 rounded-2xl object-cover bg-neutral-950 shadow-xl transition-transform hover:scale-105 hover:border-blue-400"
            />
          </div>

          {/* Controls */}
          <div className="flex gap-4 justify-center flex-wrap mb-8">
            <button
              onClick={setupStreams}
              disabled={isSetup}
              className={`px-6 py-3 rounded-full font-semibold text-lg uppercase tracking-wider min-w-[160px] transition-all duration-300 ${
                isSetup
                  ? 'bg-green-700 cursor-not-allowed opacity-70'
                  : 'bg-yellow-700'
              }`}
            >
              {isSetup ? 'Streams Ready' : 'Setup Streams'}
            </button>

            <button
              onClick={startRecording}
              disabled={!isSetup || isRecording}
              className="px-6 py-3 rounded-full font-semibold text-lg uppercase tracking-wider min-w-[160px] transition-all duration-300 bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Recording
            </button>

            <button
              onClick={stopRecording}
              disabled={!isRecording}
              className="px-6 py-3 rounded-full font-semibold text-lg uppercase tracking-wider min-w-[160px] transition-all duration-300 bg-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Stop Recording
            </button>
          </div>

          {/* Status */}
          <div className="text-center text-xl opacity-90 mb-8">
            {status}
          </div>

          {/* Recordings Section */}
          <div className=" bg-opacity-5 rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-center mb-6">Recorded Videos</h3>

            {recordings.length === 0 ? (
              <p className="text-center opacity-70">No recordings yet</p>
            ) : (
              <div className="space-y-4">
                {recordings.map((recording, index) => (
                  <div
                    key={recording.id}
                    className=" bg-opacity-10 rounded-xl p-4 flex justify-between items-center"
                  >
                    <div className="flex-grow">
                      <div className="font-bold">Recording {index + 1}</div>
                      <div className="text-sm opacity-80">
                        {recording.timestamp} • {recording.size}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => playRecording(recording)}
                        className="px-4 py-2 rounded-lg font-semibold text-sm"
                      >
                        <Play className="inline-block mr-2 mb-1" />
                      </button>
                      <button
                        onClick={() => downloadRecording(recording)}
                        className="px-4 py-2 rounded-lg font-semibold text-sm"
                      >
                        <Download className="inline-block mr-2 mb-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenCameraRecorder;