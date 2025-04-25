import Sidebar from "../../../components/Sidebar/sidebar.tsx";
import Navbar from "../../../components/Navbar/Navbar.tsx";
import './styles.css';

export default function ReportOrders() {
	return (
		<>
			<Sidebar/>
			<div className="container">
				Numero OS
				Endereço
				OBS:
				foto ini
				Foto Fim

				Protocolo

				Kits
				--Itens do kit
				--qtd de cada item
				--qtd de kits
			</div>
			<Navbar/>
		</>
	);
}
