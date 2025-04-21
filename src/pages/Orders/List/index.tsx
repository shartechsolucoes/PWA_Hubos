import Sidebar from "../../../components/Sidebar/sidebar.tsx";
import Navbar from "../../../components/Navbar/Navbar.tsx";
import {MdAdd} from "react-icons/md";
import './styles.css';

export default function ListOrders() {
	return (
		<>
			<Sidebar/>
	<div className="container">
			<div className="d-flex align-content-end">
				<a className="btn btn-dark " href="orders/form"><MdAdd /></a>
			</div>
			<div className="orders">
				<div className="iten align-content-end">
					<div className="d-flex align-content-end gap-2">
						<div>
							#1020392
						</div>
						<div>10/05/2025</div>
					</div>
					<div>
						Rua Arnaldo Gusi 44 Xaxim Curitiba/PR
					</div>
				</div>

				<div className="iten align-content-end">
					<div className="d-flex align-content-end gap-2">
						<div>
							#1020392
						</div>
						<div>10/05/2025</div>
					</div>
					<div>
						Rua Arnaldo Gusi 44 Xaxim Curitiba/PR
					</div>
				</div>
				<div className="iten align-content-end">
					<div className="d-flex align-content-end gap-2">
						<div>
							#1020392
						</div>
						<div>10/05/2025</div>
					</div>
					<div>
						Rua Arnaldo Gusi 44 Xaxim Curitiba/PR
					</div>
				</div>
				<div className="iten align-content-end">
					<div className="d-flex align-content-end gap-2">
						<div>
							#1020392
						</div>
						<div>10/05/2025</div>
					</div>
					<div>
						Rua Arnaldo Gusi 44 Xaxim Curitiba/PR
					</div>
				</div>
				<div className="iten align-content-end">
					<div className="d-flex align-content-end gap-2">
						<div>
							#1020392
						</div>
						<div>10/05/2025</div>
					</div>
					<div>
						Rua Arnaldo Gusi 44 Xaxim Curitiba/PR
					</div>
				</div>
				<div className="iten align-content-end">
					<div className="d-flex align-content-end gap-2">
						<div>
							#1020392
						</div>
						<div>10/05/2025</div>
					</div>
					<div>
						Rua Arnaldo Gusi 44 Xaxim Curitiba/PR
					</div>
				</div>
				<div className="iten align-content-end">
					<div className="d-flex align-content-end gap-2">
						<div>
							#1020392
						</div>
						<div>10/05/2025</div>
					</div>
					<div>
						Rua Arnaldo Gusi 44 Xaxim Curitiba/PR
					</div>
				</div>
				<div className="iten align-content-end">
					<div className="d-flex align-content-end gap-2">
						<div>
							#1020392
						</div>
						<div>10/05/2025</div>
					</div>
					<div>
						Rua Arnaldo Gusi 44 Xaxim Curitiba/PR
					</div>
				</div>
				<div className="iten align-content-end">
					<div className="d-flex align-content-end gap-2">
						<div>
							#1020392
						</div>
						<div>10/05/2025</div>
					</div>
					<div>
						Rua Arnaldo Gusi 44 Xaxim Curitiba/PR
					</div>
				</div>
				<div className="iten align-content-end">
					<div className="d-flex align-content-end gap-2">
						<div>
							#1020392
						</div>
						<div>10/05/2025</div>
					</div>
					<div>
						Rua Arnaldo Gusi 44 Xaxim Curitiba/PR
					</div>
				</div>
			</div>
	</div>
			<Navbar/>
		</>
	);
}
