import { format } from 'date-fns';
import { BsQrCodeScan } from 'react-icons/bs';
import KitCard from '../../../../components/KitCard/KitCard';
import styles from './Resume.module.css';

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
		ordersKits?: any[];
	};
	kits: any;
};

export default function Resume({ data, kits }: ResumeProps) {
	if (!data) return null;

	return (
		<div className={styles.container}>
			<div className={styles.contentWrapper}>
				<div className={styles.qrSection}>
					<div className={styles.qrcodeWrapper}>
						<BsQrCodeScan size={32} />
					</div>
					<div>
						<h5 className={styles.qrCodeText}>{data.qr_code}</h5>
						<p className={styles.dateText}>
							{format(new Date(), 'dd/MM/yyyy')}
						</p>
					</div>
				</div>
				<div className={styles.addressBlock}>
					<p className={styles.addressText}>
						{`${data.address}, ${data.neighborhood}, ${data.city} - ${data.state}`}
					</p>
				</div>
				<div className={styles.protocolBlock}>
					<p>
						<strong>N° Protocolo:</strong> {data.protocolNumber || '—'}
					</p>
					<p>
						<strong>OBS:</strong> {data.observations || '—'}
					</p>
				</div>
				<div className={styles.kitsTitleBlock}>
					<p className={styles.kitsTitle}>Kits</p>
				</div>
				<div className={styles.kitsList}>
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
						<p className={styles.noKitText}>Nenhum kit cadastrado.</p>
					)}
				</div>
			</div>
		</div>
	);
}
