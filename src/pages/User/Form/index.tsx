import Sidebar from '../../../components/Sidebar/sidebar.tsx';
import Navbar from '../../../components/Navbar/Navbar.tsx';
import './style.css';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { CiMail } from 'react-icons/ci';
import { IoPhonePortraitOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { api } from '../../../utils/api.ts';
import Toast from '../../../components/Toast/Toast.tsx';
import { useNavigate } from 'react-router';
import { getFirstLetter } from '../../../utils/getFirstLetter.ts';

type User = {
	id: string;
	name: string;
	address: string;
	neighborhood: string;
	city: string;
	state: string;
	login: string;
	access_level: number;
	expiration: number;
	picture: string;
	email: string;
	phone: string;
	status: boolean;
};

export default function FormUser() {
	const [user, setUser] = useState<User>({
		id: '',
		name: '',
		address: '',
		neighborhood: '',
		city: '',
		state: '',
		login: '',
		access_level: 0,
		expiration: 0,
		picture: localStorage.getItem('userAvatar') ?? '',
		email: '',
		phone: '',
		status: true,
	});

	const navigate = useNavigate();

	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState('');
	const [toastType, setToastType] = useState<'success' | 'error'>('success');

	const getUser = async () => {
		const userId = localStorage.getItem('userId');
		if (!userId) return;

		try {
			const response = await api.get(`/user/${userId}`);
			setUser(response.data);
		} catch (error) {
			console.error('Erro ao buscar usuário:', error);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUser((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const saveInfo = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!user.id) return;

		localStorage.setItem('userName', user.name);

		try {
			console.log({
				...user,
				name: user.name,
				email: user.email,
				phone: user.phone,
			});
			await api.put(`/user/${user.id}`, {
				...user,
				name: user.name,
				email: user.email,
				phone: user.phone,
			});
			handleSuccess();
		} catch (error) {
			console.error('Erro ao salvar informações:', error);
			handleError();
		}
	};

	const handleSuccess = () => {
		setToastMessage('Dados salvos com sucesso!');
		setToastType('success');
		setShowToast(true);
		closeToast();
	};

	const handleError = () => {
		setToastMessage('Ocorreu um erro ao salvar.');
		setToastType('error');
		setShowToast(true);
		closeToast();
	};

	const closeToast = () => {
		setTimeout(() => {
			setShowToast(false);
			if (toastType !== 'error') navigate('/user/info');
		}, 1300);
	};

	return (
		<>
			<div className="container">
				<div className="info d-block text-center">
					<div className="avatar_user align-content-center">
						{!user.picture ? (
							getFirstLetter(user.name)
						) : (
							<img
								src={`${import.meta.env.VITE_API_URL}${user.picture}`}
								alt="Avatar"
							/>
						)}
					</div>
				</div>
				<div className="mt-4 d-flex flex-column gap-2 align-items-center">
					<form className="row" onSubmit={saveInfo}>
						<div className="mb-2">
							<div className="input-group mb-2">
								<input
									type="text"
									name="name"
									className="form-control"
									placeholder="Nome"
									value={user.name}
									onChange={handleChange}
								/>
								<div className="input-group-prepend">
									<div className="input-group-text">
										<MdDriveFileRenameOutline />
									</div>
								</div>
							</div>
						</div>
						<div className="mb-2">
							<div className="input-group mb-2">
								<input
									type="email"
									name="email"
									className="form-control"
									placeholder="E-mail"
									value={user.email}
									onChange={handleChange}
								/>
								<div className="input-group-prepend">
									<div className="input-group-text">
										<CiMail />
									</div>
								</div>
							</div>
						</div>
						<div className="mb-3">
							<div className="input-group mb-2">
								<input
									type="tel"
									name="phone"
									className="form-control"
									placeholder="Celular"
									value={user.phone}
									onChange={handleChange}
								/>
								<div className="input-group-prepend">
									<div className="input-group-text">
										<IoPhonePortraitOutline />
									</div>
								</div>
							</div>
						</div>
						<div className="mb-3 d-grid">
							<button type="submit" className="rounded btn btn-primary">
								Salvar
							</button>
						</div>
					</form>
					<Toast type={toastType} message={toastMessage} show={showToast} />
				</div>
			</div>
		</>
	);
}
