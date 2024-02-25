"use client";
import axios from "axios";
import { useState, useEffect } from "react";

export default function VideoPage({ params }) {
  const filename = params.filename;
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isFetchingInfo, setIsFetchingInfo] = useState(false);
  const [awsTranscriptionItems, setAwsTranscriptionItems] = useState([]);

  useEffect(() => {
    function getTranscription() {
      setIsFetchingInfo(true);
      axios.get("/api/transcribe?filename=" + filename).then((response) => {
        setIsFetchingInfo(false);
        const status = response.data?.status;
        const transcription = response.data?.transcription;
        if (status === "IN_PROGRESS") {
          setIsTranscribing(true);
          setTimeout(getTranscription, 3000);
        } else {
          setIsTranscribing(false);

          // setAwsTranscriptionItems(
          //   clearTranscriptionItems(transcription.results.items)
          // );
        }
      });
    }
    return () => getTranscription();
  }, []);

  return <div>{filename}</div>;
}
