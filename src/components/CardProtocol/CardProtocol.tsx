import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { BsQrCodeScan } from 'react-icons/bs';
import { Link } from 'react-router';
import { FaPlus } from 'react-icons/fa';

export default function CardProtocol({
	protocol,
	address,
	id,
	userId,
}: {
	protocol: string;
	address: string;
	userId?: string;
	id: number;
}) {
	return (
		<>
			<Link to={'/protocol/info?id=' + id} className="link-no-style">
				<div className="cardOrder mt-2">
					<div className="d-flex align-items-center kitItem gap-2">
						<div className="qrcode">
							{!userId ? <FaPlus /> : <BsQrCodeScan />}
						</div>
						<div className="info">
							<p className="title">
								<span>{protocol}</span>
							</p>
							<p>{address}</p>
						</div>
					</div>
				</div>
			</Link>
		</>
	);
}
