import React, { useEffect, useState } from 'react';
import { MdDriveFileRenameOutline } from 'react-icons/md';

interface FormData {
	protocol: string;
	address: string;
	neighborhood: string;
	city: string;
	state: string;
	country: string;
}

interface Props {
	onChange: (data: FormData) => void;
	value?: FormData; // <-- nova prop opcional para valores iniciais
}

const MyFormComponent: React.FC<Props> = ({ onChange, value }) => {
	const [formData, setFormData] = useState<FormData>(
		value || {
			protocol: '',
			address: '',
			neighborhood: '',
			city: '',
			state: '',
			country: '',
		}
	);

	// Atualiza o estado local caso o valor externo mude
	useEffect(() => {
		if (value) {
			setFormData(value);
		}
	}, [value]);

	useEffect(() => {
		const fetchLocationData = async () => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					async (position) => {
						const { latitude, longitude } = position.coords;
						const apiKey = 'AIzaSyCLYeK1ksPfWhPxgZZ687Vdi-eDFLFRCr0';

						try {
							const response = await fetch(
								`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
							);
							const data = await response.json();

							if (data.status === 'OK') {
								const addressComponents = data.results[0].address_components;
								const newFormData: FormData = {
									...formData,
									address:
										addressComponents.find((c: any) =>
											c.types.includes('route')
										)?.long_name || '',
									neighborhood:
										addressComponents.find((c: any) =>
											c.types.includes('sublocality')
										)?.long_name || '',
									city:
										addressComponents.find((c: any) =>
											c.types.includes('administrative_area_level_2')
										)?.long_name || '',
									state:
										addressComponents.find((c: any) =>
											c.types.includes('administrative_area_level_1')
										)?.short_name || '',
									country:
										addressComponents.find((c: any) =>
											c.types.includes('country')
										)?.long_name || '',
								};
								setFormData(newFormData);
								onChange(newFormData);
							} else {
								console.error('Erro ao obter dados de localização');
							}
						} catch (error) {
							console.error(
								'Erro na requisição à API de Geocodificação:',
								error
							);
						}
					},
					(error) => {
						console.error('Erro ao obter localização:', error);
					}
				);
			} else {
				console.error('Geolocalização não é suportada neste navegador');
			}
		};

		fetchLocationData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const updateField = (field: keyof FormData, value: string) => {
		const updated = { ...formData, [field]: value };
		setFormData(updated);
		onChange(updated);
	};

	return (
		<div className="fields row">
			<div className="col-12">
				<p>#{formData.protocol}</p>
			</div>
			{(
				[
					'protocol',
					'address',
					'neighborhood',
					'city',
					'state',
					'country',
				] as (keyof FormData)[]
			).map((field) => (
				<div
					className={`col-${
						field === 'state' ? '4' : field === 'city' ? '8' : '12'
					}`}
					key={field}
				>
					<div className="input-group mt-2">
						<input
							type="text"
							className="form-control"
							id={field}
							placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
							value={formData[field]}
							onChange={(e) => updateField(field, e.target.value)}
						/>
						<div className="input-group-prepend">
							<div className="input-group-text">
								<MdDriveFileRenameOutline />
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default MyFormComponent;
