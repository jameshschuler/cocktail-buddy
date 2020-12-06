import React from 'react';
import { Message, MessageType } from '../models/message';

interface ToastContainerProps {
	message: Message | null;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ message }) => {
	return (
		<div
			id="toast-container"
			className={`${
				message?.messageType === MessageType.success
					? 'success'
					: 'error'
			} ${message ? 'show' : ''}`}
		>
			{message?.text}
		</div>
	);
};

export default ToastContainer;
