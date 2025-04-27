// src/routes/PrivateRoute.tsx
import { JSX } from 'react';
import { Navigate } from 'react-router';

export default function PrivateRoute({ children }: { children: JSX.Element }) {
	const token = localStorage.getItem('token');
	return token ? children : <Navigate to="/" replace />;
}
