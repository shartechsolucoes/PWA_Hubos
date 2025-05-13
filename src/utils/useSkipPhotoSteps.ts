import { useEffect, useState } from 'react';

type Step = {
	id: string;
	title: string;
};

export function useSkipPhotoSteps({
	steps,
	currentStep,
	isOnline,
}: {
	steps: Step[];
	currentStep: number;
	isOnline: boolean;
}) {
	const [photosSkipped, setPhotosSkipped] = useState(() => {
		return localStorage.getItem('photosSkipped') === 'true';
	});
	const [offlineSince, setOfflineSince] = useState<number | null>(null);
	const [goToSubmit, setGoToSubmit] = useState(() => {
		return localStorage.getItem('goToSubmit') === 'true';
	});

	useEffect(() => {
		if (!isOnline && offlineSince === null) {
			setOfflineSince(Date.now());
		}

		// Quando voltar a ficar online
		if (isOnline && offlineSince !== null) {
			const duration = Date.now() - offlineSince;
			const currentId = steps[currentStep]?.id;

			if (duration > 1000 && currentId === 'KITS') {
				setPhotosSkipped(true);
				setGoToSubmit(true);
				localStorage.setItem('photosSkipped', 'true');
				localStorage.setItem('goToSubmit', 'true');
			}
			setOfflineSince(null);
		}
	}, [isOnline, currentStep]);

	function canProceedToStep(nextStepIndex: number): boolean {
		const nextId = steps[nextStepIndex]?.id;

		if (!isOnline && (nextId === 'PHOTOSTART' || nextId === 'PHOTOEND')) {
			alert('Você precisa estar online para tirar fotos.');
			return false;
		}

		if (photosSkipped && (nextId === 'PHOTOSTART' || nextId === 'PHOTOEND')) {
			// alert('As etapas de foto foram puladas devido à conexão.');
			return false;
		}

		return true;
	}

	return {
		canProceedToStep,
		photosSkipped,
		setPhotosSkipped,
		goToSubmit,
		setGoToSubmit,
	};
}
