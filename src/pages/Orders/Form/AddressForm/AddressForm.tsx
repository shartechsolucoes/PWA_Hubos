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

const MyFormComponent: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		protocol: '',
		address: '',
		neighborhood: '',
		city: '',
		state: '',
		country: '',
	});

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
									protocol: formData.protocol,
									address:
										addressComponents.find((component: any) =>
											component.types.includes('route')
										)?.long_name || '',
									neighborhood:
										addressComponents.find((component: any) =>
											component.types.includes('neighborhood')
										)?.long_name || '',
									city:
										addressComponents.find((component: any) =>
											component.types.includes('locality')
										)?.long_name || '',
									state:
										addressComponents.find((component: any) =>
											component.types.includes('administrative_area_level_1')
										)?.short_name || '',
									country:
										addressComponents.find((component: any) =>
											component.types.includes('country')
										)?.long_name || '',
								};
								setFormData(newFormData);
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
	}, []);

	return (
		<div className="fields row">
			<div className="col-12">
				<p>#{formData.protocol}</p>
			</div>
			<div className="col-12">
				<div className="input-group mt-2">
					<input
						type="text"
						className="form-control"
						id="protocol"
						placeholder="N° Protocolo"
						value={formData.protocol}
						onChange={(e) =>
							setFormData({ ...formData, protocol: e.target.value })
						}
					/>
					<div className="input-group-prepend">
						<div className="input-group-text">
							<MdDriveFileRenameOutline />
						</div>
					</div>
				</div>
			</div>
			<div className="col-12">
				<div className="input-group mt-2">
					<input
						type="text"
						className="form-control"
						id="address"
						placeholder="Endereço"
						value={formData.address}
						onChange={(e) =>
							setFormData({ ...formData, address: e.target.value })
						}
					/>
					<div className="input-group-prepend">
						<div className="input-group-text">
							<MdDriveFileRenameOutline />
						</div>
					</div>
				</div>
			</div>
			<div className="col-12">
				<div className="input-group mt-2">
					<input
						type="text"
						className="form-control"
						id="neighborhood"
						placeholder="Bairro"
						value={formData.neighborhood}
						onChange={(e) =>
							setFormData({ ...formData, neighborhood: e.target.value })
						}
					/>
					<div className="input-group-prepend">
						<div className="input-group-text">
							<MdDriveFileRenameOutline />
						</div>
					</div>
				</div>
			</div>
			<div className="col-8">
				<div className="input-group mt-2">
					<input
						type="text"
						className="form-control"
						id="city"
						placeholder="Cidade"
						value={formData.city}
						onChange={(e) => setFormData({ ...formData, city: e.target.value })}
					/>
					<div className="input-group-prepend">
						<div className="input-group-text">
							<MdDriveFileRenameOutline />
						</div>
					</div>
				</div>
			</div>
			<div className="col-4">
				<div className="input-group mt-2">
					<input
						type="text"
						className="form-control"
						id="state"
						placeholder="UF"
						value={formData.state}
						onChange={(e) =>
							setFormData({ ...formData, state: e.target.value })
						}
					/>
					<div className="input-group-prepend">
						<div className="input-group-text">
							<MdDriveFileRenameOutline />
						</div>
					</div>
				</div>
			</div>
			<div className="col-12">
				<div className="input-group mt-2">
					<input
						type="text"
						className="form-control"
						id="country"
						placeholder="País"
						value={formData.country}
						onChange={(e) =>
							setFormData({ ...formData, country: e.target.value })
						}
					/>
					<div className="input-group-prepend">
						<div className="input-group-text">
							<MdDriveFileRenameOutline />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyFormComponent;
