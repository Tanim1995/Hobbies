import admin from "firebase-admin";
import serviceAccount from "../serviceAccountKey.json" assert { type: "json" };


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


const setCustomClaims = async () => {
  const userEmail = "james@bond.com"; 
  const role = "staff"; 

  try {
    const user = await admin.auth().getUserByEmail(userEmail); 
    await admin.auth().setCustomUserClaims(user.uid, { role }); 
    console.log(`Custom claims set for user: ${userEmail} with role: ${role}`);
  } catch (error) {
    console.error("Error setting custom claims:", error);
  }
};

setCustomClaims();
