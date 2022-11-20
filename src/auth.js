import * as helpers from './helpers';
import { state as state } from './model';
import { initState } from './controller';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import {
    collection,
    getDocs,
    getFirestore,
    addDoc,
    doc,
    setDoc,
    getDoc
} from 'firebase/firestore';

import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    updateProfile
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCk1gJT456iJ0PLBR3hGyo70pKYt7tVSRo",
    authDomain: "the-time-timer-plus-todo.firebaseapp.com",
    projectId: "the-time-timer-plus-todo",
    storageBucket: "the-time-timer-plus-todo.appspot.com",
    messagingSenderId: "1035068195554",
    appId: "1:1035068195554:web:4d4e4f09131dc30b88d4bb",
    measurementId: "G-XQ8KM95L9E"
};

// Init firebase app
initializeApp(firebaseConfig);

// Init sevices
const db = getFirestore();
const auth = getAuth();

// collection ref
const colRef = collection(db, 'users');

// get collection data
getDocs(colRef).then((snapshot) => {
    let users = [];
    snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
    })
    console.log(users);
}).catch(err => {
    console.log(err);
})

const usernameEl = document.querySelector('.username-btn');
const signupForm = document.querySelector('.signup');
signupForm.addEventListener('submit', e => {
    e.preventDefault();

    const email = signupForm.email.value;
    const password = signupForm.password.value;
    const username = signupForm.username.value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log('user created:', cred.user);
            const docRef = doc(db, 'users', cred.user.uid);
            return setDoc(docRef, {
                username: username,
                data: state
            })
        })
        .then(() => {
            return updateProfile(auth.currentUser, {
                displayName: username
            })
        })
        .then(() => {
            usernameEl.textContent = username;
            signupForm.reset();
            helpers.toggleLoginModal();
        })
        .catch ((err) => {
            console.log(err.message);
        })
}) 

const logoutButton = document.querySelector('.logout');
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            usernameEl.textContent = '';
            console.log('The user signed out');
        }).catch((err) => {
            console.log(err.message);
        })
})

// function getUserData(uid) {
//     db.ref('users/' + uid).once("value", snap => {
//         console.log(snap.val());
//     })
// }

const loginForm = document.querySelector('.signin');
loginForm.addEventListener('submit', e => {
    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            const docRef = doc(db, 'users', cred.user.uid);
            console.log('user logged in:', cred.user);
            return getDoc(docRef);
        })
        .then((docSnap) => {
            const dataObj = docSnap.data();
            console.log(dataObj);
            // state = dataObj.data;
            state.login = true;
            state.theme = dataObj.data.theme;
            state.pomodoro = dataObj.data.pomodoro;
            state.counterValue = dataObj.data.counterValue;
            state.counter = dataObj.data.counter;
            state.shortBreak = dataObj.data.shortBreak;
            state.longBreak = dataObj.data.longBreak;
            state.mode = dataObj.data.mode;
            state.lists = dataObj.data.lists;
            state.dots = dataObj.data.dots;
            state.longBreakCounter = dataObj.data.longBreakCounter;
            state.completeAudio = dataObj.data.completeAudio;
            state.audios = dataObj.data.audios;
            state.alarmVolume = dataObj.data.alarmVolume;

            loginForm.reset();
            helpers.toggleLoginModal();
            initState();
        })
        .catch((err) => {
            console.log(err.message);
        })
}) 

// auth.onAuthStateChanged(user => {
//     if (user) {
//         getUserData(user.uid);
//     }
// })