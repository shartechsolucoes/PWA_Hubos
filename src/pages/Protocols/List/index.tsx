import './styles.css';
import CardProtocol from '../../../components/CardProtocol/CardProtocol.tsx';
import { useEffect, useState } from 'react';
import { api } from '../../../utils/api.ts';
import { IoSearch } from 'react-icons/io5';

export default function ListProtocols() {
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
	const [page, setPage] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	const getOrders = async (pageToLoad = 0, reset = false) => {
		if (isLoading) return;
		setIsLoading(true);

		try {
			const userId = localStorage.getItem('userId');
			const response = await api.get(
				`/orders?dateStart=&userId=${userId}&os=${searchTerm}&page=${pageToLoad}`
			);

			const newOrders = response.data.orders;

			if (newOrders.length === 0) {
				setHasMore(false);
			} else {
				setOrders((prev) => (reset ? newOrders : [...prev, ...newOrders]));
				setPage(pageToLoad + 1);
			}
		} catch (error) {
			console.error('Erro ao buscar ordens:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const interval = setInterval(() => {
			const userId = localStorage.getItem('userId');
			const token = localStorage.getItem('token');

			if (userId && token) {
				setIsReady(true);
				clearInterval(interval);
			}
		}, 100);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (isReady) {
			getOrders(0, true); // Carrega a primeira página ao iniciar
		}
	}, [isReady]);

	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + document.documentElement.scrollTop >=
					document.documentElement.offsetHeight - 200 &&
				hasMore &&
				!isLoading
			) {
				getOrders(page);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [page, hasMore, isLoading, searchTerm]);

	const handleSearch = () => {
		setOrders([]);
		setPage(0);
		setHasMore(true);
		getOrders(0, true);
	};

	return (
		<>
			<div className="container view">
				<div className="d-flex align-content-end">
					<input
						placeholder="Pesquisar OS"
						className="form-control search"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<button
						className="btn search-button mx-2 my-0 d-flex justify-content-center align-items-center"
						onClick={handleSearch}
					>
						<IoSearch />
					</button>
				</div>

				{orders.map((order) => (
					<CardProtocol
						key={order.id}
						id={order.id}
						address={`${order.address} ${order.neighborhood} ${order.city} ${order.state}`}
						order={order.qr_code}
					/>
				))}

				{isLoading && <p className="text-center mt-3">Carregando...</p>}
				{!hasMore && (
					<p className="text-center mt-3">
						Nenhuma ordem adicional encontrada.
					</p>
				)}
			</div>
		</>
	);
}
