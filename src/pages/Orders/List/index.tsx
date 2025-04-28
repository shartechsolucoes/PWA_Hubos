import Sidebar from '../../../components/Sidebar/sidebar.tsx';
import Navbar from '../../../components/Navbar/Navbar.tsx';
import { MdOutlineAdd } from 'react-icons/md';
import './styles.css';
import CardOrder from '../../../components/CardOrder/CardOrder.tsx';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { api } from '../../../utils/api.ts';
import { IoSearch } from 'react-icons/io5';

export default function ListOrders() {
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

	const [isReady, setIsReady] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');

	const getOrders = async () => {
		const userId = localStorage.getItem('userId');

		const response = await api.get(
			`/orders?dateStart=&userId=${userId}&os=${searchTerm}`
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
		}
	}, [isReady]);

	return (
		<>
			<Sidebar />
			<div className="container">
				<div className="d-flex align-content-end">
					<input
						placeholder="Pesquisar OS"
						className="form-control"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<button
						className="btn btn-primary mx-2 d-flex justify-content-center align-items-center"
						onClick={getOrders}
					>
						<IoSearch />
					</button>
				</div>
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
			<Navbar />
		</>
	);
}
