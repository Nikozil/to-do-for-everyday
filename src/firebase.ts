import { FirebaseApp, initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
export const firebaseConfig = {
  apiKey: 'AIzaSyA3ZapvdJhr2ye50e1csF6QSen1_Pc-Oiw',
  authDomain: 'to-do-for-everyday.firebaseapp.com',
  projectId: 'to-do-for-everyday',
  storageBucket: 'to-do-for-everyday.appspot.com',
  messagingSenderId: '953937537207',
  appId: '1:953937537207:web:d4e9a94222b53f2a618532',
};

// Your web app's Firebase configuration

let instance: FirebaseApp | null;

export function getFirebase() {
  if (typeof window === 'undefined') return null;
  if (!instance) instance = initializeApp(firebaseConfig);
  return instance;
}

export function getReCaptcha(app: FirebaseApp) {
  return initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(
      '6LdEnEocAAAAAIYO_n-MtT5QUDNRDTQnMRlncGkv'
    ),

    // Optional argument. If true, the SDK automatically refreshes App Check
    // tokens as needed.
    isTokenAutoRefreshEnabled: true,
  });
}
