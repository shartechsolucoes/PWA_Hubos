// store.ts
import { create } from 'zustand';
import { db, OfflineSubmission } from './db';

type AppState = {
	submissions: OfflineSubmission[];
	addSubmission: (data: OfflineSubmission) => Promise<void>;
	loadSubmissions: () => Promise<void>;
	clearSubmissions: () => Promise<void>;
};

export const useAppStore = create<AppState>((set) => ({
	submissions: [],
	addSubmission: async (data) => {
		await db.submissions.put(data);
		const all = await db.submissions.toArray();
		set({ submissions: all });
	},
	loadSubmissions: async () => {
		const all = await db.submissions.toArray();
		set({ submissions: all });
	},
	clearSubmissions: async () => {
		await db.submissions.clear();
		set({ submissions: [] });
	},
}));
