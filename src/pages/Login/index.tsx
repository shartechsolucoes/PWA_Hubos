import "./styles.css"
export default function Login() {
	return (
		<div className="container">
			<div>
				Geoos
			</div>
			Bem Vindo
			<div className="mb-3">
				<input type="email" className="form-control" id="exampleInputEmail1" placeholder="Usuário"
					   aria-describedby="emailHelp"/>
			</div><div className="mb-3">
			<input type="password" className="form-control" id="exampleInputEmail1" placeholder="Senha"
				   aria-describedby="emailHelp"/>
		</div>
			<a className="btn btn-dark" href="../dashboard">Login</a>
		</div>
	);
}
