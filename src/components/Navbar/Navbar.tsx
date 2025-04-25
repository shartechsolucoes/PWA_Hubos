import 'bootstrap/dist/css/bootstrap.min.css';
import {MdOutlineAccountCircle} from "react-icons/md";

import "./style.css";
import {IoMdAdd} from "react-icons/io";
import {GoHome} from "react-icons/go";

export default function Navbar() {
	return (
		<>

			<div className="container m-0 ">
				<div className="navbar d-block">
					<div className="row ">
						<div className='col-4 item text-center'><a href="../dashboard"><GoHome /></a></div>
						<div className='col-4 item text-center'>
						<div className='add'>
							<a href="../orders"><IoMdAdd /></a>
						</div>
						</div>
						<div className='col-4 item text-center'><a href="../user/info"><MdOutlineAccountCircle /></a></div>
					</div>
				</div>
			</div>
		</>
	);
}
