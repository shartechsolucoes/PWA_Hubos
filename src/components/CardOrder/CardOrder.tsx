import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { BsQrCodeScan } from 'react-icons/bs';
import { Link } from 'react-router';

export default function CardOrder({
	order,
	address,
	id,
}: {
	order: string;
	address: string;
	id: number;
}) {
	return (
		<>
			<Link to={'/orders/info?id=' + id} className="link-no-style">
				<div className="cardOrder mt-2 box-shadow">
					<div className="d-flex align-items-center kitItem gap-2">
						<div className="qrcode">
							<BsQrCodeScan />
						</div>
						<div className="info">
							<p className="title">
								<span>{order}</span>
							</p>
							<p>{address}</p>
						</div>
					</div>
				</div>
			</Link>
		</>
	);
}
