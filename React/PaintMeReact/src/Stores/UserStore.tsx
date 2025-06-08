import { makeAutoObservable } from 'mobx';
import { fetchAuth } from './Api';

const UserStore = () => {
    const store = {
        token: null as string | null,
        isLoading: false,
        error: null as string | null,

        authUser: async (mode: string, email: string, password: string) => {
            store.isLoading = true;
            store.error = null;
            try {
                const result = await fetchAuth(mode, email, password); // מחזיר את ה-token עצמו
                store.token = result.token || result; // תמיכה גם אם מחזיר ישירות מחרוזת
            } catch (err: any) {
                store.error = err?.response?.data?.message || 'Authentication failed';
            } finally {
                store.isLoading = false;
            }
        },
    };

    makeAutoObservable(store);
    return store;
};


export default UserStore();
