import React, { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import Peer from "simple-peer";
import Loading from "./loading";

const VideoCall: React.FC = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const socket = useRef<Socket | null>(null);
  const peer = useRef<Peer.Instance | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Connect to the signaling server
    socket.current = io("http://localhost:4000");
    
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // Initialize the peer connection
        peer.current = new Peer({ initiator: true, stream });

        // Handle received signal data
        peer.current.on("signal", (signal) => {
          // Send the signal data to the remote user via signaling server
          socket.current?.emit("offer", signal);
        });

        // Handle incoming remote signal
        socket.current?.on("offer", (signal) => {
          peer.current?.signal(signal);
          setIsLoading(false); 
          
        });
        
        // Handle established connection and set remote stream
        peer.current.on("stream", (remoteStream) => {
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = remoteStream;
               
          }
        });
      })
      .catch((error) => {
        console.error("Error accessing media:", error);
        setIsLoading(false); // Handle error case
      });

    return () => {
      // Close the peer connection and release resources
      if (peer.current) {
        peer.current.destroy();
      }
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="h-screen text-white bg-black flex flex-col text-bold text-left items-left items-center justify-center overflow-hidden w-screen">
          <p className="left-2 absolute top-2">Connected:)</p>

          <div className="h-[90vh] relative">
            <video
              className={"bottom-2 w-[40vw] left-2 md:w-2/6 lg:w-1/6 absolute border border-black shadow rounded-xl"}
              ref={localVideoRef}
              autoPlay
              muted
            />
            <video
              className="h-full shadow rounded-xl"
              ref={remoteVideoRef}
              autoPlay
            />
          </div>
        </div>
      )}
    </>
  );
};

export default VideoCall;
