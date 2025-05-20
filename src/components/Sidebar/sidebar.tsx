import { useEffect, useMemo, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { IoIosArrowBack } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router';
import { getFirstLetter } from '../../utils/getFirstLetter';

export default function Dashboard() {
	// const [toggleDropdown, setToggleDropdown] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	const [user, setUser] = useState({ name: '', avatar: '' });

	const pageTitle = useMemo(() => {
		switch (location.pathname) {
			case '/dashboard':
				return 'Dashboard';
			case '/orders':
				return 'Ordens de serviço';
			case '/orders/form':
				return 'Nova OS';
			case '/user/info':
				return 'Informações';
			default:
				return 'Página';
		}
	}, [location.pathname]);

	useEffect(() => {
		setUser({
			name: localStorage.getItem('userName') || '',
			avatar: localStorage.getItem('userAvatar') || '',
		});
	}, []);
	return (
		<div className="sidebar box-shadow">
			<div className="row">
				<a onClick={() => navigate(-1)} className="col-2 return-button">
					<IoIosArrowBack />
				</a>
				<div className="col-8 text-center">
					<h2 className="mt-1">{pageTitle}</h2>
				</div>
				<div className="col-2 ">
					<a
						className="nav-link dropdown-toggle hide-arrow "
						data-bs-toggle="dropdown"
						// onClick={() => setToggleDropdown((prev) => !prev)}
					>
						<div className="avatar">
							{!user.avatar ? (
								getFirstLetter(user.name)
							) : (
								<img src={`${import.meta.env.VITE_API_URL}${user.avatar}`} />
							)}
						</div>
					</a>
					{/* <ul
						className={`dropdown-menu dropdown-menu-end drop-menu ${
							toggleDropdown && 'show'
						}`}
					>
						<li>
							<Link to="/user/info" className="dropdown-item">
								<i className="bx bx-power-off me-2"></i>
								<span className="align-middle">{user.name}</span>
							</Link>
						</li>
						<li>
							<div className="dropdown-divider"></div>
						</li>
						<li>
							<a className="dropdown-item">
								<i className="bx bx-power-off me-2"></i>
								<span className="align-middle">Sair</span>
							</a>
						</li>
					</ul> */}
				</div>
			</div>
		</div>
	);
}
