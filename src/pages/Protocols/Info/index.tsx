import { BsQrCodeScan } from 'react-icons/bs';
import './ordersInfo.css';
import { api } from '../../../utils/api.ts';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { KitType } from './types';
import KitCard from '../../../components/KitCard/KitCard.tsx';
import Toast from '../../../components/Toast/Toast.tsx';
import { FaPlus } from 'react-icons/fa';

export default function InfoProtocol() {
	const [searchParams] = useSearchParams();
	const id = searchParams.get('id');
	const navigate = useNavigate();

	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState('');
	const [toastType, setToastType] = useState<'success' | 'error'>('success');
	const [protocol, setOrder] = useState<{
		id: number;
		protocolNumber: string;
		numberPost: number;
		observation: string;
		userId: string | null;
		orderId: number;
		address: string;
		neighborhood: string;
		city: string;
		state: string;
	}>({
		id: 0,
		address: '',
		userId: '',
		neighborhood: '',
		city: '',
		state: '',
		observation: '',
		protocolNumber: '',
		numberPost: 0,
		orderId: 0,
	});

	const getOrder = async () => {
		try {
			const response = await api.get(`/services/${id}`);
			console.log('API Response:', response.data);

			// Verifique se os dados existem antes de setar
			if (response.data && response.data) {
				setOrder(response.data);
			} else {
				console.warn('Dados de ordem não encontrados');
			}
		} catch (error) {
			console.error('Erro ao buscar os dados do pedido:', error);
		}
	};

	const attachToUser = async () => {
		try {
			await api.put(`services/${protocol.id}`, {
				...protocol,
				userId: localStorage.getItem('userId'),
			});
			handleSuccess();
		} catch (error) {
			console.log(error);
			handleError();
		}
	};

	const handleSuccess = () => {
		setToastMessage('Adicionado com sucesso!');
		setToastType('success');
		setShowToast(true);
		closeToast();
	};

	const handleError = () => {
		setToastMessage('Ocorreu um erro ao adicionar.');
		setToastType('error');
		setShowToast(true);
		closeToast();
	};

	const closeToast = () => {
		setTimeout(() => {
			setShowToast(false);
			if (toastType !== 'error') navigate('/protocols');
		}, 1300);
	};
	useEffect(() => {
		getOrder();
	}, []);

	return (
		<div className="container">
			<div className="card-container">
				<div className="d-flex gap-3 align-items-center">
					<div className="qrcode"></div>
					<div>
						<h4 className="mb-0">Protocolo #{protocol.protocolNumber}</h4>
					</div>
				</div>

				<div className="map-data mt-3">
					{protocol.address} {protocol.neighborhood}, {protocol.city} -{' '}
					{protocol.state}
				</div>

				<div className="map-data mt-3">Poste - {protocol.numberPost}</div>

				<div className="mt-3">
					<p>
						<span className="info-label">Nº Protocolo:</span>{' '}
						<span className="info-value">{protocol.protocolNumber}</span>
					</p>
					<p>
						<span className="info-label">OBS:</span>{' '}
						<span className="info-value">{protocol.observation}</span>
					</p>
				</div>
				{!protocol.userId && (
					<div>
						<button type="button" onClick={() => attachToUser()}>
							Adicionar
						</button>
					</div>
				)}
			</div>
			<Toast type={toastType} message={toastMessage} show={showToast} />
		</div>
	);
}
