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
		<>
			<div className="container">
				<div className="row d-flex flex-column gap-1">
					<div className="d-flex gap-3">
						<div className="qrcode d-flex rounded-1">
							<BsQrCodeScan />
						</div>
						<div className="col-4">
							<h1>{order.qr_code}</h1>
							<p>{format(order.registerDay, 'dd/MM/yyyy')}</p>
						</div>
					</div>

					<div className="col-12">
						<div className="map ">
							<LoadScript googleMapsApiKey={apiKey}>
								<GoogleMap
									mapContainerStyle={{ width: '100%', height: '250px' }}
									center={{
										lat: parseFloat(order?.lat || '-15.7801'),
										lng: parseFloat(order?.long || '-47.9292'),
									}}
									zoom={12}
									options={{
										disableDefaultUI: true, // Remove todos os controles padrão
										zoomControl: false, // Especificamente remove o controle de zoom
										streetViewControl: false, // Remove o botão do Street View
										mapTypeControl: false, // Remove o botão de tipo de mapa (satélite, etc.)
										fullscreenControl: false, // Remove o botão de fullscreen
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
					</div>
					<div className="map-data col-12 mt-2">
						<p className="fs-6">
							{order.address +
								' ' +
								order.neighborhood +
								' ' +
								order.city +
								' ' +
								order.state}
						</p>
					</div>

					<div className="col-12 d-flex flex-column gap-2">
						<p className="fs-6">
							<strong>N° Protocolo</strong>: {order.protocolNumber}
						</p>
						<p className="fs-6">
							<strong>OBS</strong>: {order.observations}
						</p>
					</div>
					<div className="col-12 mt-3">
						<p className="fs-6">
							<strong>Kits</strong>
						</p>
					</div>
					<div className="kits col-12  d-flex flex-column gap-2">
						{kits.length > 0 &&
							kits?.map((kit) => (
								<KitCard
									description={kit.description}
									materials={kit.materials}
									quantity={kit.quantity}
								/>
							))}
					</div>
				</div>
			</div>
		</>
	);
}
