import React from 'react';
import './styles.css';

type ToastProps = {
	type: 'success' | 'error';
	message: string;
	show: boolean;
};

const Toast: React.FC<ToastProps> = ({ type, message, show }) => {
	if (!show) return null;

	return (
		<div className={`toast-container ${type}`}>
			<span>{message}</span>
		</div>
	);
};

export default Toast;
