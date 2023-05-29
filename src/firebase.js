
import { initializeApp , } from "firebase/app";
import { getFirestore ,collection } from "firebase/firestore";

import { getStorage} from "firebase/storage";





const firebaseConfig = {
  apiKey: "AIzaSyBKtXH8c43WVCGhNgTS3geY16E0d_KRis4",
  authDomain: "passion3dworld-53a4a.firebaseapp.com",
  projectId: "passion3dworld-53a4a",
  storageBucket: "passion3dworld-53a4a.appspot.com",
  messagingSenderId: "548206801484",
  appId: "1:548206801484:web:bf76072f2e632c4ca57ae9"
};

const app = initializeApp(firebaseConfig);

const database = getFirestore(app)

const refrence = collection(database,"modelData")

const discount = collection(database,"CoupunsRequested")

const storage = getStorage(app);

export {storage ,discount}

export default refrence 