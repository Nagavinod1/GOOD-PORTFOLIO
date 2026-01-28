/* ============================================
   FIREBASE CONFIGURATION (Modular SDK v12.8.0)
   ============================================ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC1feaTidkmfDErcoX1K8HbEQefpPBjs-M",
    authDomain: "portfolio-12523.firebaseapp.com",
    projectId: "portfolio-12523",
    storageBucket: "portfolio-12523.firebasestorage.app",
    messagingSenderId: "310316838097",
    appId: "1:310316838097:web:fae714d4aea469dfc169f0",
    measurementId: "G-NN8JBV451L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// ============================================
// DATABASE FUNCTIONS
// ============================================

/**
 * Save contact form message to Firestore
 * @param {Object} messageData - The message data to save
 * @returns {Promise} - Resolves with document ID on success
 */
async function saveContactMessage(messageData) {
    try {
        const docRef = await addDoc(collection(db, 'contact_messages'), {
            name: messageData.name,
            email: messageData.email,
            subject: messageData.subject,
            message: messageData.message,
            timestamp: serverTimestamp(),
            read: false
        });
        console.log('✅ Message saved with ID:', docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('❌ Error saving message:', error);
        return { success: false, error: error.message };
    }
}

// Export functions for use in other scripts
window.saveContactMessage = saveContactMessage;

console.log('🔥 Firebase initialized successfully!');
