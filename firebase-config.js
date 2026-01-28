/* ============================================
   FIREBASE CONFIGURATION
   Replace these values with your Firebase project config
   ============================================ */

// Your web app's Firebase configuration
// Project: portfolio-12523
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
firebase.initializeApp(firebaseConfig);

// Initialize Firestore database
const db = firebase.firestore();

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
        const docRef = await db.collection('contact_messages').add({
            name: messageData.name,
            email: messageData.email,
            subject: messageData.subject,
            message: messageData.message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            read: false
        });
        console.log('✅ Message saved with ID:', docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('❌ Error saving message:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Get all contact messages (for admin use)
 * @returns {Promise<Array>} - Array of messages
 */
async function getContactMessages() {
    try {
        const snapshot = await db.collection('contact_messages')
            .orderBy('timestamp', 'desc')
            .get();

        const messages = [];
        snapshot.forEach(doc => {
            messages.push({ id: doc.id, ...doc.data() });
        });
        return messages;
    } catch (error) {
        console.error('❌ Error fetching messages:', error);
        return [];
    }
}

/**
 * Mark a message as read
 * @param {string} messageId - The message document ID
 */
async function markMessageAsRead(messageId) {
    try {
        await db.collection('contact_messages').doc(messageId).update({
            read: true
        });
        console.log('✅ Message marked as read');
    } catch (error) {
        console.error('❌ Error updating message:', error);
    }
}

/**
 * Delete a contact message
 * @param {string} messageId - The message document ID
 */
async function deleteContactMessage(messageId) {
    try {
        await db.collection('contact_messages').doc(messageId).delete();
        console.log('✅ Message deleted');
    } catch (error) {
        console.error('❌ Error deleting message:', error);
    }
}

// Log Firebase initialization status
console.log('🔥 Firebase initialized successfully!');
