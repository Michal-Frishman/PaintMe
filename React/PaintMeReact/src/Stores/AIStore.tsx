import { makeAutoObservable, action } from 'mobx';
import { fetchAiDrawingInstructions, fetchAiaiDrawingFeedback } from './Api';

const AIStore = () => {
    const store = {
        isLoading: false,
        aiInstructions: null as string | null,
        aiFeedback: null as string | null,
        lastAiInstructionsPath: null as string | null,
        aiInstructionsMap: new Map<string, string>(),

        getAiInstructions: (path: string): string | null => {
            return store.aiInstructionsMap.get(path) ?? null;
        },

        loadAiInstructions: action(async (path: string) => {
            if (store.aiInstructionsMap.has(path)) return; 

            store.isLoading = true;
            try {
                const result = await fetchAiDrawingInstructions(path);
                store.aiInstructionsMap.set(path, result); 
            } catch (error) {
                console.error('שגיאה בטעינת רעיונות AI:', error);
            }
            store.isLoading = false;
        }),

        loadAiFeedback: action(async (path: string) => {
            store.isLoading = true;
            try {
                const result = await fetchAiaiDrawingFeedback(path);
                store.aiFeedback = result;
            } catch (error) {
                console.error('שגיאה בטעינת פידבק מה-AI:', error);
                store.aiFeedback = null;
            }
            store.isLoading = false;
        }),
    };

    makeAutoObservable(store);
    return store;
};

export default AIStore();