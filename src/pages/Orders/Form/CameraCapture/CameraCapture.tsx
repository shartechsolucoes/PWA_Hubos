import React, { useEffect, useRef, useState } from 'react';
import * as exifr from 'exifr';
import { FaCamera } from 'react-icons/fa';
import { api } from '../../../../utils/api';
import styles from './styles.module.css'; // import do CSS module
import PhotoSentModal from './PhotSendModal/PhotoSentModal';

interface CameraCaptureProps {
	uploadUrl: string;
	previewBaseUrl?: string;
	onCapture: (url: string) => void;
	onUploadSuccess?: (data: any) => void;
	onUploadError?: (error: any) => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({
	uploadUrl,
	previewBaseUrl,
	onCapture,
	onUploadSuccess,
	onUploadError,
}) => {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [photo, setPhoto] = useState<string | null>(null);
	const [imageBlob, setImageBlob] = useState<Blob | null>(null);
	const [stream, setStream] = useState<MediaStream | null>(null);
	const [showModal, setShowModal] = useState(false);
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

		api
			.post(uploadUrl, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((response) => {
				const previewUrl = `${previewBaseUrl}${response.data.file}`;
				setPhoto(previewUrl);
				onUploadSuccess?.(response.data);
				onCapture(response.data.file);
				setShowModal(true);
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
			{showModal && <PhotoSentModal onClose={() => setShowModal(false)} />}
			<div className={styles['camera-wrapper']}>
				<button
					type="button"
					onClick={takePhoto}
					className={styles['camera-button']}
				>
					<FaCamera style={{ fontSize: '32px' }} color="#fff" />
				</button>

				<div style={{ flex: 1, minWidth: '50%' }}>
					<video
						ref={videoRef}
						autoPlay
						playsInline
						muted
						className={styles['camera-video']}
					/>
					<canvas ref={canvasRef} style={{ display: 'none' }} />
				</div>

				<div
					className={`${styles['preview-slide']} ${
						photo ? styles['active'] : ''
					}`}
				>
					{photo && (
						<>
							<img
								src={photo}
								alt="Foto capturada"
								className={styles['preview-image']}
							/>
							<div className={styles['preview-buttons']}>
								<button type="button" onClick={() => setPhoto('')}>
									Voltar
								</button>
								<button type="button" onClick={sendToServer}>
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
