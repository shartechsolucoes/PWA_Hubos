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
import InfoUser from "./pages/User/Info";

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<Routes>
			<Route index element={<Login />} />
			{/* <Route path="about" element={<About />} /> */}

			{/* <Route element={<AuthLayout />}> */}
			<Route path="dashboard" element={<Dashboard />} />
			<Route path="orders" element={<ListOrders />} />
			<Route path="orders/form" element={<FormOrders />} />
			<Route path="orders/form/:id" element={<FormOrders />} />
			<Route path="orders/info/" element={<InfoOrders />} />
			<Route path="orders/report" element={<ReportOrders />} />
			<Route path="user/form" element={<FormUser />} />
			<Route path="user/info" element={<InfoUser />} />

			{/* </Route> */}
		</Routes>
		<InstallPWAButton />
	</BrowserRouter>
);
