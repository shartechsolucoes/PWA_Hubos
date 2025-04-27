import { useState } from 'react';

import { FaRegUser } from 'react-icons/fa';
import { PiPasswordBold } from 'react-icons/pi';
import './login.css';
import { api } from '../../utils/api';
import { useNavigate } from 'react-router';

export default function Login() {
	const navigate = useNavigate();
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [erro, setErro] = useState('');
	const [carregando, setCarregando] = useState(false);

	const handleLogin = async (e) => {
		e.preventDefault();
		setCarregando(true);
		setErro('');

		console.log(login, password);

		try {
			const response = await api.post('/login', {
				login,
				password,
			});

			const { token, access_level, userName, userId } = response.data;

			// Armazena token localmente
			localStorage.setItem('token', token);
			localStorage.setItem('accessLevel', access_level);
			localStorage.setItem('userName', userName);
			localStorage.setItem('userId', userId);
			if (response.data.picture) {
				localStorage.setItem('userAvatar', response.data.picture);
			}

			// Redireciona para dashboard
			navigate('/dashboard');
		} catch (err: any) {
			if (err.response && err.response.status === 401) {
				setErro('Usuário ou password incorretos.');
			} else {
				setErro('Erro ao conectar. Tente novamente mais tarde.');
			}
		} finally {
			setCarregando(false);
		}
	};

	return (
		<div className="login">
			<div className="mt-2 mb-4 text-center">
				<img
					src="/public/logo_new.png"
					className="logo justify-content-center m-auto"
					alt="Logo"
				/>
			</div>

			<h4 className="mb-4 text-center">Bem vindo!</h4>

			<form className="w-100" onSubmit={handleLogin}>
				<div className="col-auto">
					<div className="input-group mb-2">
						<input
							type="text"
							className="form-control"
							placeholder="Usuário"
							value={login}
							onChange={(e) => setLogin(e.target.value)}
							required
						/>
						<div className="input-group-prepend">
							<div className="input-group-text">
								<FaRegUser />
							</div>
						</div>
					</div>
				</div>

				<div className="mb-3">
					<div className="input-group mb-2">
						<input
							type="password"
							className="form-control"
							placeholder="Sua password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<div className="input-group-prepend">
							<div className="input-group-text">
								<PiPasswordBold />
							</div>
						</div>
					</div>
					{erro && <div className="msg-error text-danger">{erro}</div>}
				</div>

				<div className="mb-3 d-flex w-100 justify-content-between align-items-center">
					<button
						type="submit"
						className="btn btn-primary d-grid w-100"
						disabled={carregando}
					>
						{carregando ? 'Entrando...' : 'Entrar'}
					</button>
				</div>

				<div>
					<p className="dev">
						Desenvolvido por&nbsp;
						<a href="https://www.shartech.com.br">Shartech</a>
					</p>
				</div>
			</form>
		</div>
	);
}
