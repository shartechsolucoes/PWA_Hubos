import Sidebar from '../../../components/Sidebar/sidebar.tsx';
import Navbar from '../../../components/Navbar/Navbar.tsx';
import './style.css';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { CiMail } from 'react-icons/ci';
import { IoPhonePortraitOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { api } from '../../../utils/api.ts';

export default function FormUser() {
	const [user, setUser] = useState({
		name: '',
		email: '',
		phone: '',
		picture: '',
	});

	const getUser = async () => {
		const userId = localStorage.getItem('userId');
		const response = await api.get(`/user/${userId}`);
		setUser(response.data);
	};

	useEffect(() => {
		getUser();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<>
			<Sidebar />
			<div className="container">
				<div className="info d-block text-center">
					<div className="avatar_user align-content-center">
						<img src={`${import.meta.env.VITE_API_URL}${user.picture}`} />
					</div>
				</div>
				<div className="mt-4">
					<form className="row">
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
					</form>
				</div>
			</div>
			<Navbar />
		</>
	);
}
