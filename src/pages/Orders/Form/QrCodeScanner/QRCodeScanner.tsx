import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { BsQrCodeScan } from 'react-icons/bs';

export default function QRCodeScanner({
	onScan,
	value = '',
}: {
	onScan: (code: string) => void;
	value?: string; // <-- permite receber valor inicial
}) {
	const [scannedCode, setScannedCode] = useState(value);
	const scannerRef = useRef<HTMLDivElement>(null);
	const html5QrCodeRef = useRef<Html5Qrcode | null>(null);

	useEffect(() => {
		// Atualiza o estado se a prop "value" mudar externamente
		setScannedCode(value || '');
	}, [value]);

	useEffect(() => {
		const config = { fps: 5, qrbox: 250 };

		if (scannerRef.current) {
			const qrCodeScanner = new Html5Qrcode('qr-reader');
			html5QrCodeRef.current = qrCodeScanner;

			qrCodeScanner
				.start(
					{ facingMode: 'environment' },
					config,
					(decodedText) => {
						setScannedCode(decodedText);
						onScan(decodedText); // ✅ envia para componente pai
						qrCodeScanner.pause();
					},
					(error) => {
						console.warn('Erro ao escanear QR Code:', error);
					}
				)
				.catch((err) => {
					console.error('Erro ao iniciar scanner:', err);
				});
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
						onChange={(e) => {
							const value = e.target.value;
							setScannedCode(value);
							onScan(value); // também envia ao digitar
						}}
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
