import Sidebar from "../../../components/Sidebar/sidebar.tsx";
import Navbar from "../../../components/Navbar/Navbar.tsx";
import "./style.css"
export default function FormOrders() {
	return (
		<>
			<Sidebar/>
<div className="container">
			<ol className="progress" data-steps="4">
				<li className="done">
					<span className="name">QR Code</span>
					<span className="step"><span>1</span></span>
				</li>
				<li className="active">
					<span className="name">Infos</span>
					<span className="step"><span>2</span></span>
				</li>
				<li>
					<span className="name">Foto Inicio</span>
					<span className="step"><span>3</span></span>
				</li>
				<li>
					<span className="name">Foto Fim</span>
					<span className="step"><span>4</span></span>
				</li>
			</ol>

			<div className="mb-3">
				<label htmlFor="email" className="form-label">Email</label>
				<input type="email" className="form-control" id="exampleInputEmail1"
					   aria-describedby="emailHelp"/>
			</div>
			<div className="mb-3">
				<label htmlFor="email" className="form-label">Email</label>
				<input type="email" className="form-control" id="exampleInputEmail1"
					   aria-describedby="emailHelp"/>
			</div>
			<div className="mb-3">
				<label htmlFor="email" className="form-label">Email</label>
				<input type="email" className="form-control" id="exampleInputEmail1"
					   aria-describedby="emailHelp"/>
			</div>
</div>
			<Navbar/>
		</>
	);
}
