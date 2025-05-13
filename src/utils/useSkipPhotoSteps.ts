import { useEffect, useRef, useState } from 'react';

type Step = {
	id: string;
	title: string;
};

export function useSkipPhotoSteps({
	steps,
	currentStep,
	isOnline,
	onSkipPhotos,
}: {
	steps: Step[];
	currentStep: number;
	isOnline: boolean;
	onSkipPhotos: () => void;
}) {
	const [offlineSince, setOfflineSince] = useState<number | null>(null);
	const [photosSkipped, setPhotosSkipped] = useState(false);

	useEffect(() => {
		if (!isOnline && offlineSince === null) {
			setOfflineSince(Date.now());
		}
	}, [isOnline]);

	useEffect(() => {
		if (isOnline && offlineSince !== null) {
			const offlineDuration = Date.now() - offlineSince;
			const currentId = steps[currentStep]?.id;

			if (
				offlineDuration > 1000 &&
				(currentId === 'PHOTOSTART' || currentId === 'PHOTOEND') &&
				!photosSkipped
			) {
				setPhotosSkipped(true);
				onSkipPhotos();
			}
			setOfflineSince(null);
		}
	}, [isOnline, offlineSince, steps, currentStep, onSkipPhotos, photosSkipped]);

	function canProceedToStep(nextStepIndex: number): boolean {
		const nextId = steps[nextStepIndex]?.id;

		if (!isOnline && (nextId === 'PHOTOSTART' || nextId === 'PHOTOEND')) {
			alert('Você precisa estar online para tirar fotos.');
			return false;
		}

		// Impede retorno a etapas de foto, mesmo se voltar online
		if (photosSkipped && (nextId === 'PHOTOSTART' || nextId === 'PHOTOEND')) {
			alert('As etapas de foto foram puladas devido à conexão.');
			return false;
		}

		return true;
	}

	return {
		canProceedToStep,
		photosSkipped,
	};
}
