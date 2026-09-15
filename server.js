const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Test contact endpoint (bez emaila, tylko odpowiedź)
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message, group } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Brak wymaganych pól' });
  }

  try {
    // Dla testu - tylko odpowiedź sukcesu
    console.log('📨 Nowa wiadomość z formularza:');
    console.log('Imię:', name);
    console.log('Email:', email);
    console.log('Telefon:', phone);
    console.log('Grupa:', group);
    console.log('Wiadomość:', message);
    console.log('---');

    res.status(200).json({ 
      success: true, 
      message: 'Wiadomość wysłana pomyślnie! Wkrótce się skontaktujemy.' 
    });
  } catch (error) {
    console.error('Błąd:', error);
    res.status(500).json({ error: 'Nie udało się wysłać wiadomości' });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🥋 Bushido Gdynia - Serwer uruchomiony na porcie ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
