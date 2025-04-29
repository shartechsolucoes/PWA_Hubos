// src/routes/PrivateRoute.tsx
import { JSX } from 'react';
import { Navigate } from 'react-router';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/sidebar';

export default function PrivateRoute({ children }: { children: JSX.Element }) {
	const token = localStorage.getItem('token');
	return token ? (
		<>
			<Sidebar />
			{children}
			<Navbar />
		</>
	) : (
		<Navigate to="/" replace />
	);
}
