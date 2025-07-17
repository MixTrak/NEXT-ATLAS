import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyA-QFKPktjCeSerN-_AEKKLY-VcxYVpPPE",
    authDomain: "atlas-playz18.firebaseapp.com",
    projectId: "atlas-playz18",
    storageBucket: "atlas-playz18.firebasestorage.app",
    messagingSenderId: "204428444642",
    appId: "1:204428444642:web:3b55140aa52caaab47afbb"
};

const app = initializeApp(firebaseConfig);
export default app;