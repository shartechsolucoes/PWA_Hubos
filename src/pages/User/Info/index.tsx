import Sidebar from "../../../components/Sidebar/sidebar.tsx";
import Navbar from "../../../components/Navbar/Navbar.tsx";
import "./style.css"

export default function InfoUser() {
	return (
		<>
			<Sidebar/>
			<div className="container">
				<div className="row d-block">

					<div className="d-flex align-content-center">
					<div
						className="avatar_user">
						<img src='https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png'/>
					</div>
					</div>
					<div className="d-flex align-content-center">
						<a href='/User/Form' className=""><span className="badge text-bg-secondary">Editar</span></a>
					</div>
					<div className="">
					<p><strong>Nome: </strong>Edson Rodrigues</p>
					<p><strong>Email: </strong>edson@shartech.com.br</p>
					<p><strong>Telefone: </strong>(41) 99541-9995</p>
					<p><strong>Endereço: </strong>Rua Arnaldo Gusi 44</p>
					<p><strong>Bairro: </strong>Xaxim</p>
					<p><strong>Cidade: </strong>Curitiba PR</p>
					</div>


				</div>
			</div>
			<Navbar/>
		</>
	);
}
