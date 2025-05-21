import React from 'react';
import styles from './PhotoSentModal.module.css';
import { CiCircleCheck } from 'react-icons/ci';

interface PhotoSentModalProps {
	onClose: () => void;
}

const PhotoSentModal: React.FC<PhotoSentModalProps> = ({ onClose }) => {
	return (
		<div className={styles.overlay}>
			<div className={styles.modal}>
				<CiCircleCheck className={styles.icon} />
				<h2>Foto enviada com sucesso!</h2>
				<p>Você pode continuar com o processo.</p>
				<button className={styles.button} onClick={onClose}>
					OK
				</button>
			</div>
		</div>
	);
};

export default PhotoSentModal;
