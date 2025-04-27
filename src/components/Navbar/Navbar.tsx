import 'bootstrap/dist/css/bootstrap.min.css';
import {IoIosLogOut, IoMdAdd} from "react-icons/io";
import {GoHome} from "react-icons/go";
import {CiCircleList, CiUser} from "react-icons/ci";
import "./style.css";

export default function Navbar() {
	return (
		<>
			<div className="container m-0 ">
				<div className="navbar d-block">
					<div className="row ">
						<div className='w-25 item text-center'>
							<a href="../dashboard"><GoHome /></a>
						</div>
						<div className='col-2 item text-center'>
							<a href="../orders"><CiCircleList /></a>
						</div>
						<div className='col-2 item text-center'>
						<div className='add'>
							<a href="../orders/form"><IoMdAdd /></a>
						</div>
						</div>
						<div className='col-2 item text-center'>
							<a href="../user/info"><CiUser /></a>
						</div>
						<div className='col-3 item text-center'>
							<a href="../"><IoIosLogOut /> </a>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
