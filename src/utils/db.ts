import Dexie, { Table } from 'dexie';

export interface OfflineSubmission {
	id?: string; // pode usar `protocolNumber` ou gerar um UUID
	address: string;
	neighborhood: string;
	city: string;
	state: string;
	observations: string;
	qr_code: string;
	lat: string;
	long: string;
	ordersKits: { kit_id: number; quantity: string }[];
	protocolNumber: string;
	photoStartWork: string;
	photoEndWork: string;
	status: number;
	userId: string;
}

class AppDB extends Dexie {
	submissions!: Table<OfflineSubmission, string>;

	constructor() {
		super('FieldAppDB');
		this.version(1).stores({
			submissions: 'qr_code', // chave primária
		});
	}
}

export const db = new AppDB();
