import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

export default function CardOrder() {
	return (
		<>
			<div className="card mt-2">
				<div className="row">

					<div className="col-8">
						<p className='title'>OS</p>
						<p className='text color-primary'><a href="orders/report">10023</a></p>
					</div>
					<div className="col-4">
						<p className='title'>Data</p>
						<p className='text'>22 de Abril</p>
					</div>
					<div className="col-12 mt-1">
						<p className='title'>Endereço</p>
						<p className='text'>Rua Arnaldo Gusi 44, Xaxim Curitiba/PR</p>
					</div>
				</div>
			</div>
		</>
	);
}
