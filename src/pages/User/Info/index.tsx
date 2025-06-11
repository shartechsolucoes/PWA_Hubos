import './style.css';
import { BsPinMap } from 'react-icons/bs';
import { IoPhonePortraitOutline } from 'react-icons/io5';
import { CiMail } from 'react-icons/ci';
import { useEffect, useState } from 'react';
import { api } from '../../../utils/api.ts';
import LogoutModal from './LogoutModal/LogoutModal.tsx';

export default function InfoUser() {
	const [user, setUser] = useState({
		name: '',
		email: '',
		phone: '',
		address: '',
		city: '',
		neighborhood: '',
		state: '',
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

	return (
		<>
			<div className="container mt-5 profile-container ">
				<div className="info d-block text-center">
					<div className="avatar_user align-content-center">
						<img src={`${import.meta.env.VITE_API_URL}${user.picture}`} />
						{/* <div className="edit">
							<Link to="/user/form">
								<BsFillPencilFill />
							</Link>
						</div> */}
					</div>

					<h2 className="user-name">{user.name}</h2>
				</div>
				<div className="row d-block text-center info-block">
					<div className="col-4"></div>
					<div className="mt-3">
						<CiMail />
						<p>{user.email}</p>
					</div>
					<div className="mt-3">
						<IoPhonePortraitOutline />
						<p>{user.phone}</p>
					</div>
					<div className="mt-3">
						<BsPinMap />
						<p>{user.address + ' ' + user.neighborhood}</p>
						<p>{user.city + ' ' + user.state}</p>
					</div>
					<div className="mt-3">
						<LogoutModal />
					</div>
				</div>
			</div>
		</>
	);
}
