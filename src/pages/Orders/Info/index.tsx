import Sidebar from "../../../components/Sidebar/sidebar.tsx";
import Navbar from "../../../components/Navbar/Navbar.tsx";
import {BsQrCodeScan} from "react-icons/bs";
import "./ordersInfo.css"

export default function InfoOrders() {
	return (
		<>
			<Sidebar/>
			<div className="container">
				<div className="row">

					<div className="d-flex gap-3">
						<div className="qrcode d-flex"><BsQrCodeScan /></div>
						<div className="col-4">
							<h1>10023</h1>
							<p>22 de Abril</p>
						</div>
					</div>

					<div className="col-12">
						<div className="map"></div>
					</div>
					<div className="map-data col-12">
						<p>Rua Arnaldo Gusi 44, Xaxim Curitiba/PR</p>
					</div>

					<div className="col-12">
						<p>N° Protocolo: 226042025020003</p>
						<p>OBS: Troca de Relé</p>
					</div>

					<div className="kits col-12 mt-3">
						<div className="d-flex kitItem gap-3">
							<div className="kitQTD">
								<h1>1</h1>
							</div>
							<div className="kitInfo">
								<p className="title">KIT 60W</p>
								<p>Luminaria led 60w | Braço | Fio </p>
							</div>
						</div>
					</div>

				</div>
			</div>
			<Navbar/>
		</>
	);
}
