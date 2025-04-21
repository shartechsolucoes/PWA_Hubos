import Sidebar from "../../../components/Sidebar/sidebar.tsx";
import Navbar from "../../../components/Navbar/Navbar.tsx";

export default function FormUser() {
	return (
		<>

			<div className="row">
				<Sidebar/>
				<div className="d-flex align-content-center">
					<a href='' className=""><span className="badge text-bg-secondary">Infos</span></a>
					<a href='' className=""><span className="badge text-bg-secondary">Senha</span></a>
				</div>
				<form>

					<div className="mb-3">
						<label htmlFor="nome" className="form-label">Nome</label>
						<input type="text" className="form-control" id="exampleInputEmail1"  aria-describedby="email"/>
					</div>

					<div className="mb-3">
						<label htmlFor="email" className="form-label">Email</label>
						<input type="email" className="form-control" id="exampleInputEmail1"
							   aria-describedby="emailHelp"/>
						<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
					</div>

					<button type="submit" className="btn btn-primary">Submit</button>
				</form>

				<Navbar/>
			</div>
		</>
	);
}
