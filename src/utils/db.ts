import Dexie, { Table } from 'dexie';

export interface OfflineSubmission {
	id?: string; // pode usar `protocolNumber` ou gerar um UUID
	address: string;
	neighborhood: string;
	city: string;
	state: string;
	status: string;
	observations: string;
	qr_code: string;
	lat: number;
	long: number;
	ordersKits: { kitId: string; quantity: number }[];
	protocolNumber: string;
	photoStartWork: string;
	photoEndWork: string;
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
