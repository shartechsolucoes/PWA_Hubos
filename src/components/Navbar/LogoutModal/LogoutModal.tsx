import { useState } from 'react';
import { useNavigate } from 'react-router';
import { IoIosLogOut } from 'react-icons/io';

import './styles.css';

export default function LogoutModal() {
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();

	function handleLogoutConfirm() {
		localStorage.clear();
		setShowModal(false);
		navigate('/');
	}

	return (
		<>
			<a
				onClick={() => setShowModal(true)}
				style={{ background: 'none', border: 'none' }}
			>
				<IoIosLogOut />
			</a>

			{showModal && (
				<div className="modal-backdrop">
					<div className="modal-content">
						<p>Deseja realmente sair?</p>
						<button onClick={handleLogoutConfirm}>Sim</button>
						<button onClick={() => setShowModal(false)}>Não</button>
					</div>
				</div>
			)}
		</>
	);
}
