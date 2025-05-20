import 'bootstrap/dist/css/bootstrap.min.css';

import './style.css';
import CardOrder from '../../components/CardOrder/CardOrder.tsx';
import { useEffect, useState } from 'react';
import { api } from '../../utils/api.ts';
import { format } from 'date-fns';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export default function Dashboard() {
	const [orders, setOrders] = useState<
		Array<{
			status: number;
			active: boolean;
			address: string;
			city: string;
			id: number;
			lat: string;
			long: string;
			neighborhood: string;
			observations: string;
			qr_code: string;
			registerDay: string;
			state: string;
			ordersKits: string;
			user: { name: string; picture: string };
		}>
	>([]);
	const apiKey = 'AIzaSyCLYeK1ksPfWhPxgZZ687Vdi-eDFLFRCr0';

	// const [userName, setUserName] = useState('');
	const [isReady, setIsReady] = useState(false);

	const getOrders = async () => {
		const userId = localStorage.getItem('userId');
		const today = new Date();
		const formattedDate = format(today, 'yyyy-MM-dd');
		const response = await api.get(
			`/orders?dateStart=${formattedDate}&dateEnd=${formattedDate}&userId=${userId}`
		);
		setOrders(response.data.orders);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			const userId = localStorage.getItem('userId');
			const token = localStorage.getItem('token');

			if (userId && token) {
				setIsReady(true);
				clearInterval(interval);
			}
		}, 100); // checa a cada 100ms

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (isReady) {
			getOrders();
			// setUserName(localStorage.getItem('userName') || '');
		}
	}, [isReady]);

	return (
		<>
			<div className="container view">
				<div className="row">
					<div
						className="col-12"
						style={{ position: 'fixed', top: 0, right: 0, width: '100vw' }}
					>
						<LoadScript googleMapsApiKey={apiKey}>
							<GoogleMap
								mapContainerStyle={{
									width: '100vw',
									height: '50vh',
									left: '-3vw',
								}}
								center={{
									lat: parseFloat(orders[0]?.lat || '-15.7801'),
									lng: parseFloat(orders[0]?.long || '-47.9292'),
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
								{orders.map((order, index) => (
									<Marker
										key={index}
										position={{
											lat: parseFloat(order.lat),
											lng: parseFloat(order.long),
										}}
										title={`Pedido #${order.id}`}
									/>
								))}
							</GoogleMap>
						</LoadScript>
					</div>
					<div className="container-card">
						<div className="col-12 mt-3 inside-scroll">
							{orders.map((order) => (
								<CardOrder
									key={order.id}
									id={order.id}
									address={
										order.address +
										' ' +
										order.neighborhood +
										' ' +
										order.city +
										' ' +
										order.state
									}
									order={order.qr_code}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
