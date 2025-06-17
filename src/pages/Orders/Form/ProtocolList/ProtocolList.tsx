import { useEffect, useState } from 'react';

import { IoSearch } from 'react-icons/io5';
import { api } from '../../../../utils/api';
import { BsQrCodeScan } from 'react-icons/bs';

import './styles.css';
import { FaPlay } from 'react-icons/fa';

export default function ProtocolList({
	protocolNumber,
}: {
	protocolNumber: (e: string) => void;
}) {
	const [orders, setOrders] = useState<
		Array<{
			id: number;
			protocolNumber: string;
			numberPost: number;
			observation: string;
			userId: string | null; // null se o campo for opcional
			orderId: number;
			address: string;
			neighborhood: string;
			city: string;
			state: string;
			user: {
				id: string;
				name: string;
				email: string;
				picture: string;
			} | null;
			order: {
				status: number;
			};
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
				`/services?page=${pageToLoad + 1}&userId=${userId}&search=${searchTerm}`
			);

			const newOrders = response.data.data;

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
	}, [page, hasMore, isLoading]);

	useEffect(() => {
		console.log(searchTerm);
	}, [searchTerm]);

	const handleSearch = () => {
		console.log(searchTerm);
		setOrders([]);
		setPage(0);
		setHasMore(true);
		getOrders(0, true);
	};

	return (
		<>
			<div className=" view">
				<div className="d-flex align-content-end">
					<input
						placeholder="Pesquisar Protocolo"
						className="form-control search"
						value={searchTerm}
						onChange={(e) => {
							console.log('Digitando:', e.target.value);
							setSearchTerm(e.target.value);
						}}
					/>
					<button
						type="button"
						className="btn search-button mx-2 my-0 d-flex justify-content-center align-items-center"
						onClick={handleSearch}
					>
						<IoSearch />
					</button>
				</div>

				{orders.map((order) => (
					<a
						key={order.id}
						className="link-no-style"
						onClick={() => protocolNumber(order.protocolNumber)}
					>
						<div className="cardOrder mt-2">
							<div className="d-flex align-items-center kitItem gap-2">
								<div className="qrcode">
									<FaPlay />
								</div>
								<div className="info">
									<p className="title">
										<span>{order.protocolNumber}</span>
									</p>
									<p>{`${order.address} ${order.neighborhood} ${order.city} ${order.state}`}</p>
								</div>
							</div>
						</div>
					</a>
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
