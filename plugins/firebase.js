import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase/app';
import 'firebase/firestore';

// Vue.use(VueFire)

const firebaseApp = firebase.initializeApp({
  // ここにfirebaseのapi情報をコピペします。var config = {
    apiKey: "AIzaSyALGsgLTlLGV_mRJ_b9RPlXg9HFcNMSnTo",
    authDomain: "tyukan-43e82.firebaseapp.com",
    databaseURL: "https://tyukan-43e82.firebaseio.com",
    projectId: "tyukan-43e82",
    storageBucket: "tyukan-43e82.appspot.com",
    messagingSenderId: "1047663956801"
});

export const db = firebaseApp.firestore();

// Timestamp型を使うために
// 参考 https://qiita.com/teramotodaiki/items/b3592326579166003102
const settings = { timestampsInSnapshots: true };
db.settings(settings);