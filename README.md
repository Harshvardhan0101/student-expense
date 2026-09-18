# Student Expense Tracker

A modern, clean, and responsive personal expense management web application designed specifically for college students. Built with **React.js**, **Tailwind CSS**, and **localStorage**, this application offers an intuitive and offline-first solution for tracking academic stipends, hostel mess fees, daily canteen snacks, books, and monthly budgets without requiring external accounts, servers, or APIs.

---

## 🌟 Key Features

- **Dashboard Overview**:
  - Time-aware dynamic greetings ("Good morning", "Good afternoon", "Good evening").
  - Summary metrics: Total Balance (Net Savings), Total Monthly Income, Total Monthly Expenses, and Income Savings Rate (%).
  - Real-time monthly target budget tracking bar with dynamic safety indicators.
  - Smart **Spending Insights** engine calculating patterns directly from transaction data (top categories, budget status, MoM pacing).
  - Quick access to recent transactions with instant category icons.

- **Transaction Management**:
  - Full CRUD capabilities: Add, Edit, and Delete expenses and income entries.
  - Multi-attribute tracking: Amount, Description, Category, Date, Payment Method (Cash, UPI, Debit Card, Credit Card, Bank Transfer), and optional Notes.
  - Client-side validation ensuring valid positive amounts, required fields, and preventing empty submissions.
  - Confirmation dialog modal for safe transaction deletions.

- **Filter & Search Engine**:
  - Real-time search across descriptions, categories, and notes.
  - Filter by Type (All / Expenses / Income), Category, Payment Method, and Month.
  - Sort by Newest, Oldest, Highest Amount, or Lowest Amount.
  - All filters and searches seamlessly operate together.

- **Spending Analytics**:
  - **Daily Spending Chart**: Interactive timeline curve showing expense trends across days of the current month powered by Recharts.
  - **Category Breakdown & Donut Chart**: Donut chart visualizing category proportions with custom tooltips.
  - **Ranked Category Breakdown**: Sorted list with proportional visual progress bars and percentage share.
  - **Month-over-Month Comparison**: Calculates net expense differences and percentage shifts compared against the previous month, complete with graceful fallback states.

- **Monthly & Category Budgets**:
  - Global monthly budget setting (e.g. ₹15,000 allowance).
  - Category-specific target budgets (e.g. Food: ₹4,000, Transport: ₹1,500, Education: ₹3,000).
  - Three-tier health status monitoring:
    - **Normal** (< 70% used) — Healthy green state
    - **Warning** (70% – 90% used) — Amber alert state
    - **Critical** (> 90% used or exceeded) — Red critical state
  - Add, edit, and delete budget limits with real-time recalculation.

- **Offline Persistence & Data Management**:
  - Seamless persistence across browser refreshes using `localStorage`.
  - **Export to CSV**: Client-side RFC-4180 compliant CSV export of transaction logs.
  - **Demo Data Loader**: Pre-loads realistic student expenses (hostel mess, college canteen, metro passes, data recharge, semester scholarship).
  - **Reset Data**: Safe factory reset option with double-check confirmation dialog.

- **Theme & Internationalization**:
  - Dark Mode and Light Mode support with smooth transition and saved preference.
  - Multi-currency support (Default: Indian Rupee `₹ INR`, USD `$`, EUR `€`, GBP `£`).

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) (Functional Components & Hooks)
- **Language**: JavaScript (ES6+ / JSX)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Storage**: Browser `localStorage` (Offline-first architecture)

---

## 📸 Screenshots

> *Add application screenshots or GIF walkthroughs here:*
>
> 1. **Dashboard Overview**: `![Dashboard](docs/screenshots/dashboard.png)`
> 2. **Transactions Table & Filters**: `![Transactions](docs/screenshots/transactions.png)`
> 3. **Analytics & Donut Charts**: `![Analytics](docs/screenshots/analytics.png)`
> 4. **Budgets & Utilization**: `![Budgets](docs/screenshots/budgets.png)`
> 5. **Dark Mode Theme**: `![Dark Mode](docs/screenshots/dark_mode.png)`

---

## 🚀 Installation & Setup

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) installed.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/student-expense-tracker.git
   cd student-expense-tracker
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Visit `http://localhost:3000` to interact with the application.

---

## 📦 Production Build

To generate an optimized production bundle:

```bash
npm run build
```

The compiled output will be generated in the `dist/` directory, ready to deploy to Vercel, Netlify, or GitHub Pages.

To preview the production build locally:

```bash
npm run preview
```

---

## 🌐 Live Demo

- **Live URL**: [https://student-expense-tracker-demo.vercel.app](https://student-expense-tracker-demo.vercel.app) *(Replace with your deployed URL)*

---

## 🔗 Repository

- **GitHub**: [https://github.com/your-username/student-expense-tracker](https://github.com/your-username/student-expense-tracker) *(Replace with your repository link)*

---

## 🔮 Future Improvements

- **Backend Integration**: Node.js/Express or Supabase backend with PostgreSQL for multi-device sync.
- **Authentication**: Secure student sign-up / login via Firebase or NextAuth.
- **Splitwise-style Group Expenses**: Split hostel bills and project expenses among roommates and batchmates.
- **Receipt OCR**: Upload canteen and bookstore bill images for automated expense entry.
- **Progressive Web App (PWA)**: Offline mobile app installation on Android and iOS.

---

## 📄 License

MIT License — Feel free to use and adapt this project for your portfolio, resume, or campus projects!
