import React, { useEffect, useState } from 'react';

import './styles.css';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

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
	kit_id: number;
	quantity: string;
};

type Props = {
	kits: Kit[];
	value?: SelectedKit[];
	onSelect: (selectedKits: SelectedKit[]) => void;
};

const KitSelector: React.FC<Props> = ({ kits, value = [], onSelect }) => {
	const [selectedKits, setSelectedKits] = useState<SelectedKit[]>(value);
	const [expandedKits, setExpandedKits] = useState<number[]>([]);

	useEffect(() => {
		setSelectedKits(value);
	}, [value]);

	useEffect(() => {
		onSelect(selectedKits);
	}, [selectedKits]);

	const handleKitToggle = (kit: Kit) => {
		const isAlreadySelected = selectedKits.some((k) => k.kit_id === kit.id);

		const updated = isAlreadySelected
			? selectedKits.filter((k) => k.kit_id !== kit.id)
			: [...selectedKits, { kit_id: kit.id, quantity: '1' }];

		setSelectedKits(updated);
	};

	const handleQuantityChange = (kitId: number, newQuantity: string) => {
		setSelectedKits((prev) =>
			prev.map((kit) =>
				kit.kit_id === kitId ? { ...kit, quantity: newQuantity } : kit
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

	const isSelected = (id: number) =>
		selectedKits.some((kit) => kit.kit_id === id);

	return (
		<div className="kit-selector">
			<h5>Selecione os Kits</h5>
			<ul className="list-group">
				{kits.map((kit) => {
					const selected = isSelected(kit.id);

					return (
						<li key={kit.id} className="list-group-item">
							<div className="d-flex justify-content-between align-items-center kit-title">
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
								<span>
									{selected && (
										<input
											type="text"
											className="input-quantidade mx-2"
											value={
												selectedKits.find((k) => k.kit_id === kit.id)
													?.quantity ?? ''
											}
											onChange={(e) => {
												const value = e.target.value;
												if (/^\d*$/.test(value)) {
													handleQuantityChange(kit.id, value);
												}
											}}
											inputMode="numeric"
											pattern="[0-9]*"
										/>
									)}

									<button
										type="button"
										className="btn mt-0 btn-sm  "
										onClick={() => toggleExpand(kit.id)}
									>
										{expandedKits.includes(kit.id) ? (
											<IoIosArrowUp />
										) : (
											<IoIosArrowDown />
										)}
									</button>
								</span>
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
