# 🌟 Creatorverse

A React application for showcasing and managing your favorite content creators. Built with Vite, React Router, and Supabase.

## 📋 Features

### Required Features
- [x] Use a logical component structure in React to create the frontend of the app
- [x] Display content creators on the homepage of the app
- [x] Each content creator item includes:
  - Their name
  - A link to their channel or page
  - A short description of their content
- [x] API calls use the async/await design pattern
- [x] Clicking on a content creator item takes the user to their details page
- [x] Each content creator has their own unique URL
- [x] The user can edit a content creator to change their name, url, or description
- [x] The user can delete a content creator
- [x] The user can add a new content creator by entering a name, url, and description
- [x] The new content creator then appears in the displayed list

### Stretch Features
- [x] Use PicoCSS to style HTML elements
- [x] Display content creator items in a creative format (cards)
- [x] Show an image of each content creator on their card

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm
- A Supabase account

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd creatorverse
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:
   - Go to [Supabase](https://supabase.com) and create a new project
   - Create a table called `creators` with the following columns:
     - `id` (int8, primary key, auto-generated)
     - `created_at` (timestamptz, default: now())
     - `name` (text)
     - `url` (text)
     - `description` (text)
     - `imageURL` (text, nullable)

4. Configure the Supabase client:
   - Open `src/client.js`
   - Replace `YOUR_SUPABASE_PROJECT_URL` with your Supabase Project URL
   - Replace `YOUR_SUPABASE_ANON_KEY` with your Supabase Anon Key

5. Start the development server:
```bash
npm run dev
```

## 📁 Project Structure

```
creatorverse/
├── src/
│   ├── components/
│   │   ├── Card.jsx          # Content creator card component
│   │   └── Card.css          # Card styles
│   ├── pages/
│   │   ├── ShowCreators.jsx  # Homepage - displays all creators
│   │   ├── ViewCreator.jsx   # View single creator details
│   │   ├── AddCreator.jsx    # Add new creator form
│   │   └── EditCreator.jsx   # Edit/delete creator form
│   ├── App.jsx               # Main app with routes
│   ├── App.css               # Global app styles
│   ├── client.js             # Supabase client configuration
│   ├── index.css             # Base styles + PicoCSS
│   └── main.jsx              # React entry point
├── package.json
└── README.md
```

## 🛠️ Tech Stack

- **React** - Frontend library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Supabase** - Backend as a Service (BaaS) for database
- **PicoCSS** - Minimal CSS framework

## 📸 Video Walkthrough

<!-- Add your video walkthrough here -->
<!-- Example: ![Video Walkthrough](./walkthrough.gif) -->

## 📝 License

This project is part of CodePath's WEB103 course.
