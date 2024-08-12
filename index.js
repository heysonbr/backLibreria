require("dotenv").config();

const admin = require("firebase-admin");
const express = require("express");
const app = express();

// Importa las credenciales desde las variables de entorno
const serviceAccount = {
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};
// Inicializa Firebase con las credenciales
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

app.use(express.json());

app.get("/books", async (req, res) => {
  try {
    const snapshot = await db.collection("books").get();
    const books = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const doc = await db.collection("books").doc(req.params.id).get();
    if (doc.exists) {
      res.json({ id: doc.id, ...doc.data() });
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/books", async (req, res) => {
  try {
    const book = req.body;
    const doc = await db.collection("books").add(book);
    res.json({ id: doc.id, ...book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/bookss", async (req, res) => {
  try {
    const books = req.body;
    const writeBatch = db.batch();

    books.forEach((book) => {
      const docRef = db.collection("books").doc();
      writeBatch.set(docRef, book);
    });

    await writeBatch.commit();
    res.status(200).json({ message: "Books added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/books/:id", async (req, res) => {
  try {
    const book = req.body;
    await db.collection("books").doc(req.params.id).update(book);
    res.json({ message: "Book updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    await db.collection("books").doc(req.params.id).delete();
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
