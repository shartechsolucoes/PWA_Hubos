import { format } from 'date-fns';
import { BsQrCodeScan } from 'react-icons/bs';
import KitCard from '../../../../components/KitCard/KitCard';

type ResumeProps = {
	data: {
		id: number;
		qr_code: string;
		registerDay: string;
		address: string;
		neighborhood: string;
		city: string;
		state: string;
		protocolNumber?: string;
		observations?: string;
		lat?: string;
		long?: string;
		ordersKits?: any[]; // ajuste conforme estrutura real
	};
	kits: any;
};

export default function Resume({ data, kits }: ResumeProps) {
	if (!data) return null;

	return (
		<div className="container">
			<div className="row d-flex flex-column gap-3">
				<div className="d-flex gap-3 align-items-center">
					<div className="qrcode d-flex rounded-1 p-2 bg-light">
						<BsQrCodeScan size={32} />
					</div>
					<div>
						<h5 className="mb-1">{data.qr_code}</h5>
						<p className="mb-0 text-muted">
							{format(new Date(), 'dd/MM/yyyy')}
						</p>
					</div>
				</div>
				<div className="map-data col-12">
					<p className="fs-6 text-secondary">
						{`${data.address}, ${data.neighborhood}, ${data.city} - ${data.state}`}
					</p>
				</div>
				<div className="col-12 d-flex flex-column gap-1">
					<p className="fs-6">
						<strong>N° Protocolo:</strong> {data.protocolNumber || '—'}
					</p>
					<p className="fs-6">
						<strong>OBS:</strong> {data.observations || '—'}
					</p>
				</div>
				<div className="col-12 mt-3">
					<p className="fs-6 fw-bold">Kits</p>
				</div>

				<div className="kits col-12 d-flex flex-column gap-2">
					{kits?.length > 0 ? (
						kits
							.filter((kit: any) =>
								data.ordersKits?.some((ok) => ok.kit_id === kit.id)
							)
							.map((kit: any, index: number) => {
								const orderKit = data.ordersKits?.find(
									(ok) => ok.kit_id === kit.id
								);
								return (
									<KitCard
										key={index}
										description={kit.description}
										materials={kit.materials}
										quantity={orderKit?.quantity || 0}
									/>
								);
							})
					) : (
						<p className="text-muted">Nenhum kit cadastrado.</p>
					)}
				</div>
			</div>
		</div>
	);
}
