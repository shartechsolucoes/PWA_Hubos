import { useEffect, useState } from 'react';
import './style.css';

import QRCodeScanner from './QrCodeScanner/QRCodeScanner.tsx';
import AddressForm from './AddressForm/AddressForm.tsx';
import KitSelector from './KitSelector/KitSelector.tsx';
import CameraCapture from './CameraCapture/CameraCapture.tsx';

import { KitType } from '../Info/types';
import { api } from '../../../utils/api.ts';
import { useOnlineStatus } from '../../../utils/useOnlineStatus.ts';
import { useAppStore } from '../../../utils/store.ts';
import { createSubmission } from '../../../utils/createSubmission.ts';

const steps = [
	{ id: 'QRCODE', title: 'QR Code' },
	{ id: 'INFO', title: 'Informações' },
	{ id: 'KITS', title: 'Selecione o kit usado' },
	{ id: 'PHOTOSTART', title: 'Tire uma foto do antes' },
	{ id: 'PHOTOEND', title: 'Tire uma foto do serviço Finalizado' },
];

const STORAGE_KEY = 'offlineFormData';

export default function FormOrders() {
	const [currentStep, setCurrentStep] = useState(0);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState<any>(() => {
		const saved = localStorage.getItem(STORAGE_KEY);
		return saved ? JSON.parse(saved) : {};
	});
	const [availableKits, setAvailableKits] = useState<KitType[]>([]);

	const isOnline = useOnlineStatus();
	const { submissions, loadSubmissions, clearSubmissions, addSubmission } =
		useAppStore();

	useEffect(() => {
		loadSubmissions();
	}, []);

	useEffect(() => {
		if (isOnline && submissions.length > 0) {
			submissions.forEach(async (submission) => {
				try {
					await api.post('/submit', submission);
				} catch (err) {
					console.error('Erro ao sincronizar:', err);
				}
			});
			clearSubmissions();
		}
	}, [isOnline]);

	useEffect(() => {
		const fetchKits = async () => {
			const response = await api.get('kits');
			setAvailableKits(response.data);
		};
		fetchKits();
	}, []);

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
	}, [formData]);

	const handleNext = () => {
		const nextStep = currentStep + 1;
		const nextStepId = steps[nextStep]?.id;

		if (
			!isOnline &&
			(nextStepId === 'PHOTOSTART' || nextStepId === 'PHOTOEND')
		) {
			alert('Você precisa estar online para tirar fotos.');
			return;
		}

		setCurrentStep(nextStep);
	};

	const handlePreview = () => {
		setCurrentStep((prev) => prev - 1);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		const userId = localStorage.getItem('userId');

		const submission = createSubmission({ ...formData, userId });

		if (!formData.qr_code) {
			alert('QR Code é obrigatório!');
			setLoading(false);
			return;
		}

		if (!isOnline) {
			addSubmission(submission);
			alert('Salvo localmente. Será enviado quando estiver online.');
			setLoading(false);
			return;
		}

		try {
			await api.post('/order', submission);
			alert('Enviado com sucesso!');
			localStorage.removeItem(STORAGE_KEY); // limpar cache após envio
		} catch (error) {
			console.error('Erro no envio:', error);
			alert('Erro no envio. Salvando localmente...');
			addSubmission(submission);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container">
			<div className="App">
				<p className="step-guide">
					{currentStep + 1} de {steps.length}
				</p>

				<form className="steps-form" onSubmit={handleSubmit}>
					<div className="fields-container">
						<p>{steps[currentStep].title}</p>

						{steps[currentStep].id === 'QRCODE' && (
							<QRCodeScanner
								value={formData.qr_code}
								onScan={(value) =>
									setFormData((prev: any) => ({ ...prev, qr_code: value }))
								}
							/>
						)}

						{steps[currentStep].id === 'INFO' && (
							<AddressForm
								value={formData}
								onChange={(data) =>
									setFormData((prev: any) => ({ ...prev, ...data }))
								}
							/>
						)}

						{steps[currentStep].id === 'KITS' && (
							<KitSelector
								kits={availableKits}
								value={formData.ordersKits} // <-- passando valor salvo
								onSelect={(selected) => {
									setFormData((prev: any) => ({
										...prev,
										ordersKits: selected,
									}));
								}}
							/>
						)}

						{steps[currentStep].id === 'PHOTOSTART' && (
							<CameraCapture
								uploadUrl="/api/fotos"
								previewBaseUrl="/uploads"
								onCapture={(url) =>
									setFormData((prev: any) => ({ ...prev, photoStartWork: url }))
								}
							/>
						)}

						{steps[currentStep].id === 'PHOTOEND' && (
							<CameraCapture
								uploadUrl="/api/fotos"
								previewBaseUrl="/uploads"
								onCapture={(url) =>
									setFormData((prev: any) => ({ ...prev, photoEndWork: url }))
								}
							/>
						)}

						<div className="d-flex flex-row-reverse justify-content-between">
							{currentStep < steps.length - 1 && (
								<button
									type="button"
									className="mt-3 btn btn-dark next"
									onClick={handleNext}
								>
									Próximo
								</button>
							)}

							{currentStep === steps.length - 1 && (
								<button type="submit" className="mt-3 btn btn-dark submit">
									Enviar
								</button>
							)}

							{currentStep > 0 && (
								<button
									type="button"
									className="mt-3 btn btn-dark next"
									onClick={handlePreview}
								>
									Voltar
								</button>
							)}
						</div>

						{loading && <h1 className="loader">Enviando...</h1>}
					</div>
				</form>
			</div>
		</div>
	);
}
