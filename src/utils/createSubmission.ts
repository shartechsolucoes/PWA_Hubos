import { OfflineSubmission } from './db';

export function createSubmission(
	data: Partial<OfflineSubmission>
): OfflineSubmission {
	return {
		address: data.address || '',
		neighborhood: data.neighborhood || '',
		city: data.city || '',
		state: data.state || '',
		status: data.status || '',
		observations: data.observations || '',
		qr_code: data.qr_code || '',
		lat: data.lat || 0,
		long: data.long || 0,
		ordersKits: data.ordersKits || [],
		protocolNumber: data.protocolNumber || '',
		photoStartWork: data.photoStartWork || '',
		photoEndWork: data.photoEndWork || '',
	};
}
