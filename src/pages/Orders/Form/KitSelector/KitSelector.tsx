import React, { useState } from 'react';

type Material = {
	id: number;
	description: string;
	group: string;
	unit: string | null;
	active: boolean;
	status: boolean | null;
};

type KitMaterial = {
	quantity: string;
	material: Material;
};

type Kit = {
	id: number;
	description: string;
	active: boolean;
	status: boolean;
	materials: KitMaterial[];
};

type SelectedKit = {
	id: number;
	description: string;
	quantity: number;
	materials: KitMaterial[];
};

type Props = {
	kits: Kit[];
	// onSelect: (selectedKits: SelectedKit[]) => void;
};

const KitSelector: React.FC<Props> = ({ kits }) => {
	const [selectedKits, setSelectedKits] = useState<SelectedKit[]>([]);
	const [expandedKits, setExpandedKits] = useState<number[]>([]);

	const handleKitToggle = (kit: Kit) => {
		const isAlreadySelected = selectedKits.some((k) => k.id === kit.id);

		const updated = isAlreadySelected
			? selectedKits.filter((k) => k.id !== kit.id)
			: [...selectedKits, { ...kit, quantity: 1 }];

		setSelectedKits(updated);
		console.log(updated);
	};

	const handleQuantityChange = (kitId: number, newQuantity: number) => {
		setSelectedKits((prev) =>
			prev.map((kit) =>
				kit.id === kitId ? { ...kit, quantity: newQuantity } : kit
			)
		);
	};

	const toggleExpand = (kitId: number) => {
		setExpandedKits((prev) =>
			prev.includes(kitId)
				? prev.filter((id) => id !== kitId)
				: [...prev, kitId]
		);
	};

	const isSelected = (id: number) => selectedKits.some((kit) => kit.id === id);

	return (
		<div className="kit-selector">
			<h5>Selecione os Kits</h5>
			<ul className="list-group">
				{kits.map((kit) => {
					const selected = isSelected(kit.id);
					const currentQty =
						selectedKits.find((k) => k.id === kit.id)?.quantity ?? 1;

					return (
						<li key={kit.id} className="list-group-item">
							<div className="d-flex justify-content-between align-items-center">
								<div className="form-check">
									<input
										className="form-check-input"
										type="checkbox"
										checked={selected}
										onChange={() => handleKitToggle(kit)}
										id={`kit-${kit.id}`}
									/>
									<label
										className="form-check-label fw-bold"
										htmlFor={`kit-${kit.id}`}
									>
										{kit.description}
									</label>
								</div>

								{selected && (
									<input
										type="text"
										className="form-control form-control-sm w-25 mx-2"
										value={
											selectedKits
												.find((k) => k.id === kit.id)
												?.quantity?.toString() ?? ''
										}
										onChange={(e) => {
											const value = e.target.value;

											// Permite campo vazio
											if (value === '') {
												handleQuantityChange(kit.id, 0); // Temporário
												return;
											}

											// Valida se é número positivo
											const numericValue = parseInt(value);
											if (!isNaN(numericValue) && numericValue >= 0) {
												handleQuantityChange(kit.id, numericValue);
											}
										}}
										inputMode="numeric"
										pattern="[0-9]*"
									/>
								)}

								<button
									type="button"
									className="btn btn-sm btn-outline-secondary"
									onClick={() => toggleExpand(kit.id)}
								>
									{expandedKits.includes(kit.id) ? '−' : '+'}
								</button>
							</div>

							{expandedKits.includes(kit.id) && (
								<ul className="mt-2 list-group">
									{kit.materials.map((km, idx) => (
										<li
											key={idx}
											className="list-group-item list-group-item-light"
										>
											{km.quantity}x {km.material.description}
											{km.material.unit && ` (${km.material.unit})`}
										</li>
									))}
								</ul>
							)}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default KitSelector;
