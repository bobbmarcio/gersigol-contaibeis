import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

export default function FirebaseConfig () {
    const firebaseConfig = {
        apiKey: "AIzaSyBl44kIRD6WkCCVCuw31YWiMqZ3GKlHXqo",
        authDomain: "gersigol-contabeis.firebaseapp.com",
        projectId: "gersigol-contabeis",
        storageBucket: "gersigol-contabeis.appspot.com",
        messagingSenderId: "299062437165",
        appId: "1:299062437165:web:936b73bc3d5ce01cd71fa4"
    };

    const app = initializeApp(firebaseConfig);
    return getAuth(app);
}
