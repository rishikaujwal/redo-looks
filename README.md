# Clothes Resell/Donation App

This is a React app that lets users **donate or resell clothing items**. It uses:
- **Firebase Authentication** for user login/signup (email/password):contentReference[oaicite:10]{index=10}:contentReference[oaicite:11]{index=11}.
- **Cloud Firestore** to store item data (name, category, price, etc.):contentReference[oaicite:12]{index=12}.
- **Firebase Storage** for uploaded images, using `uploadBytes` and `getDownloadURL`:contentReference[oaicite:13]{index=13}:contentReference[oaicite:14]{index=14}.
- **Tailwind CSS** for styling and responsiveness.
- **Vercel** for easy deployment.

## Setup Instructions

1. **Clone the repository** and `cd` into the project directory.
2. **Install dependencies**:
   ```bash
   npm install
