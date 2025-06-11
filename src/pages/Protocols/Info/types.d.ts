export type OrderType = {
	id: number;
	address: string;
	userId: string;
	neighborhood: string;
	city: string;
	state: string;
	status: number;
	observations: string;
	lat: string;
	long: string;
	qr_code: number;
	protocolNumber: string;
	active: boolean;
	registerDay: Date;
	duplicated: boolean;
	photoStartWork: string;
	photoEndWork: string;
	ordersKits: Array<{
		kit_id: number;
		quantity: string;
	}>;
};

type MaterialType = {
	id: number;
	description: string;
	group: string;
	unit: string | null;
	active: boolean;
	status: boolean | null;
};

type KitMaterialType = {
	quantity: string;
	material: MaterialType;
};

export type KitType = {
	id: number;
	description: string;
	active: boolean;
	status: boolean;
	materials: KitMaterialType[];
	quantity: number;
};
