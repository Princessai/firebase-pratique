import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCrBMNlzut8kiecOhdrEFTCsMIDsLsRZLM",
    authDomain: "new-project-e0345.firebaseapp.com",
    projectId: "new-project-e0345",
    storageBucket: "new-project-e0345.appspot.com",
    messagingSenderId: "1038740749678",
    appId: "1:1038740749678:web:6615524e73335687dfd57f",
    measurementId: "G-NHF9JNSFKM"
};

const app = initializeApp(firebaseConfig);
const fireDb = getDatabase(app);

export { fireDb };