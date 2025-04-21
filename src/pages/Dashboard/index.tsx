import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/sidebar';
import './style.css';

export default function Dashboard() {
	return (
		<>
			<Sidebar/>
			<div className="container">
			<div className="row">

				<div className="col-8">
					<div className="card color-primary h-100">
						<div className="card-body">
							<div className="d-flex align-items-center mb-2">
								<h4 className="mb-0 text-white">23</h4>
							</div>
							<p className="mb-2 text-white">OS</p>
						</div>
					</div>
				</div>
				<div className="col-12 mt-3">
					<div className="card p-2">
						<div className="card-body">
							Maps
						</div>
					</div>
				</div>

			</div>
			</div>
			<Navbar/>
		</>
	);
}
