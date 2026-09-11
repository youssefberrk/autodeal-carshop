# AutoDeal — Luxury Car E-Commerce Platform

A modern, responsive car e-commerce platform built with **Next.js, TypeScript, and Tailwind CSS**, designed to deliver a premium automotive shopping experience.

AutoDeal allows users to browse and search vehicles, explore detailed car information, manage a wishlist and shopping cart, authenticate with Google, and complete a checkout flow powered by Stripe.

**Built as a portfolio project to demonstrate modern frontend development, application architecture, responsive UI design, state management, form validation, authentication, and third-party service integration.**

---

## 🚗 Live Demo

**[Live Demo](YOUR_DEPLOYED_URL)** · **[GitHub Repository](https://github.com/youssefberrk/autodeal-carshop)**

> Replace `YOUR_DEPLOYED_URL` with the production URL after deployment.

---

## ✨ Features

### Vehicle Discovery

* Browse a curated catalog of luxury vehicles
* Filter vehicles by manufacturer and category
* Search across available vehicles
* Dedicated pages for new arrivals and pre-owned vehicles
* Detailed vehicle pages with specifications, pricing, imagery, and related information
* Responsive vehicle cards and layouts

### Shopping Experience

* Add vehicles to a shopping cart
* Update quantities and remove items
* Persistent client-side cart state
* Add and remove vehicles from a wishlist
* Review selected vehicles before checkout
* Responsive shopping experience across desktop, tablet, and mobile

### Checkout & Payments

* Multi-field checkout form
* Form validation with React Hook Form and Zod
* Order summary and pricing breakdown
* Stripe-powered payment flow
* Order confirmation experience

### Authentication & User Experience

* Google OAuth authentication
* Authenticated user profile
* Order history
* User-specific wishlist and shopping experience
* Protected application flows where authentication is required

### Communication

* Transactional email integration with Resend
* React Email templates for structured email content
* Order-related email notifications

### UI / UX

* Premium automotive-inspired visual design
* Fully responsive layouts
* Reusable React components
* Tailwind CSS utility-based styling
* shadcn/ui components
* Lucide and React Icons
* Responsive navigation and mobile menus
* Image galleries and interactive UI elements
* Accessible form controls and feedback states

---

## 🛠️ Tech Stack

| Category         | Technology                     |
| ---------------- | ------------------------------ |
| Framework        | **Next.js 16** — App Router    |
| Language         | **TypeScript**                 |
| UI               | **React 19**                   |
| Styling          | **Tailwind CSS 4**             |
| Components       | **shadcn/ui**                  |
| State Management | **Zustand**                    |
| Authentication   | **NextAuth.js / Auth.js**      |
| Forms            | **React Hook Form**            |
| Validation       | **Zod**                        |
| Payments         | **Stripe**                     |
| Email            | **Resend + React Email**       |
| Icons            | **Lucide React + React Icons** |
| Package Manager  | **pnpm**                       |

---

## 🧩 Application Architecture

The project is organized around Next.js App Router conventions with reusable components and feature-specific client/server logic.

```text
app/
├── about/
├── checkout/
├── contact/
├── details/[id]/
├── login/
├── new-arrivals/
├── orders/
├── pre-owned/
├── profile/
├── search/
├── shop/
├── wishlist/
└── ...

components/
├── cards/
├── checkout/
├── navbar/
├── sections/
├── search/
└── ...

lib/
├── data/
├── utilities/
└── ...

public/
└── images/
```

The application separates reusable UI components, application logic, static vehicle data, and page-level routes to keep the codebase maintainable as the project grows.

---

## 🔄 Core User Flow

The primary shopping experience follows this flow:

```text
Browse Vehicles
      ↓
Search / Filter
      ↓
Vehicle Details
      ↓
Wishlist / Add to Cart
      ↓
Review Cart
      ↓
Checkout
      ↓
Stripe Payment
      ↓
Order Confirmation
```

This flow was designed to demonstrate a realistic e-commerce frontend rather than a collection of disconnected pages.

---

## 🔐 Authentication

Authentication is implemented using **Google OAuth** through NextAuth/Auth.js.

Users can sign in with their Google account and access authenticated functionality such as their profile and order-related features.

Authentication credentials and secrets are stored through environment variables and are not committed to the repository.

---

## 💳 Payments

The checkout experience integrates **Stripe** to demonstrate a realistic payment workflow.

The project uses Stripe's test environment for portfolio/demo purposes.

> No real vehicle purchases are processed through this project.

---

## 📧 Transactional Emails

**Resend** is used for transactional email functionality, with **React Email** used to structure reusable email templates.

This demonstrates integration with an external email service while keeping email templates component-based and maintainable.

---

## 📱 Responsive Design

AutoDeal was designed to provide a consistent experience across:

* 📱 Mobile devices
* 📲 Tablets
* 💻 Laptops
* 🖥️ Desktop displays

Responsive behavior is implemented throughout the application, including:

* Navigation
* Vehicle grids
* Filters
* Vehicle details
* Image galleries
* Cart
* Checkout
* Forms
* Footer
* Search interfaces

The goal was not simply to scale the desktop layout down, but to adapt the interface and interactions to different screen sizes.

---

## 🧠 Development Focus

This project was built to practice and demonstrate several real-world frontend development concepts:

* Building a multi-page application with the Next.js App Router
* Designing reusable React components
* Managing client-side application state with Zustand
* Building validated forms with React Hook Form and Zod
* Implementing authentication flows
* Integrating third-party APIs and services
* Building responsive layouts with Tailwind CSS
* Structuring a scalable frontend codebase
* Handling loading, empty, and error states
* Preparing a production-ready Next.js application

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

* **Node.js** — current LTS version
* **pnpm**

### Installation

Clone the repository:

```bash
git clone https://github.com/youssefberrk/autodeal-carshop.git
```

Navigate into the project:

```bash
cd autodeal-carshop
```

Install dependencies:

```bash
pnpm install
```

### Environment Variables

Create a `.env.local` file in the project root.

Example:

```env
# Authentication
AUTH_SECRET=your_auth_secret
AUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Resend
RESEND_API_KEY=your_resend_api_key
```

> Environment variable names should match the ones used by the current application configuration. Never commit actual secrets or API keys to Git.

### Run the development server

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

---

## 🧪 Available Scripts

```bash
pnpm dev
```

Starts the development server with hot reloading.

```bash
pnpm lint
```

Runs ESLint checks.

```bash
pnpm build
```

Creates an optimized production build.

```bash
pnpm start
```

Runs the production build locally.

---

## 📦 Production Build

Before deployment, the application can be verified locally with:

```bash
pnpm lint
pnpm build
pnpm start
```

The production environment requires the appropriate authentication, Stripe, and Resend environment variables to be configured through the deployment platform.

---

## 🎯 Project Purpose

AutoDeal was created as a **frontend portfolio project** to explore how a modern e-commerce application can be designed and implemented using the React and Next.js ecosystem.

Rather than focusing only on the visual presentation, the project aims to demonstrate the complete frontend experience:

**discovery → product details → cart → authentication → checkout → payment → orders**

The project also provided an opportunity to work with real-world concerns such as responsive design, form validation, client-side state management, authentication, external service integration, and production deployment.

---

## 🔮 Future Improvements

Possible future iterations include:

* Backend/database integration for persistent user and order data
* More advanced inventory management
* Admin dashboard
* Server-side vehicle data management
* Advanced filtering and sorting
* Improved analytics and monitoring
* Additional authentication providers

These are intentionally left as future improvements rather than simulated functionality within the current portfolio version.

---

## 👨‍💻 About

AutoDeal is part of my frontend development portfolio, built to demonstrate my ability to design and develop modern web applications using **React, Next.js, TypeScript, and Tailwind CSS**.

**Developer:** Youssef Berrakouan

* GitHub: [@youssefberrk](https://github.com/youssefberrk)
* LinkedIn: [linkedin.com/in/youssef-berrakouan](https://www.linkedin.com/in/youssef-berrakouan)

---

## 📄 License

This project is a personal portfolio project.

The source code is publicly available for educational and portfolio review purposes. Please contact the author before reusing the project commercially.
# AutoDeal — Luxury Car E-Commerce Platform

A modern, responsive car e-commerce platform built with **Next.js, TypeScript, and Tailwind CSS**, designed to deliver a premium automotive shopping experience.

AutoDeal allows users to browse and search vehicles, explore detailed car information, manage a wishlist and shopping cart, authenticate with Google, and complete a checkout flow powered by Stripe.

**Built as a portfolio project to demonstrate modern frontend development, application architecture, responsive UI design, state management, form validation, authentication, and third-party service integration.**

---

## 🚗 Live Demo

**[Live Demo](YOUR_DEPLOYED_URL)** · **[GitHub Repository](https://github.com/youssefberrk/autodeal-carshop)**

> Replace `YOUR_DEPLOYED_URL` with the production URL after deployment.

---

## ✨ Features

### Vehicle Discovery

* Browse a curated catalog of luxury vehicles
* Filter vehicles by manufacturer and category
* Search across available vehicles
* Dedicated pages for new arrivals and pre-owned vehicles
* Detailed vehicle pages with specifications, pricing, imagery, and related information
* Responsive vehicle cards and layouts

### Shopping Experience

* Add vehicles to a shopping cart
* Update quantities and remove items
* Persistent client-side cart state
* Add and remove vehicles from a wishlist
* Review selected vehicles before checkout
* Responsive shopping experience across desktop, tablet, and mobile

### Checkout & Payments

* Multi-field checkout form
* Form validation with React Hook Form and Zod
* Order summary and pricing breakdown
* Stripe-powered payment flow
* Order confirmation experience

### Authentication & User Experience

* Google OAuth authentication
* Authenticated user profile
* Order history
* User-specific wishlist and shopping experience
* Protected application flows where authentication is required

### Communication

* Transactional email integration with Resend
* React Email templates for structured email content
* Order-related email notifications

### UI / UX

* Premium automotive-inspired visual design
* Fully responsive layouts
* Reusable React components
* Tailwind CSS utility-based styling
* shadcn/ui components
* Lucide and React Icons
* Responsive navigation and mobile menus
* Image galleries and interactive UI elements
* Accessible form controls and feedback states

---

## 🛠️ Tech Stack

| Category         | Technology                     |
| ---------------- | ------------------------------ |
| Framework        | **Next.js 16** — App Router    |
| Language         | **TypeScript**                 |
| UI               | **React 19**                   |
| Styling          | **Tailwind CSS 4**             |
| Components       | **shadcn/ui**                  |
| State Management | **Zustand**                    |
| Authentication   | **NextAuth.js / Auth.js**      |
| Forms            | **React Hook Form**            |
| Validation       | **Zod**                        |
| Payments         | **Stripe**                     |
| Email            | **Resend + React Email**       |
| Icons            | **Lucide React + React Icons** |
| Package Manager  | **pnpm**                       |

---

## 🧩 Application Architecture

The project is organized around Next.js App Router conventions with reusable components and feature-specific client/server logic.

```text
app/
├── about/
├── checkout/
├── contact/
├── details/[id]/
├── login/
├── new-arrivals/
├── orders/
├── pre-owned/
├── profile/
├── search/
├── shop/
├── wishlist/
└── ...

components/
├── cards/
├── checkout/
├── navbar/
├── sections/
├── search/
└── ...

lib/
├── data/
├── utilities/
└── ...

public/
└── images/
```

The application separates reusable UI components, application logic, static vehicle data, and page-level routes to keep the codebase maintainable as the project grows.

---

## 🔄 Core User Flow

The primary shopping experience follows this flow:

```text
Browse Vehicles
      ↓
Search / Filter
      ↓
Vehicle Details
      ↓
Wishlist / Add to Cart
      ↓
Review Cart
      ↓
Checkout
      ↓
Stripe Payment
      ↓
Order Confirmation
```

This flow was designed to demonstrate a realistic e-commerce frontend rather than a collection of disconnected pages.

---

## 🔐 Authentication

Authentication is implemented using **Google OAuth** through NextAuth/Auth.js.

Users can sign in with their Google account and access authenticated functionality such as their profile and order-related features.

Authentication credentials and secrets are stored through environment variables and are not committed to the repository.

---

## 💳 Payments

The checkout experience integrates **Stripe** to demonstrate a realistic payment workflow.

The project uses Stripe's test environment for portfolio/demo purposes.

> No real vehicle purchases are processed through this project.

---

## 📧 Transactional Emails

**Resend** is used for transactional email functionality, with **React Email** used to structure reusable email templates.

This demonstrates integration with an external email service while keeping email templates component-based and maintainable.

---

## 📱 Responsive Design

AutoDeal was designed to provide a consistent experience across:

* 📱 Mobile devices
* 📲 Tablets
* 💻 Laptops
* 🖥️ Desktop displays

Responsive behavior is implemented throughout the application, including:

* Navigation
* Vehicle grids
* Filters
* Vehicle details
* Image galleries
* Cart
* Checkout
* Forms
* Footer
* Search interfaces

The goal was not simply to scale the desktop layout down, but to adapt the interface and interactions to different screen sizes.

---

## 🧠 Development Focus

This project was built to practice and demonstrate several real-world frontend development concepts:

* Building a multi-page application with the Next.js App Router
* Designing reusable React components
* Managing client-side application state with Zustand
* Building validated forms with React Hook Form and Zod
* Implementing authentication flows
* Integrating third-party APIs and services
* Building responsive layouts with Tailwind CSS
* Structuring a scalable frontend codebase
* Handling loading, empty, and error states
* Preparing a production-ready Next.js application

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

* **Node.js** — current LTS version
* **pnpm**

### Installation

Clone the repository:

```bash
git clone https://github.com/youssefberrk/autodeal-carshop.git
```

Navigate into the project:

```bash
cd autodeal-carshop
```

Install dependencies:

```bash
pnpm install
```

### Environment Variables

Create a `.env.local` file in the project root.

Example:

```env
# Authentication
AUTH_SECRET=your_auth_secret
AUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Resend
RESEND_API_KEY=your_resend_api_key
```

> Environment variable names should match the ones used by the current application configuration. Never commit actual secrets or API keys to Git.

### Run the development server

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

---

## 🧪 Available Scripts

```bash
pnpm dev
```

Starts the development server with hot reloading.

```bash
pnpm lint
```

Runs ESLint checks.

```bash
pnpm build
```

Creates an optimized production build.

```bash
pnpm start
```

Runs the production build locally.

---

## 📦 Production Build

Before deployment, the application can be verified locally with:

```bash
pnpm lint
pnpm build
pnpm start
```

The production environment requires the appropriate authentication, Stripe, and Resend environment variables to be configured through the deployment platform.

---

## 🎯 Project Purpose

AutoDeal was created as a **frontend portfolio project** to explore how a modern e-commerce application can be designed and implemented using the React and Next.js ecosystem.

Rather than focusing only on the visual presentation, the project aims to demonstrate the complete frontend experience:

**discovery → product details → cart → authentication → checkout → payment → orders**

The project also provided an opportunity to work with real-world concerns such as responsive design, form validation, client-side state management, authentication, external service integration, and production deployment.

---

## 🔮 Future Improvements

Possible future iterations include:

* Backend/database integration for persistent user and order data
* More advanced inventory management
* Admin dashboard
* Server-side vehicle data management
* Advanced filtering and sorting
* Improved analytics and monitoring
* Additional authentication providers

These are intentionally left as future improvements rather than simulated functionality within the current portfolio version.

---

## 👨‍💻 About

AutoDeal is part of my frontend development portfolio, built to demonstrate my ability to design and develop modern web applications using **React, Next.js, TypeScript, and Tailwind CSS**.

**Developer:** Youssef Berrakouan

* GitHub: [@youssefberrk](https://github.com/youssefberrk)
* LinkedIn: [linkedin.com/in/youssef-berrakouan](https://www.linkedin.com/in/youssef-berrakouan)

---

## 📄 License

This project is a personal portfolio project.

The source code is publicly available for educational and portfolio review purposes. Please contact the author before reusing the project commercially.
