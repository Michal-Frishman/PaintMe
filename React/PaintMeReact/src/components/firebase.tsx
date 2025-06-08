import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCW6sUIjGTOoHX4AjXcKYjDIJ3DzXttFR0",
    authDomain: "paintme-f7674.firebaseapp.com",
    projectId: "paintme-f7674",
    appId: "1:824219769744:web:0e32aa025e03b52fafb115",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
