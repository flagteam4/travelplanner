import {firebaseApp} from "./config/Fire";

export const db = firebaseApp.firestore();

export const saveTripPlan = (userName, planName ,locations) => {
    db.collection(userName).doc(planName).set({locations})
        .then(docRef => console.log('Save trip plan into user: ', userName))
        .catch(error => console.error('Error on saving trip plan: ', error))
};

export const deleteTripPlan = (userName, planName) => {
    db.collection(userName).doc(planName).delete()
        .then(() => console.log(`${planName} deleted from ${userName}`))
        .catch(error => console.error('Error removing trip plan', error))
};

