
export default function Login() {
	return (
		<>
			<div>
				<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDTRElPUy5kIFNqH433qxBzUmnbtDP08-trA&s"/>
			</div>

			Bem Vindo
			<div className="mb-3">
				<label htmlFor="email" className="form-label">Uuários</label>
				<input type="email" className="form-control" id="exampleInputEmail1"
					   aria-describedby="emailHelp"/>
			</div><div className="mb-3">
			<label htmlFor="email" className="form-label">Senha</label>
			<input type="password" className="form-control" id="exampleInputEmail1"
				   aria-describedby="emailHelp"/>
		</div>
			<a className="btn btn-dark" href="../dashboard">Login</a>
		</>
	);
}
