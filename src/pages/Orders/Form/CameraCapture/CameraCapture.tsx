import React, { useEffect, useRef, useState } from 'react';
import * as exifr from 'exifr';
import { FaCamera } from 'react-icons/fa';

interface CameraCaptureProps {
	uploadUrl: string;
	previewBaseUrl?: string;
	onUploadSuccess?: (data: any) => void;
	onUploadError?: (error: any) => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({
	uploadUrl,
	previewBaseUrl,
	onUploadSuccess,
	onUploadError,
}) => {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [photo, setPhoto] = useState<string | null>(null);
	const [imageBlob, setImageBlob] = useState<Blob | null>(null);
	const [stream, setStream] = useState<MediaStream | null>(null);

	useEffect(() => {
		const startCamera = async () => {
			try {
				const mediaStream = await navigator.mediaDevices.getUserMedia({
					video: { facingMode: 'environment' },
				});
				setStream(mediaStream);
				if (videoRef.current) {
					videoRef.current.srcObject = mediaStream;
				}
			} catch (err) {
				console.error('Erro ao acessar a câmera:', err);
			}
		};

		startCamera();

		return () => {
			stream?.getTracks().forEach((track) => track.stop());
		};
	}, []);

	const takePhoto = async () => {
		const video = videoRef.current;
		const canvas = canvasRef.current;
		if (!video || !canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
		ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

		canvas.toBlob(async (blob) => {
			if (blob) {
				const correctedBlob = await correctOrientation(blob);
				setImageBlob(correctedBlob);
				setPhoto(URL.createObjectURL(correctedBlob));
			}
		}, 'image/jpeg');
	};

	const sendToServer = () => {
		if (!imageBlob) return;

		const formData = new FormData();
		formData.append('photo', imageBlob, 'photo.jpg');

		fetch(uploadUrl, {
			method: 'POST',
			body: formData,
		})
			.then((res) => res.json())
			.then((data) => {
				const previewUrl =
					previewBaseUrl && data?.filename
						? `${previewBaseUrl}/${data.filename}`
						: URL.createObjectURL(imageBlob);

				setPhoto(previewUrl);
				onUploadSuccess?.(data);
			})
			.catch((err) => {
				console.error('Erro no upload:', err);
				onUploadError?.(err);
			});
	};

	const correctOrientation = async (blob: Blob): Promise<Blob> => {
		const orientation = await exifr.orientation(blob).catch(() => 1);
		const img = new Image();
		const dataUrl = await blobToDataURL(blob);
		img.src = dataUrl;

		return new Promise((resolve) => {
			img.onload = () => {
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');
				if (!ctx) return;

				if (orientation && orientation > 4) {
					canvas.width = img.height;
					canvas.height = img.width;
				} else {
					canvas.width = img.width;
					canvas.height = img.height;
				}

				switch (orientation) {
					case 2:
						ctx.transform(-1, 0, 0, 1, canvas.width, 0);
						break;
					case 3:
						ctx.transform(-1, 0, 0, -1, canvas.width, canvas.height);
						break;
					case 4:
						ctx.transform(1, 0, 0, -1, 0, canvas.height);
						break;
					case 5:
						ctx.transform(0, 1, 1, 0, 0, 0);
						break;
					case 6:
						ctx.transform(0, 1, -1, 0, canvas.height, 0);
						break;
					case 7:
						ctx.transform(0, -1, -1, 0, canvas.height, canvas.width);
						break;
					case 8:
						ctx.transform(0, -1, 1, 0, 0, canvas.width);
						break;
				}

				ctx.drawImage(img, 0, 0);
				canvas.toBlob((correctedBlob) => {
					resolve(correctedBlob || blob);
				}, 'image/jpeg');
			};
		});
	};

	const blobToDataURL = (blob: Blob): Promise<string> => {
		return new Promise((resolve) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result as string);
			reader.readAsDataURL(blob);
		});
	};

	return (
		<div className="fields row">
			<div
				className="codeRead d-flex"
				style={{
					position: 'relative',
					overflow: 'hidden',
					width: '100%',
					padding: '1em',
				}}
			>
				{/* Botão de tirar foto */}
				<button
					onClick={takePhoto}
					style={{
						padding: 0,
						position: 'absolute',
						bottom: '20px',
						left: '50%',
						transform: 'translateX(-50%)',
						zIndex: 10,
						borderRadius: '50%',
						height: '80px',
						width: '80px',
						backgroundColor: '#fff',
						border: '2px solid #ccc',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
						background:
							'linear-gradient(90deg, rgba(7, 170, 232, 1) 0%, rgba(46, 83, 164, 1) 74%)',
					}}
				>
					<FaCamera style={{ fontSize: '32px' }} color="#fff" />
				</button>

				{/* Vídeo ao fundo */}
				<div style={{ flex: 1, minWidth: '50%' }}>
					<video
						ref={videoRef}
						autoPlay
						playsInline
						muted
						style={{
							width: '100%',
							borderRadius: '10px',
							height: '90%',
							objectFit: 'cover',
						}}
					/>
					<canvas ref={canvasRef} style={{ display: 'none' }} />
				</div>

				{/* Pré-visualização animada */}
				<div
					className={`preview-slide ${photo ? 'active' : ''}`}
					style={{
						position: 'absolute',
						top: 0,
						right: 0,
						width: '100%',
						height: '100%',
						transition: 'transform 0.6s ease',
						transform: photo ? 'translateX(0)' : 'translateX(100%)',
						backgroundColor: '#fff',
						borderRadius: '10px',
						padding: '10px',
						boxShadow: '0 0 20px rgba(0,0,0,0.2)',
						zIndex: 10,
					}}
				>
					{photo && (
						<>
							<img
								src={photo}
								alt="Foto capturada"
								style={{
									width: '100%',
									borderRadius: '10px',
									height: '500px',
									objectFit: 'cover',
								}}
							/>
							<div className="d-flex justify-content-between">
								<button
									onClick={() => setPhoto('')}
									style={{ marginTop: '10px', padding: '8px 16px' }}
								>
									Voltar
								</button>
								<button
									onClick={sendToServer}
									style={{ marginTop: '10px', padding: '8px 16px' }}
								>
									Enviar
								</button>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default CameraCapture;
