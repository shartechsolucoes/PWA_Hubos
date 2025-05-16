import React, { useState, useEffect } from 'react';

import './styles.css';

interface DeferredPromptEvent extends Event {
	prompt: () => void;
	userChoice: Promise<{ outcome: string }>;
}

const InstallPWAButton: React.FC = () => {
	// const [isInstallable, setIsInstallable] = useState<boolean>(false);
	const [deferredPrompt, setDeferredPrompt] =
		useState<DeferredPromptEvent | null>(null);
	const [showModal, setShowModal] = useState<boolean>(false);

	useEffect(() => {
		// Verifica se o evento `beforeinstallprompt` está disponível
		const handler = (event: Event) => {
			const e = event as DeferredPromptEvent; // Tipo do evento
			e.preventDefault();
			setDeferredPrompt(e);
			// setIsInstallable(true);
			setShowModal(true); // Exibe o modal quando o PWA pode ser instalado
		};

		window.addEventListener('beforeinstallprompt', handler);

		return () => {
			window.removeEventListener('beforeinstallprompt', handler);
		};
	}, []);

	const handleInstall = () => {
		if (deferredPrompt) {
			deferredPrompt.prompt();
			deferredPrompt.userChoice.then((choiceResult) => {
				if (choiceResult.outcome === 'accepted') {
					console.log('Usuário aceitou a instalação do PWA');
				} else {
					console.log('Usuário rejeitou a instalação do PWA');
				}
				setShowModal(false);
				setDeferredPrompt(null);
			});
		}
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	return (
		<>
			{showModal && (
				<div className="modal">
					<div className="modal-content">
						<h2>Instalar Aplicativo</h2>
						<p>Deseja instalar o aplicativo?</p>
						<button onClick={handleInstall}>Instalar</button>
						<button onClick={handleCloseModal}>Fechar</button>
					</div>
				</div>
			)}
			{/* {isInstallable && (
				<button onClick={() => setShowModal(true)}>Instalar App</button>
			)} */}
		</>
	);
};

export default InstallPWAButton;
