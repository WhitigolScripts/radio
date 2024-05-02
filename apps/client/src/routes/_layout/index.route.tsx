import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const Route = createFileRoute("/_layout/")({
	component: Index,
});

function Index() {
	const load = useRef(false);

	useEffect(() => {
		if (!load.current) {
			load.current = true;

			const socket = io("https://voice-server.whitigol.me/", {
				transports: ["websocket"],
			});
			socket.on("connect", () => {
				navigator.mediaDevices
					.getUserMedia({ audio: true, video: false })
					.then((stream) => {
						const mediaRecorder = new MediaRecorder(stream);
						let audioChunks: BlobPart[] = [];

						mediaRecorder.addEventListener("dataavailable", (event) => {
							audioChunks.push(event.data);
						});

						mediaRecorder.addEventListener("stop", () => {
							const audioBlob = new Blob(audioChunks);
							audioChunks = [];
							const fileReader = new FileReader();
							fileReader.readAsDataURL(audioBlob);
							fileReader.onloadend = () => {
								const base64String = fileReader.result as string;
								socket.emit("audioStream", base64String);
							};

							mediaRecorder.start();
							setTimeout(() => {
								mediaRecorder.stop();
							}, 1000);
						});

						mediaRecorder.start();
						setTimeout(() => {
							mediaRecorder.stop();
						}, 1000);
					})
					.catch((error) => {
						console.error("Error capturing audio.", error);
					});
			});

			socket.on("audioStream", (audioData: string) => {
				const newData = audioData.split(";");
				newData[0] = "data:audio/ogg;";
				newData[1] = newData[0] + newData[1]; // Fix: Assign the concatenated string to a new array element

				const audioContext = new AudioContext();
				const audioElement = new Audio(newData[1]);
				const source = audioContext.createMediaElementSource(audioElement);

				const filter = audioContext.createBiquadFilter();
				filter.type = "bandpass"; // Bandpass filter
				filter.frequency.value = 1000; // Center frequency
				filter.Q.value = 10; // Quality factor, adjust for desired effect

				const lfo = audioContext.createOscillator();
				lfo.type = "sine"; // Sine wave LFO
				lfo.frequency.value = 1; // LFO frequency, adjust for speed of modulation

				const lfoGain = audioContext.createGain();
				lfoGain.gain.value = 100; // LFO depth, adjust for intensity of modulation

				// Connect the LFO to the filter frequency
				lfo.connect(lfoGain);
				lfoGain.connect(filter.frequency);

				// increase the volume of the audio
				const gainNode = audioContext.createGain();
				gainNode.gain.value = 0.9;
				source.connect(gainNode);

				// Start the LFO
				lfo.start();

				source.connect(filter);
				filter.connect(audioContext.destination);

				audioElement.play();
			});
		}
	}, []);

	return <div>Hello</div>;
}
