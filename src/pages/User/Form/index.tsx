import Sidebar from "../../../components/Sidebar/sidebar.tsx";
import Navbar from "../../../components/Navbar/Navbar.tsx";
import "./style.css"
import {MdDriveFileRenameOutline} from "react-icons/md";
import {CiMail} from "react-icons/ci";
import {IoPhonePortraitOutline} from "react-icons/io5";

export default function FormUser() {
	return (
		<>
			<Sidebar/>
			<div className="container">
				<div className="info d-block text-center">
					<div className="avatar_user align-content-center">
						<img src='https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png'/>

					</div>
				</div>
				<div className="mt-4">
					<form className="row">
						<div className="mb-2">
							<div className="input-group mb-2">
								<input
									type="password"
									className="form-control"
									id="password"
									placeholder="Nome"
								/>
								<div className="input-group-prepend">
									<div className="input-group-text"><MdDriveFileRenameOutline />
									</div>
								</div>
							</div>
						</div>
						<div className="mb-2">
							<div className="input-group mb-2">
								<input
									type="password"
									className="form-control"
									id="password"
									placeholder="E-mail"
								/>
								<div className="input-group-prepend">
									<div className="input-group-text"><CiMail />

									</div>
								</div>
							</div>
						</div>
						<div className="mb-3">
							<div className="input-group mb-2">
								<input
									type="password"
									className="form-control"
									id="password"
									placeholder="Celular"
								/>
								<div className="input-group-prepend">
									<div className="input-group-text"><IoPhonePortraitOutline />

									</div>
								</div>
							</div>
						</div>
					</form>

				</div>
			</div>
			<Navbar/>
		</>
	);
}
