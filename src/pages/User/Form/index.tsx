import Sidebar from "../../../components/Sidebar/sidebar.tsx";
import Navbar from "../../../components/Navbar/Navbar.tsx";
import "./style.css"

export default function FormUser() {
	return (
		<>
			<div className="container">
				<div className="row">
					<Sidebar/>
					<div className="d-flex align-content-center">
						<a href='' className=""><span className="badge text-bg-secondary">Infos</span></a>
						<a href='' className=""><span className="badge text-bg-secondary">Senha</span></a>
					</div>
					<form className="row">
						<div className="mb-3 col-md-12">
							<label className="form-label">Nome</label>
							<input type="text" className="form-control" id="name"/>
						</div>
						<div className="mb-3 col-md-12">
							<label className="form-label">E-mail</label>
							<input type="text" className="form-control" id="name"/>
						</div>
						<div className="mb-3 col-md-12">
							<label className="form-label">Telefone</label>
							<input type="text" className="form-control" id="phone"/>
						</div>

						<button type="submit" className="btn btn-primary">Salvar</button>
					</form>

				</div>
			</div>
			<Navbar/>
		</>
	);
}
