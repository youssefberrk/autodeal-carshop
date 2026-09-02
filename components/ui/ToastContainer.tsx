"use client";
import React, { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useCarStore } from "@/store/useCarStore";
import { Heart, CircleOff } from "lucide-react";
import { Notification } from "@/types/Order";

const ToastItem = ({ notification }: { notification: Notification }) => {
	const { removeNotification } = useCarStore();
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		// Trigger entry animation
		const entryTimer = setTimeout(() => setVisible(true), 10);

		// Trigger exit animation before removal
		const exitTimer = setTimeout(() => setVisible(false), 2700);

		// Remove from store
		const removeTimer = setTimeout(() => {
			removeNotification(notification.id);
		}, 3000);

		return () => {
			clearTimeout(entryTimer);
			clearTimeout(exitTimer);
			clearTimeout(removeTimer);
		};
	}, [notification.id, removeNotification]);

	return (
		<div className={`fav-notif ${visible ? "show" : ""}`}>
			<div className={`fav-notif-icon ${notification.type}`}>
				{notification.type === "add" ? (
					<Heart className="w-3.5 h-3.5 fill-[#00ff87] text-[#00ff87]" />
				) : (
					<CircleOff className="w-3.5 h-3.5" />
				)}
			</div>
			<span>{notification.message}</span>
			<div className="progress-bar" />
		</div>
	);
};

export const ToastContainer = () => {
	const { notifications } = useCarStore();
	const isMounted = useSyncExternalStore(
		() => () => {},
		() => true,
		() => false,
	);

	if (!isMounted) return null;

	return createPortal(
		<div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end pointer-events-none">
			{notifications.map((n) => (
				<ToastItem key={n.id} notification={n} />
			))}
		</div>,
		document.body,
	);
};
