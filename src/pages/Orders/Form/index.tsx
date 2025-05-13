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
import { useSkipPhotoSteps } from '../../../utils/useSkipPhotoSteps.ts';

const createSteps = (isOnline: boolean) => [
	{ id: 'QRCODE', title: 'QR Code' },
	{ id: 'INFO', title: 'Informações' },
	{ id: 'KITS', title: 'Selecione o kit usado' },
	{ id: 'PHOTOSTART', title: 'Tire uma foto do antes' },
	{ id: 'PHOTOEND', title: 'Tire uma foto do serviço Finalizado' },
	{
		id: isOnline ? 'SUBMIT' : 'OFFLINE',
		title: isOnline ? 'Enviar' : 'Você ficou offline',
	},
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

	const steps = createSteps(isOnline);

	const { canProceedToStep, photosSkipped } = useSkipPhotoSteps({
		steps,
		currentStep,
		isOnline,
		onSkipPhotos: () => {
			alert('Você ficou offline por um tempo. Etapas de foto foram puladas.');
			setCurrentStep(5); // OFFLINE
		},
	});

	useEffect(() => {
		loadSubmissions();
	}, []);

	useEffect(() => {
		// Verifique se o usuário está online e se ele está em uma etapa de foto
		if (
			isOnline &&
			currentStep < steps.length &&
			(steps[currentStep].id === 'PHOTOSTART' ||
				steps[currentStep].id === 'PHOTOEND')
		) {
			// Quando voltar online, pula para a próxima etapa
			setCurrentStep(currentStep + 1);
		}
	}, [isOnline, currentStep, steps]);

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
		const currentId = steps[currentStep]?.id;

		// Se estiver offline e estamos na tela de KITS, pular direto para tela OFFLINE
		if (!isOnline && currentId === 'KITS') {
			setCurrentStep(5); // Etapa OFFLINE
			return;
		}

		if (!canProceedToStep(nextStep)) return;

		if (nextStep < steps.length) {
			setCurrentStep(nextStep);
		}
	};

	const handlePreview = () => {
		const currentId = steps[currentStep]?.id;

		// Se estamos na etapa OFFLINE, voltar para KITS
		if (currentId === 'OFFLINE') {
			setCurrentStep(2); // Etapa KITS
			return;
		}

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
			localStorage.removeItem(STORAGE_KEY);
			setCurrentStep(0);
			setFormData({});
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
				{!isOnline && 'Você está offline no momento'}
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
								value={formData.ordersKits}
								onSelect={(selected) => {
									setFormData((prev: any) => ({
										...prev,
										ordersKits: selected,
									}));
								}}
							/>
						)}

						{steps[currentStep].id === 'PHOTOSTART' && !photosSkipped && (
							<CameraCapture
								uploadUrl={`/order/start-work-photo?&os=${formData.qr_code}`}
								previewBaseUrl="/uploads"
								onCapture={(url) =>
									setFormData((prev: any) => ({ ...prev, photoStartWork: url }))
								}
							/>
						)}

						{steps[currentStep].id === 'PHOTOEND' && !photosSkipped && (
							<CameraCapture
								uploadUrl={`/order/end-work-photo?&os=${formData.qr_code}`}
								previewBaseUrl={`order/end-work-photo?&os=${formData.qr_code}`}
								onCapture={(url) =>
									setFormData((prev: any) => ({ ...prev, photoEndWork: url }))
								}
							/>
						)}

						{steps[currentStep].id === 'OFFLINE' && (
							<div className="offline-warning">
								<h4>Você está offline</h4>
								<p>
									As etapas de foto foram puladas devido à instabilidade da
									conexão.
								</p>
								<p>
									Se estiver tudo pronto, clique em <strong>Enviar</strong> para
									salvar os dados localmente.
								</p>
							</div>
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
