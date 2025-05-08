import { OfflineSubmission } from './db';

export function createSubmission(
	data: Partial<OfflineSubmission>
): OfflineSubmission {
	return {
		address: data.address || '',
		neighborhood: data.neighborhood || '',
		city: data.city || '',
		state: data.state || '',
		status: data.status || 1,
		observations: data.observations || '',
		qr_code: data.qr_code || '',
		lat: `${data.lat}` || '',
		long: `${data.long}` || '',
		ordersKits: data.ordersKits || [],
		protocolNumber: data.protocolNumber || '',
		photoStartWork: data.photoStartWork || '',
		photoEndWork: data.photoEndWork || '',
		userId: data.userId || '',
	};
}
