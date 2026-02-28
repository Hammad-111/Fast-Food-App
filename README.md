# 🍕 Fast Foodies Pizza POS

Premium Point of Sale system built for **Fast Foodies Pizza**. Optimized for fast-paced billing, real-time analytics, and ease of management.

## 🚀 Features

- **⚡ High-Speed Billing**: Optimized checkout flow for cash and card payments.
- **📊 Real-time Dashboard**: Live tracking of Revenue, Orders, and Average Order Value.
- **🍗 Menu Management**: Full CRUD operations for categories and products.
- **🎫 Thermal Receipt Printing**: One-click printing with PDF export support.
- **💾 Data Persistence**: LocalStorage-based persistence for catalogs and transaction history.
- **🖥️ Desktop Native**: Packaged as a Windows Installer via Electron.

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand (with Persist Middleware)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Desktop Wrapper**: Electron + Electron Builder

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Hammad-111/Fast-Food-App.git
   cd Fast-Food-App
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run in development mode**:
   ```bash
   npm run dev
   ```

4. **Run Desktop (Electron) development**:
   ```bash
   npm run electron:dev
   ```

## 🏗️ Building for Production

### Web Build
```bash
npm run build
```

### Windows Installer (.exe)
```bash
npm run electron:dist
```
The installer will be generated in the `release/` directory.

## 👤 Developer

- **Name**: Hammad Javed
- **Email**: Connect2hammadjaveed@gmail.com
- **Phone**: 03017891391

---
*Developed for Fast Foodies Pizza 🍕*
