import 'bootstrap/dist/css/bootstrap.min.css';
import { IoMdAdd } from 'react-icons/io';
import { GoHome } from 'react-icons/go';
import { CiCircleList, CiUser } from 'react-icons/ci';
import './style.css';
import { Link } from 'react-router';

export default function Navbar() {
	return (
		<>
			<div className="container m-0 ">
				<div className="navbar d-block">
					<div className="row ">
						<div className="w-25 item text-center">
							<Link to="/dashboard">
								<GoHome />
							</Link>
						</div>
						<div className="col-2 item text-center">
							<Link to="/orders">
								<CiCircleList />
							</Link>
						</div>
						<div className="col-2 item text-center">
							<div className="add">
								<Link to="/orders/form">
									<IoMdAdd />
								</Link>
							</div>
						</div>
						<div className="col-2 item text-center">
							<Link to="/protocols">
								<CiUser />
							</Link>
						</div>
						<div className="col-3 item text-center">
							<Link to="/user/info">
								<CiUser />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
