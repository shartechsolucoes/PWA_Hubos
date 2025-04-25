import 'bootstrap/dist/css/bootstrap.min.css';
import {MdDocumentScanner, MdHome, MdOutlineAccountCircle} from "react-icons/md";

import "./style.css";

export default function Navbar() {
	return (
		<>
			<div className="navbar w-auto">
				<div className="row">
					<div className='col-4 item'><a href="../dashboard"><MdHome /></a></div>
					<div className='col-4 item'><a href="../orders"><MdDocumentScanner/></a></div>
					<div className='col-4 item'><a href="../user"><MdOutlineAccountCircle /></a></div>
					<div className='col-4 item'><a href="../">login</a></div>
				</div>
			</div>
		</>
	);
}
