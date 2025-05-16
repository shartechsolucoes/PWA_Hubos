import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import InstallPWAButton from './components/installPWA/InstalPWA.tsx';
import Login from './pages/Login/index.tsx';
import Dashboard from './pages/Dashboard/index.tsx';
import ListOrders from './pages/Orders/List/index.tsx';
import FormOrders from './pages/Orders/Form/index.tsx';
import InfoOrders from './pages/Orders/Info/index.tsx';
import ReportOrders from './pages/Orders/Report/index.tsx';
import FormUser from './pages/User/Form/index.tsx';
import InfoUser from './pages/User/Info';
import PublicRoute from './routes/PublicRoute.tsx';
import PrivateRoute from './routes/PrivateRoute.tsx';

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<Routes>
			{/* ROTA PÚBLICA */}
			<Route
				index
				element={
					<PublicRoute>
						<Login />
					</PublicRoute>
				}
			/>

			{/* ROTAS PRIVADAS */}
			<Route
				path="dashboard"
				element={
					<PrivateRoute>
						<Dashboard />
					</PrivateRoute>
				}
			/>
			<Route
				path="orders"
				element={
					<PrivateRoute>
						<ListOrders />
					</PrivateRoute>
				}
			/>
			<Route
				path="orders/form"
				element={
					<PrivateRoute>
						<FormOrders />
					</PrivateRoute>
				}
			/>
			<Route
				path="orders/form/:id"
				element={
					<PrivateRoute>
						<FormOrders />
					</PrivateRoute>
				}
			/>
			<Route
				path="orders/info/"
				element={
					<PrivateRoute>
						<InfoOrders />
					</PrivateRoute>
				}
			/>
			<Route
				path="orders/report"
				element={
					<PrivateRoute>
						<ReportOrders />
					</PrivateRoute>
				}
			/>
			<Route
				path="user/form"
				element={
					<PrivateRoute>
						<FormUser />
					</PrivateRoute>
				}
			/>
			<Route
				path="user/info"
				element={
					<PrivateRoute>
						<InfoUser />
					</PrivateRoute>
				}
			/>
		</Routes>
	</BrowserRouter>
);
