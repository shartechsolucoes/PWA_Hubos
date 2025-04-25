import Sidebar from "../../../components/Sidebar/sidebar.tsx";
import Navbar from "../../../components/Navbar/Navbar.tsx";
import "./style.css"
export default function FormOrders() {
	return (
		<>
			<Sidebar/>
			<div className="container">
				<ol className="progress" data-steps="4">
					<li className="done">
						<span className="name">QR Code</span>
						<span className="step"><span>1</span></span>
					</li>
					<li className="active">
						<span className="name">Infos</span>
						<span className="step"><span>2</span></span>
					</li>
					<li>
						<span className="name">Foto Inicio</span>
						<span className="step"><span>3</span></span>
					</li>
					<li>
						<span className="name">Foto Fim</span>
						<span className="step"><span>4</span></span>
					</li>
				</ol>

				<div className="mb-3 col-10 col-md-11">
					<label htmlFor="exampleInputEmail1" className="form-label">
						Número da OS
					</label>
					<input
						type="text"
						className="form-control"
						id="qr_code"

					/>
				</div>
				<div className="mb-3 col-1 col-md-1 align-qr-code">
					<button
						type="button"

						className="align-self-center btn btn-primary"
					>
					</button>
				</div>
				<div className="mb-3 col-6 col-md-6">
					<label htmlFor="exampleInputEmail1" className="form-label">
						Número do Protocolo
					</label>
					<input
						type="text"
						className="form-control"
						id="protocolNumber"

					/>
				</div>
				<div className="mb-3 col-6">
					<label htmlFor="exampleInputEmail1" className="form-label">
						Status
					</label>
					<select
						id="status"
						className="form-control"

					>
						<option value="0">Aberto</option>
						<option value="1">Em trabalho</option>
						<option selected value="2">
							Finalizado
						</option>
					</select>
				</div>

				<div className="mb-3 ">
					<label htmlFor="exampleInputEmail1" className="form-label">
						Endereço
					</label>
					<input
						type="text"
						className="form-control"
						id="address"
					/>
				</div>
				<div className="mb-3 col-6 col-md-5">
					<label htmlFor="exampleInputEmail1" className="form-label">
						Bairro
					</label>
					<input
						type="text"
						className="form-control"
						id="neighborhood"
					/>
				</div>

				<div className="mb-3 col-6 col-md-5">
					<label htmlFor="exampleInputEmail1" className="form-label">
						Município
					</label>
					<input
						type="text"
						className="form-control"
						id="city"
					/>
				</div>

				<div className="mb-3 col-12 col-md-2">
					<label htmlFor="exampleInputEmail1" className="form-label">
						UF
					</label>
					<select
						className="form-control"
						id="state"
					>
						<option value={''} selected disabled>
							Selecione uma UF
						</option>
					</select>
				</div>


				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">
						OBS:
					</label>
					<textarea
						className="form-control"
						id="observations"
						value=''
					/>
				</div>
				<div className="mb-3 d-flex justify-content-between align-items-end gap-5">
							<span className="flex-fill">
								<label htmlFor="exampleInputEmail1" className="form-label">
									Kits
								</label>
								<select
									className="form-select"
									aria-label="Default select example"
									id="kit"

								>
									<option value={''} selected disabled>
										Selecione o(s) Kit(s)
									</option>

								</select>
							</span>
					<button
						type="button"
						className="btn btn-primary"
					>
						+
					</button>
				</div>

				<button
					type="submit"
					className="btn btn-primary"
				>
					Salvar
				</button>
			</div>
			<Navbar/>
		</>
	);
}
