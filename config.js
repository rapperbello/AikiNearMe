// Public frontend configuration. Never put a Paystack secret key here.
// Demo mode uses localStorage. Configure Firebase before public production use.
export const APP_CONFIG = {
  mode: "demo", // Change to "firebase" only after completing Firebase setup.
  paystackPublicKey: "pk_test_REPLACE_WITH_YOUR_PAYSTACK_PUBLIC_KEY",
  firebase: {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  }
};