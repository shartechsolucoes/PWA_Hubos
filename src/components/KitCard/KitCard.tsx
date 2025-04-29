import { useEffect } from 'react';
import { KitMaterialType } from '../../pages/Orders/Info/types';

import './style.css';

export default function KitCard({
	description,
	materials,
	quantity,
}: {
	description: string;
	materials: KitMaterialType[];
	quantity: number;
}) {
	useEffect(() => {
		console.log(materials);
	}, {});
	return (
		<div className="cardKit d-flex kitItem gap-3 box-shadow">
			<div className="kitQTD">
				<h1>{quantity}</h1>
			</div>
			<div className="kitInfo">
				<p className="title">{description}</p>
				<p>
					{materials.length > 0 &&
						materials.map(
							(material, index) =>
								`${material.material.description ?? ''} ${
									index > materials.length ? '|' : ''
								} `
						)}{' '}
				</p>
			</div>
		</div>
	);
}
