# 🥋 Bushido Gdynia - Strona Internetowa

Elegancka, minimalistyczna strona internetowa dla Centrum Sztuk Walki Bushido Gdynia. Projekt zawiera pełny stos techniczny: frontend responsywny + backend Node.js z obsługą formularza kontaktowego.

## 📋 Zawartość Projektu

```
bushido-gdynia-website/
├── public/
│   ├── index.html          # Główna strona
│   ├── styles.css          # Stylizacja (minimalistyczna, responsywna)
│   └── script.js           # Interaktywność (menu mobile, formularz)
├── server.js               # Express server z obsługą formularza
├── package.json            # Zależności i konfiguracja
├── .env.example            # Szablon zmiennych środowiskowych
├── .gitignore              # Ignorowane pliki
└── README.md               # Ta dokumentacja
```

## 🎨 Cechy Strony

✅ **Minimalistyczny Design** – Nawiązanie do filozofii sztuk walki  
✅ **Responsywny** – Mobile-first, działa na wszystkich urządzeniach  
✅ **Pełna Funkcjonalność** – Formularz kontaktowy z wysyłką emaila  
✅ **Google Maps** – Mapa dojazdu do klubu  
✅ **SEO-friendly** – Właściwe meta tagi i struktura  
✅ **Szybki** – Minimalne zasoby, brak zbędnych bibliotek  

## 🚀 Instalacja i Uruchomienie

### 1. Klonowanie repozytorium
```bash
git clone https://github.com/mateuszplus8-arch/bushido-gdynia-website.git
cd bushido-gdynia-website
```

### 2. Instalacja zależności
```bash
npm install
```

### 3. Konfiguracja zmiennych środowiskowych
```bash
cp .env.example .env
```

Edytuj `.env` i uzupełnij dane email:
```
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_TO=bushido.gdynia@email.com
PORT=3000
```

**Ważne:** Aby wysłać email z Gmail:
1. Włącz 2FA na swoim koncie Google
2. Wygeneruj ["App Password"](https://myaccount.google.com/apppasswords)
3. Użyj tego hasła w zmiennej `EMAIL_PASS`

### 4. Uruchomienie w trybie deweloperskim
```bash
npm run dev
```

Strona będzie dostępna na: **http://localhost:3000**

### 5. Uruchomienie w produkcji
```bash
npm start
```

## 📁 Struktura Stron

### Header
- Logo + nazwa klubu
- Nawigacja (Home, O nas, Grupy, Kontakt)
- Przycisk "Zadzwoń teraz"
- Menu mobilne (hamburger)

### Hero Section
- Duży nagłówek z hasłem
- Opis klubu
- Dwa CTA: "Zadzwoń teraz" i "Poznaj naszą ofertę"

### O nas
- Filozofia Bushido
- Cztery wartości: Samokontroła, Szacunek, Sprawność, Mentalność

### Grupy / Oferta
- Karty dla trzech grup: Dzieci, Młodzież, Dorośli
- Szczegóły zajęć
- Info: "Co zabrać na pierwszy trening"

### Kontakt i Dojazd
- Adres: ul. Słupecka 6, 81-316 Gdynia
- Telefon: 795 579 442
- Link do Facebooka
- **Google Maps** z lokalizacją
- **Formularz kontaktowy** z wysyłką emaila do administratora + potwierdzenie do użytkownika

### Footer
- Dane kontaktowe
- Szybkie linki
- Copyright

## 🔗 API Endpointy

### POST /api/contact
Wysłanie wiadomości z formularza.

**Request Body:**
```json
{
  "name": "Jan Kowalski",
  "email": "jan@example.com",
  "phone": "123456789",
  "message": "Chciałbym dołączyć do grupy dorosłych",
  "group": "dorośli"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Wiadomość wysłana pomyślnie!"
}
```

**Response (Error):**
```json
{
  "error": "Brak wymaganych pól"
}
```

## 🎯 Customizacja

### Zmiana Koloru Akcentu
W `public/styles.css` zmień zmienną CSS:
```css
--accent-red: #d32f2f;  /* Zmień na inny kolor */
```

### Zmiana Danych Kontaktowych
W `public/index.html` wyszukaj i zmień:
- Telefon: `795 579 442`
- Adres: `ul. Słupecka 6, 81-316 Gdynia`
- URL Facebook: `https://www.facebook.com/BushidoGdynia?locale=pl_PL`

### Zmiana Linku Google Maps
W `public/index.html` odnajdź iframe Google Maps i zmień src na swoją lokalizację.

## 📧 Wysyłanie Emaili

Formularz wysyła dwa emaile:
1. **Do administratora** – pełna wiadomość z danymi kontaktowymi
2. **Do użytkownika** – potwierdzenie otrzymania wiadomości

Upewnij się, że zmienne `EMAIL_USER` i `EMAIL_TO` są poprawnie skonfigurowane w `.env`.

## 📱 Responsywność

Strona jest w pełni responsywna:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (< 768px) – menu hamburgerowe, pojedyncze kolumny

## 🔒 Bezpieczeństwo

- Formularz ma walidację po stronie klienta i serwera
- Zmienne środowiskowe nie są commitowane (`.gitignore`)
- Dane emaila są wysyłane bezpiecznie przez Nodemailer
- Brak eksponowania poufnych danych w kodzie

## 🚀 Deploy na Hosting Tradycyjny

### Wymagania Serwera
- Node.js v14+ 
- npm/yarn
- Dostęp do SSH/SFTP

### Kroki Deploy'u

1. **Zaloguj się na serwer:**
   ```bash
   ssh user@hosting.com
   ```

2. **Klonuj repozytorium:**
   ```bash
   cd /var/www/
   git clone https://github.com/mateuszplus8-arch/bushido-gdynia-website.git
   cd bushido-gdynia-website
   ```

3. **Zainstaluj zależności:**
   ```bash
   npm install --production
   ```

4. **Skonfiguruj `.env`:**
   ```bash
   nano .env  # lub vi, vim
   ```

5. **Uruchom serwer (z PM2 do restartów):**
   ```bash
   npm install -g pm2
   pm2 start server.js --name "bushido"
   pm2 startup
   pm2 save
   ```

6. **Konfiguracja Nginx/Apache** (reverse proxy):
   ```nginx
   server {
     server_name bushido.gdynia.pl;
     
     location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

7. **SSL Certificate (Let's Encrypt):**
   ```bash
   sudo certbot --nginx -d bushido.gdynia.pl
   ```

## 🛠️ Technologie

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Node.js, Express.js
- **Email:** Nodemailer
- **Hosting:** Tradycyjny (dedykowany/VPS)

## 📝 Licencja

© 2024 Bushido Gdynia. Wszystkie prawa zastrzeżone.

## 📞 Kontakt

**Bushido Gdynia**  
📍 ul. Słupecka 6, 81-316 Gdynia  
📱 795 579 442  
📘 [Facebook](https://www.facebook.com/BushidoGdynia?locale=pl_PL)

---

Strona stworzona z passion dla sztuk walki! 🥋
