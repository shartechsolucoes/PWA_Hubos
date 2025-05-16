// src/routes/PrivateRoute.tsx
import { JSX } from 'react';
import { Navigate } from 'react-router';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/sidebar';
import InstallPWAButton from '../components/installPWA/InstalPWA';

export default function PrivateRoute({ children }: { children: JSX.Element }) {
	const token = localStorage.getItem('token');
	return token ? (
		<>
			<Sidebar />
			<InstallPWAButton />
			{children}
			<Navbar />
		</>
	) : (
		<Navigate to="/" replace />
	);
}
