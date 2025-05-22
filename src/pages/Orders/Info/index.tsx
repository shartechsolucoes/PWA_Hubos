import { BsQrCodeScan } from 'react-icons/bs';
import './ordersInfo.css';
import { api } from '../../../utils/api.ts';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { KitType, OrderType } from './types';
import KitCard from '../../../components/KitCard/KitCard.tsx';
import { format } from 'date-fns';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export default function InfoOrders() {
	const [searchParams] = useSearchParams();
	const id = searchParams.get('id');

	const [order, setOrder] = useState<OrderType>({
		id: 0,
		address: '',
		userId: '',
		neighborhood: '',
		city: '',
		state: '',
		status: 0,
		observations: '',
		lat: '',
		long: '',
		qr_code: 0,
		protocolNumber: '',
		active: false,
		registerDay: new Date(),
		duplicated: false,
		photoStartWork: '',
		photoEndWork: '',
		ordersKits: [],
	});

	const apiKey = 'AIzaSyCLYeK1ksPfWhPxgZZ687Vdi-eDFLFRCr0';

	const [kits, setKits] = useState<KitType[]>([
		{
			id: 0,
			description: '',
			active: false,
			status: false,
			materials: [],
			quantity: 0,
		},
	]);

	const getOrder = async () => {
		const response = await api.get(`/order/${id}`);
		setOrder(response.data);
	};

	const getKits = async () => {
		const response = await api.get('kits');
		const kits: KitType[] = [];

		for (const kit of order.ordersKits) {
			const matchedKit = response.data.find(
				(item: KitType) => item.id === kit.kit_id
			);

			if (matchedKit) {
				kits.push({
					...matchedKit,
					quantity: kit.quantity,
				});
			}
		}

		setKits(kits);
	};

	useEffect(() => {
		if (order.id) {
			getKits();
		}
	}, [order]);

	useEffect(() => {
		getOrder();
	}, []);
	return (
		<div className="container">
			<div className="card-container">
				<div className="d-flex gap-3 align-items-center">
					<div className="qrcode">
						<BsQrCodeScan />
					</div>
					<div>
						<h4 className="mb-0">{order.qr_code}</h4>
						<small>{format(order.registerDay, 'dd/MM/yyyy')}</small>
					</div>
				</div>

				<div className="map mt-3">
					<LoadScript googleMapsApiKey={apiKey}>
						<GoogleMap
							mapContainerStyle={{ width: '100%', height: '100%' }}
							center={{
								lat: parseFloat(order?.lat || '-15.7801'),
								lng: parseFloat(order?.long || '-47.9292'),
							}}
							zoom={12}
							options={{
								disableDefaultUI: true,
								zoomControl: false,
								streetViewControl: false,
								mapTypeControl: false,
								fullscreenControl: false,
							}}
						>
							<Marker
								position={{
									lat: parseFloat(order.lat),
									lng: parseFloat(order.long),
								}}
								title={`Pedido #${order.id}`}
							/>
						</GoogleMap>
					</LoadScript>
				</div>

				<div className="map-data">
					{order.address} {order.neighborhood}, {order.city} - {order.state}
				</div>

				<div className="mt-3">
					<p>
						<span className="info-label">Nº Protocolo:</span>{' '}
						<span className="info-value">{order.protocolNumber}</span>
					</p>
					<p>
						<span className="info-label">OBS:</span>{' '}
						<span className="info-value">{order.observations}</span>
					</p>
				</div>

				<div className="mt-3">
					<p className="info-label">Kits</p>
					<div className="kits">
						{kits.length > 0 &&
							kits.map((kit) => (
								<KitCard
									key={kit.id}
									description={kit.description}
									materials={kit.materials}
									quantity={kit.quantity}
								/>
							))}
					</div>
				</div>
			</div>
		</div>
	);
}
