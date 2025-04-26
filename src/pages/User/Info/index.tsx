import Sidebar from "../../../components/Sidebar/sidebar.tsx";
import Navbar from "../../../components/Navbar/Navbar.tsx";
import "./style.css"
import {BsFillPencilFill, BsPinMap} from "react-icons/bs";
import {IoPhonePortraitOutline} from "react-icons/io5";
import {CiMail} from "react-icons/ci";

export default function InfoUser() {
	return (
		<>
			<Sidebar/>
			<div className="container mt-5">

				<div className="info d-block text-center">
					<div className="avatar_user align-content-center">
						<img src='https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png'/>
						<div className="edit"><a href='/User/Form' className=""><BsFillPencilFill /></a></div>
					</div>

					<h2>Edson Rodrigues</h2>
				</div>
				<div className="row d-block text-center">
					<div className="col-4"></div>
					<div className="mt-3">
						<CiMail /><p>edson@shartech.com.br</p>
					</div>
					<div className="mt-3">
						<IoPhonePortraitOutline />
						<p>(41) 99541-9995</p>
					</div>
					<div className="mt-3">
						<BsPinMap /><p>
						Rua Arnaldo Gusi 44, Xaxim</p>
						<p>Curitiba PR</p>
					</div>


				</div>
			</div>
			<Navbar/>
		</>
	);
}
