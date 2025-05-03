import { useEffect, useState } from 'react';
import './style.css';

import QRCodeScanner from './QrCodeScanner/QRCodeScanner.tsx';
import AddressForm from './AddressForm/AddressForm.tsx';
import KitSelector from './KitSelector/KitSelector.tsx';
import { KitType } from '../Info/types';
import { api } from '../../../utils/api.ts';
import CameraCapture from './CameraCapture/CameraCapture.tsx';

const steps = [
	{
		id: 'QRCODE',
		title: 'QR Code',
	},
	{
		id: 'INFO',
		title: 'Informações',
	},
	{
		id: 'KITS',
		title: 'Selecione o kit usado',
	},
	{
		id: 'PHOTOSTART',
		title: 'Tire uma foto do antes',
	},
	{
		id: 'PHOTOEND',
		title: 'Tire uma foto do serviço Finalizado',
	},
];

export default function FormOrders() {
	const [currentStep, setCurrentStep] = useState(0);
	const [loading, setLoading] = useState(false);
	const [formValues] = useState({
		qrcode: '',
		protocol: '',
		phone: '',
		city: '',
		street: '',
		street_number: '',
		card_number: '',
		card_name: '',
		card_validity: '',
	});

	function handleNext() {
		setCurrentStep((prevState) => prevState + 1);
	}

	async function handleSubmit(e: { preventDefault: () => void }) {
		e.preventDefault();

		console.log('Form sent...', formValues);

		setLoading(true);
	}

	const [selectedKits, setSelectedKits] = useState<KitType[]>([]);

	const getKits = async () => {
		const response = await api.get('kits');
		const kits: KitType[] = response.data;
		setSelectedKits(kits);
	};

	useEffect(() => {
		getKits();
	}, []);
	return (
		<>
			<div className="container">
				<div className="App">
					<p className="step-guide">
						{currentStep + 1} de {steps.length}
					</p>

					<form className="steps-form" onSubmit={handleSubmit}>
						<div className="fields-container">
							<p>{steps[currentStep].title}</p>

							{steps[currentStep].id === 'QRCODE' && <QRCodeScanner />}

							{steps[currentStep].id === 'INFO' && <AddressForm />}

							{steps[currentStep].id === 'KITS' && (
								<KitSelector kits={selectedKits} />
							)}

							{steps[currentStep].id === 'PHOTOSTART' && <CameraCapture />}

							{steps[currentStep].id === 'PHOTOEND' && (
								<div className="fields row">
									<div className="codeRead"></div>
								</div>
							)}

							<div className="d-flex justify-content-between">
								{currentStep < steps.length - 1 && (
									<button
										className="mt-3 btn btn-dark next"
										type="button"
										onClick={handleNext}
									>
										Next
									</button>
								)}

								{currentStep === steps.length - 1 && (
									<button className="mt-3 btn btn-dark submit" type="submit">
										Enviar
									</button>
								)}
							</div>
							{loading && <h1 className="loader">Enviando...</h1>}
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
