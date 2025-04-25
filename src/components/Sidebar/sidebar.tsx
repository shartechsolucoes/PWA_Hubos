import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import {IoIosArrowBack} from "react-icons/io";

export default function Dashboard() {
	const [toggleDropdown, setToggleDropdown] = useState(false);
	return (
			<div className="sidebar">
				<div className="row">
					<div className="col-2">
						<IoIosArrowBack />
					</div>
					<div className="col-8 text-center">
						<h2 className="mt-1">Dashboard</h2>
					</div>
					<div className="col-2">
						<a
						className="nav-link dropdown-toggle hide-arrow "
						data-bs-toggle="dropdown"
						onClick={() => setToggleDropdown((prev) => !prev)}
					>
						<div
							className="avatar">
							<img src='https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png'/>
						</div>
					</a>
						<ul
							className={`dropdown-menu dropdown-menu-end drop-menu ${
								toggleDropdown && 'show'
							}`}
						>
							<li>
								<div className="dropdown-item">
									<i className="bx bx-power-off me-2"></i>
									<span className="align-middle">name</span>
								</div>
							</li>
							<li>
								<div className="dropdown-divider"></div>
							</li>
							<li>
								<a className="dropdown-item">
									<i className="bx bx-power-off me-2"></i>
									<span className="align-middle">Sair</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>

	);
}
