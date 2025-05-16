// src/routes/PublicRoute.tsx
import { JSX } from 'react';
import { Navigate } from 'react-router';
import InstallPWAButton from '../components/installPWA/InstalPWA';

export default function PublicRoute({ children }: { children: JSX.Element }) {
	const token = localStorage.getItem('token');
	return token ? (
		<Navigate to="/dashboard" replace />
	) : (
		<>
			{children}
			<InstallPWAButton />
		</>
	);
}
