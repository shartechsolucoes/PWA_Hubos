import Sidebar from "../../../components/Sidebar/sidebar.tsx";
import Navbar from "../../../components/Navbar/Navbar.tsx";
import { useState } from "react";
import "./style.css";
import {MdDriveFileRenameOutline} from "react-icons/md";
import {BsQrCodeScan} from "react-icons/bs";

const steps = [
	{
		id: "QRCODE",
		title: "QR Code"
	},
	{
		id: "INFO",
		title: "Informações"
	},
	{
		id: "KITS",
		title: "Selecione o kit usado"
	},
	{
		id: "PHOTOSTART",
		title: "Tire uma foto do antes"
	},
	{
		id: "PHOTOEND",
		title: "Tire uma foto do serviço Finalizado"
	}
];

export default function FormOrders() {
	const [currentStep, setCurrentStep] = useState(0);
	const [loading, setLoading] = useState(false);
	const [formValues] = useState({
		qrcode: "",
		protocol: "",
		phone: "",
		city: "",
		street: "",
		street_number: "",
		card_number: "",
		card_name: "",
		card_validity: ""
	});

	function handleNext() {
		setCurrentStep((prevState) => prevState + 1);
	}

	async function handleSubmit(e: { preventDefault: () => void; }) {
		e.preventDefault();

		console.log("Form sent...", formValues);

		setLoading(true);

	}
	return (
		<>
			<Sidebar/>
			<div className="container">
				<div className="App">

					<p className="step-guide">
						{currentStep + 1} de {steps.length}
					</p>

					<form className="steps-form" onSubmit={handleSubmit}>
						<div className="fields-container">
							<p>{steps[currentStep].title}</p>

							{steps[currentStep].id === "QRCODE" && (
								<div className="fields row">
									<div className="codeRead"></div>
									<div className="col-12">
									<div className="input-group mt-2">
										<input
											type="text"
											className="form-control"
											id="password"
											placeholder="Nome"
										/>
										<div className="input-group-prepend">
											<div className="input-group-text"><BsQrCodeScan /></div>
										</div>
									</div>
									</div>
								</div>
							)}

							{steps[currentStep].id === "INFO" && (
								<div className="fields row">
									<div className="col-12">
										<p>#1230002</p>
									</div>
									<div className="col-12">
									<div className="input-group mt-2">
										<input
											type="text"
											className="form-control"
											id="protocol"
											placeholder="N° Protocolo"
										/>
										<div className="input-group-prepend">
											<div className="input-group-text"><MdDriveFileRenameOutline />
											</div>
										</div>
									</div>
									</div>
									<div className="col-12">
									<div className="input-group mt-2">
										<input
											type="text"
											className="form-control"
											id="adress"
											placeholder="Endereço"
										/>
										<div className="input-group-prepend">
											<div className="input-group-text"><MdDriveFileRenameOutline />
											</div>
										</div>
									</div>
									</div>
									<div className="col-12">
									<div className="input-group mt-2">
										<input
											type="text"
											className="form-control"
											id="adress"
											placeholder="Bairro"
										/>
										<div className="input-group-prepend">
											<div className="input-group-text"><MdDriveFileRenameOutline />
											</div>
										</div>
									</div>
									</div>
									<div className="col-8">
										<div className="input-group mt-2">
											<input
												type="text"
												className="form-control"
												id="adress"
												placeholder="Cidade"
											/>
											<div className="input-group-prepend">
												<div className="input-group-text"><MdDriveFileRenameOutline />
												</div>
											</div>
										</div>
									</div>
									<div className="col-4">
										<div className="input-group mt-2">
											<input
												type="text"
												className="form-control"
												id="adress"
												placeholder="UF"
											/>
											<div className="input-group-prepend">
												<div className="input-group-text"><MdDriveFileRenameOutline />
												</div>
											</div>
										</div>
									</div>
									<div className="col-12">
										<div className="input-group mt-2">
											<textarea className="form-control" id="exampleFormControlTextarea1"></textarea>

										</div>
									</div>
								</div>
							)}

							{steps[currentStep].id === "KITS" && (
								<div className="fields row">
									<div className="col-12">
										<div className="input-group mt-2">
											<input
												type="text"
												className="form-control"
												id="adress"
												placeholder="Selecione o Kit"
											/>
											<div className="input-group-prepend">
												<div className="input-group-text"><MdDriveFileRenameOutline />
												</div>
											</div>
										</div>
									</div>
								</div>
							)}

							{steps[currentStep].id === "PHOTOSTART" && (
								<div className="fields row">
									<div className="codeRead"></div>
								</div>
							)}

							{steps[currentStep].id === "PHOTOEND" && (
								<div className="fields row">
									<div className="codeRead"></div>
								</div>
							)}

							{currentStep < steps.length - 1 && (
								<button className="mt-3 btn btn-dark next" type="button" onClick={handleNext}>
									Next
								</button>
							)}

							{currentStep === steps.length - 1 && (
								<button className="mt-3 btn btn-dark submit" type="submit">
									Enviar
								</button>
							)}

							{loading && <h1 className="loader">Enviando...</h1>}
						</div>
					</form>
				</div>
			</div>
			<Navbar/>
		</>
	);
}
