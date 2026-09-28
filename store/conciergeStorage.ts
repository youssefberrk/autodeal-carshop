"use client";

import { useSyncExternalStore } from "react";

export const CONCIERGE_BUBBLE_STORAGE_KEY = "autodeal_concierge_bubble_visible_v1";
export const CONCIERGE_CAR_STORAGE_KEY = "autodeal_concierge_active_car_v1";
export const CONCIERGE_MESSAGES_STORAGE_KEY = "autodeal_concierge_chat_v1";

export interface PersistedConciergeState {
	isBubbleVisible: boolean;
	activeCarId: number | undefined;
	hasMessages: boolean;
}

/**
 * Rendered on the server, and therefore the only values the server is able to emit.
 * The client picks up the real localStorage values during hydration via `getSnapshot`,
 * so the first client render must start from exactly these defaults.
 */
const DEFAULT_PERSISTED_STATE: PersistedConciergeState = {
	isBubbleVisible: false,
	activeCarId: undefined,
	hasMessages: false,
};

const STORAGE_KEYS = [
	CONCIERGE_BUBBLE_STORAGE_KEY,
	CONCIERGE_CAR_STORAGE_KEY,
	CONCIERGE_MESSAGES_STORAGE_KEY,
];

let cachedSnapshot: PersistedConciergeState = DEFAULT_PERSISTED_STATE;
let isCacheValid = false;
const listeners = new Set<() => void>();

function readPersistedState(): PersistedConciergeState {
	let hasMessages = false;
	let bubbleSaved: string | null = null;
	let carSaved: string | null = null;

	try {
		const messagesSaved = localStorage.getItem(CONCIERGE_MESSAGES_STORAGE_KEY);
		if (messagesSaved) {
			const parsed = JSON.parse(messagesSaved);
			hasMessages = Array.isArray(parsed) && parsed.length > 0;
		}
		bubbleSaved = localStorage.getItem(CONCIERGE_BUBBLE_STORAGE_KEY);
		carSaved = localStorage.getItem(CONCIERGE_CAR_STORAGE_KEY);
	} catch {
		return DEFAULT_PERSISTED_STATE;
	}

	const parsedCarId = carSaved ? Number.parseInt(carSaved, 10) : Number.NaN;

	return {
		// A saved conversation keeps the bubble around unless it was explicitly dismissed.
		isBubbleVisible: hasMessages ? bubbleSaved !== "false" : bubbleSaved === "true",
		activeCarId: Number.isNaN(parsedCarId) ? undefined : parsedCarId,
		hasMessages,
	};
}

/**
 * `getSnapshot` must be referentially stable between calls or `useSyncExternalStore`
 * loops forever, so the parsed value is cached until something invalidates it.
 */
function getSnapshot(): PersistedConciergeState {
	if (!isCacheValid) {
		cachedSnapshot = readPersistedState();
		isCacheValid = true;
	}
	return cachedSnapshot;
}

function getServerSnapshot(): PersistedConciergeState {
	return DEFAULT_PERSISTED_STATE;
}

function handleStorageChange(event: StorageEvent) {
	if (event.key === null || STORAGE_KEYS.includes(event.key)) {
		notifyConciergeStorageChanged();
	}
}

function subscribe(onStoreChange: () => void): () => void {
	listeners.add(onStoreChange);

	if (listeners.size === 1) {
		window.addEventListener("storage", handleStorageChange);
	}

	return () => {
		listeners.delete(onStoreChange);
		if (listeners.size === 0) {
			window.removeEventListener("storage", handleStorageChange);
		}
	};
}

export function notifyConciergeStorageChanged() {
	isCacheValid = false;
	for (const listener of listeners) {
		listener();
	}
}

function writeStorageItem(key: string, value: string) {
	try {
		localStorage.setItem(key, value);
	} catch {
		// localStorage is unavailable in some privacy modes; state still updates in memory.
	}
	notifyConciergeStorageChanged();
}

export function persistConciergeBubbleVisible(isBubbleVisible: boolean) {
	writeStorageItem(CONCIERGE_BUBBLE_STORAGE_KEY, String(isBubbleVisible));
}

export function persistConciergeActiveCar(carId: number) {
	writeStorageItem(CONCIERGE_CAR_STORAGE_KEY, String(carId));
}

export function persistConciergeMessages(messages: unknown[]) {
	if (messages.length > 0) {
		writeStorageItem(CONCIERGE_MESSAGES_STORAGE_KEY, JSON.stringify(messages));
		return;
	}

	try {
		localStorage.removeItem(CONCIERGE_MESSAGES_STORAGE_KEY);
	} catch {
		// Ignored for the same reason as above.
	}
	notifyConciergeStorageChanged();
}

export function usePersistedConciergeState(): PersistedConciergeState {
	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
