import { Button } from '@mui/material';
import { useState } from 'react';
import { Oval } from 'react-loader-spinner';
import './voice.scss';
import { useNavigate } from 'react-router-dom';
function Voice() {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  const navigate = useNavigate();

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';
  const startRecording = () => {
    setTranscript(''); // Clear previous transcripts
    setRecording(true);
    recognition.start();

    // Handle the transcription result
    recognition.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript;
      setIsLoading(true);

      // Simulate a delay for loader
      setTimeout(() => {
        setTranscript(speechToText);
        setIsLoading(false);
      }, 1500); // Adjust as per your preference
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event);
      setRecording(false);
      setIsLoading(false);
    };
  };

  const stopRecording = () => {
    setRecording(false);
    recognition.stop();
  };

  return (
    <div className="container">
      <h1>Voice to Text</h1>
      <Button onClick={() => navigate('/home')}>Go to Home</Button>

      <Button
        onClick={recording ? stopRecording : startRecording}
        className="record-button">
        {recording ? 'Recording...' : 'Hold to Speak'}
      </Button>

      {isLoading ? (
        <div className="loader-container">
          <Oval height={40} width={40} color="blue" ariaLabel="loading" />
          <p>Transcribing...</p>
        </div>
      ) : (
        transcript && (
          <div className="transcript-container">
            <h2>Transcript</h2>
            <p>{transcript}</p>
          </div>
        )
      )}
    </div>
  );
}

export default Voice;
