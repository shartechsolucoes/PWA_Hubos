import Sidebar from '../../../components/Sidebar/sidebar.tsx';
import Navbar from '../../../components/Navbar/Navbar.tsx';
import './style.css';
import { BsFillPencilFill, BsPinMap } from 'react-icons/bs';
import { IoPhonePortraitOutline } from 'react-icons/io5';
import { CiMail } from 'react-icons/ci';
import { useEffect, useState } from 'react';
import { api } from '../../../utils/api.ts';

export default function InfoUser() {
	const [user, setUser] = useState({
		name: '',
		email: '',
		phone: '',
		address: '',
		city: '',
		neighborhood: '',
		state: '',
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
			<Sidebar />
			<div className="container mt-5">
				<div className="info d-block text-center">
					<div className="avatar_user align-content-center">
						<img src="https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png" />
						<div className="edit">
							<a href="/User/Form" className="">
								<BsFillPencilFill />
							</a>
						</div>
					</div>

					<h2>{user.name}</h2>
				</div>
				<div className="row d-block text-center">
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
				</div>
			</div>
			<Navbar />
		</>
	);
}
