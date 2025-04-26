import Sidebar from "../../../components/Sidebar/sidebar.tsx";
import Navbar from "../../../components/Navbar/Navbar.tsx";
import {MdOutlineAdd} from "react-icons/md";
import './styles.css';
import CardOrder from "../../../components/CardOrder/CardOrder.tsx";

export default function ListOrders() {
	return (
		<>
			<Sidebar/>
			<div className="container">
				<div className="d-flex align-content-end">
					<input placeholder="Pesquisar OS" className="form-control"/>
					<a className="btn btn-primary mx-2" href="orders/form"><MdOutlineAdd />
					</a>
				</div>
				<CardOrder/>
				<CardOrder/>
				<CardOrder/>
				<CardOrder/>
				<CardOrder/>
				<CardOrder/>
				<CardOrder/>
			</div>
			<Navbar/>
		</>
	);
}
