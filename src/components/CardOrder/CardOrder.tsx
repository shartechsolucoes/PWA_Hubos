import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import {BsQrCodeScan} from "react-icons/bs";

export default function CardOrder() {
	return (
		<>
			<div className="cardOrder mt-2">
				<div className="d-flex kitItem gap-2">
					<div className="qrcode">
						<BsQrCodeScan />
					</div>
					<div className="info">
						<p className="title"><a href="orders/info">KIT 60W</a></p>
						<p>Rua Arnaldo Gusi 44, Xaxim Curitiba/PR</p>
					</div>
				</div>
			</div>
		</>
	);
}
