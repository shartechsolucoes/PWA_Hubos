import "./login.css"
import {FaRegUser} from "react-icons/fa";
import {PiPasswordBold} from "react-icons/pi";
export default function Login() {
	return (
		<div className="login">

							<div className="mt-2 mb-4 text-center">
								<img
									src="/public/logo_new.png"
									className="logo justify-content-center m-auto"
								/>
							</div>
							<h4 className="mb-4 text-center">Bem vindo!</h4>
			<form className="w-100">
				<div className="col-auto">
					<div className="input-group mb-2">
						<input type="text" className="form-control" id="inlineFormInputGroup" placeholder="Usuário"/>
						<div className="input-group-prepend">
							<div className="input-group-text"><FaRegUser />
							</div>
						</div>
					</div>
				</div>
				<div className="mb-3">
					<div className="input-group mb-2">
					<input
						type="password"
						className="form-control"
						id="password"
						placeholder="Sua senha"

					/>
					<div className="input-group-prepend">
						<div className="input-group-text"><PiPasswordBold /></div>
					</div>
					</div>
					<div className="msg-error">

					</div>
				</div>
				<div className="mb-3 d-flex w-100 justify-content-between align-items-center">
					<a
						className="btn btn-primary d-grid w-100"
						href="dashboard"
					>
						Entrar
					</a>
				</div>

				<div>
					<p className="dev">Desenvolvido por <a href="https://www.shartech.com.br">Shartech</a></p>
				</div>
			</form>
		</div>
	);
}
