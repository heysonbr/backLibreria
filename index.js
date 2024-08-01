const admin = require('firebase-admin');
const express = require('express');
const app = express();

// Inicializa Firebase con las credenciales
admin.initializeApp({
    credential: admin.credential.cert(require('./firebase-admin.json'))
});

const db = admin.firestore();

app.use(express.json());

app.get('/books', async (req, res) => {
    try {
        const snapshot = await db.collection('books').get();
        const books = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/books/:id', async (req, res) => {
    try {
        const doc = await db.collection('books').doc(req.params.id).get();
        if (doc.exists) {
            res.json({ id: doc.id, ...doc.data() });
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post('/books', async (req, res) => {
    try {
        const book = req.body;
        const doc = await db.collection('books').add(book);
        res.json({ id: doc.id, ...book });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.put('/books/:id', async (req, res) => {
    try {
        const book = req.body;
        await db.collection('books').doc(req.params.id).update(book);
        res.json({ message: 'Book updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



app.delete('/books/:id', async (req, res) => {
    try {
        await db.collection('books').doc(req.params.id).delete();
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



















const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});