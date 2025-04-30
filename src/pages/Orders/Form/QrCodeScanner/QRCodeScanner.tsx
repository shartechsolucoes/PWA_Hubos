import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { BsQrCodeScan } from 'react-icons/bs';

export default function QRCodeScanner() {
	const [scannedCode, setScannedCode] = useState('');
	const scannerRef = useRef<HTMLDivElement>(null);
	const html5QrCodeRef = useRef<Html5Qrcode | null>(null);

	useEffect(() => {
		const config = { fps: 5, qrbox: 250 };

		if (scannerRef.current) {
			const qrCodeScanner = new Html5Qrcode('qr-reader');
			html5QrCodeRef.current = qrCodeScanner;

			Html5Qrcode.getCameras()
				.then((devices) => {
					if (devices.length) {
						const cameraId = devices[0].id;
						qrCodeScanner.start(
							cameraId,
							config,
							(decodedText) => {
								setScannedCode(decodedText);
								qrCodeScanner.clear();
							},
							(error) => {
								console.warn('QR scan error', error);
							}
						);
					}
				})
				.catch((err) => console.error('Camera error:', err));
		}

		return () => {
			html5QrCodeRef.current?.stop().catch(() => {});
		};
	}, []);

	return (
		<div className="fields row">
			<div className="col-12 mt-2 rounded">
				<div
					id="qr-reader"
					ref={scannerRef}
					style={{ width: '100%', borderRadius: '16px', overflow: 'hidden' }}
				></div>
			</div>

			<div className="col-12">
				<div className="input-group mt-2">
					<input
						type="text"
						className="form-control"
						placeholder="QR Code"
						value={scannedCode}
						onChange={(e) => setScannedCode(e.target.value)}
					/>
					<div className="input-group-prepend">
						<div className="input-group-text">
							<BsQrCodeScan />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
