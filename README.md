# Code Quest: The Path of the Programmer

![Code Quest Logo](public/logo.svg)

## Overview

Code Quest is an interactive, gamified learning platform designed to teach programming concepts through an engaging adventure. Players embark on a journey to become master programmers, learning everything from basic programming concepts to advanced frameworks and languages.

## Features

### 🎮 Immersive Learning Experience

- **Interactive Storyline**: Progress through a narrative that introduces programming concepts in context
- **Multiple Themes**: Choose between Fantasy, Cyberpunk, and Space themes to customize your experience
- **User Authentication**: Secure sign-up and login system with persistent sessions
- **Profile System**: Track your progress, XP, level, and achievements

### 🤖 Adaptive Learning System

- **Personalized Difficulty**: Dynamic challenge levels based on your performance
- **AI-Powered Challenges**: Generate custom coding challenges using OpenAI (optional)
- **Smart Recommendations**: AI suggestions for what to learn next based on your strengths and weaknesses
- **Spaced Repetition**: Optimized review scheduling to maximize long-term retention

### 💻 Comprehensive Coding Challenges

- **Fundamental Concepts**: Variables, conditionals, loops, functions, and data structures
- **Multiple Languages**: JavaScript, HTML, CSS, Python, Java, Ruby, Go, C#, and Swift
- **Frameworks & Libraries**: React, Django, Flask, and Tailwind CSS
- **Real-time Code Execution**: Test your code directly in the browser

### 🚀 Expanded Language Tracks

- **Additional Languages**: Java, Ruby, Go, C#, and Swift
- **Specialized Paths**: Data Science, Mobile Development, and Game Development
- **Advanced Topics**: Design Patterns, Algorithms, and System Architecture

### 🏆 Progress Tracking

- **Skill Leveling**: Gain experience and level up as you complete challenges
- **Cloud Storage**: All progress saved to Neon PostgreSQL database
- **Achievement System**: Earn achievements for completing quests and mastering skills
- **Performance Metrics**: Track your coding performance over time

## Technologies Used

### Frontend
- **React 19**: Modern UI framework with latest features
- **Vite**: Lightning-fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing

### Backend & Database
- **Neon PostgreSQL**: Serverless PostgreSQL database
- **Prisma ORM**: Type-safe database client and schema management
- **@neondatabase/serverless**: Browser-compatible PostgreSQL driver

### AI & APIs
- **OpenAI GPT-4**: AI-powered challenge generation (optional)

### Authentication
- **Custom Auth System**: Email/password authentication with encrypted passwords
- **Session Management**: Secure session handling with localStorage

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**
- **Neon Account** (free tier available at [neon.tech](https://neon.tech))
- **OpenAI API Key** (optional, for AI features)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/code-quest.git
   cd code-quest
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Neon Database**

   a. Create a Neon account at [console.neon.tech](https://console.neon.tech)

   b. Create a new project

   c. Copy your connection string from the dashboard

4. **Configure environment variables**

   Create a `.env` file in the root directory:

   ```env
   # Neon Database (Required)
   VITE_DATABASE_URL=postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
   DATABASE_URL=postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
   DIRECT_URL=postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require

   # OpenAI API (Optional - for AI-generated challenges)
   VITE_OPENAI_API_KEY=sk-proj-your-api-key-here
   ```

5. **Set up the database schema**

   ```bash
   npm run setup-db
   ```

   This will create all necessary tables in your Neon database.

6. **Start the development server**

   ```bash
   npm run dev
   ```

7. **Open your browser**

   Navigate to `http://localhost:5173`

## Usage

1. **Sign Up**: Create an account with your email and password
2. **Log In**: Access your account and all your saved progress
3. **Choose a Theme**: Select your preferred visual theme (Fantasy, Cyberpunk, or Space)
4. **Complete Challenges**: Solve coding challenges to earn XP and level up
5. **Track Your Progress**: View your skills, XP, level, and achievements in your profile

## Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Set up database (create tables)
npm run setup-db

# Push schema changes to database
npm run db:push

# Open Prisma Studio (database GUI)
npm run db:studio

# Generate Prisma Client
npm run db:generate

# Test database connection
npm run test-db

# Lint code
npm run lint
```

## Database Architecture

### Database Provider: Neon PostgreSQL

Code Quest uses **Neon** - a serverless PostgreSQL database that provides:
- ✅ **Serverless**: Auto-scaling and pay-per-use pricing
- ✅ **Branching**: Database branching for development
- ✅ **Fast**: Low-latency connections worldwide
- ✅ **Free Tier**: Generous free tier for development

### Schema Overview

The app uses the following database tables:

| Schema | Table | Description |
|--------|-------|-------------|
| `auth` | `users` | User authentication (email, encrypted password) |
| `public` | `profiles` | User profiles (username, XP, level, theme) |
| `public` | `skills` | Programming language skill levels |
| `public` | `challenges` | Pre-defined coding challenges |
| `public` | `completed_challenges` | User progress tracking |
| `public` | `performance_metrics` | Performance analytics |
| `public` | `ai_challenges` | AI-generated challenges |

### Key Features

- **Row Level Security (RLS)**: Users can only access their own data
- **Automatic Triggers**: New users automatically get profile, skills, and metrics records
- **UUID Primary Keys**: Using `gen_random_uuid()` for secure IDs
- **JSON Fields**: Flexible storage for metadata and test cases
- **Timestamps**: Automatic `created_at` and `updated_at` tracking

## Code Structure

```
code-quest/
├── prisma/
│   └── schema.prisma          # Database schema definition
├── src/
│   ├── lib/
│   │   └── prisma.js          # Prisma client singleton
│   ├── dbClient.js            # Database client with Supabase-compatible API
│   ├── supabaseClient.js      # Re-exports dbClient for compatibility
│   ├── openaiClient.js        # OpenAI API client
│   ├── EnhancedCodeQuest.jsx  # Main game component
│   ├── CodePlayground.jsx     # Interactive code editor
│   ├── challengesData.js      # Challenge definitions
│   └── App.jsx                # Root application component
├── .env                       # Environment variables (not in git)
└── package.json               # Dependencies and scripts
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_DATABASE_URL` | ✅ Yes | Neon PostgreSQL connection string (for frontend) |
| `DATABASE_URL` | ✅ Yes | Neon PostgreSQL connection string (for Prisma) |
| `DIRECT_URL` | ✅ Yes | Direct Neon connection (for migrations) |
| `VITE_OPENAI_API_KEY` | ⚠️ Optional | OpenAI API key for AI-generated challenges |

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Import your repository in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables
6. Deploy!

**Note**: Your Neon database is already in the cloud, so no additional database setup is needed for deployment.

## Future Enhancements

- ✅ ~~Cloud synchronization~~ (Already implemented with Neon!)
- Real-time multiplayer challenges and competitions
- Additional programming languages and frameworks
- Mobile application support (React Native)
- Expanded storyline with branching paths
- Code review and feedback system
- Leaderboards and rankings
- Social features (friends, teams)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Troubleshooting

### Database Connection Issues

**Error**: "Database not configured"
- Make sure `VITE_DATABASE_URL` is set in your `.env` file
- Restart the dev server after changing `.env`

**Error**: "Connection refused"
- Verify your Neon connection string is correct
- Check that your Neon project is active
- Ensure the connection string includes `?sslmode=require`

### Authentication Issues

**Error**: "null value in column 'id' violates not-null constraint"
- Run `npm run db:push` to update the database schema
- Make sure the `pgcrypto` extension is enabled

**Can't log in after signing up**
- Clear browser localStorage: Open DevTools Console and run `localStorage.clear()`
- Check browser console for errors
- Verify the `auth.users` table exists in your database

### Prisma Issues

**Error**: "Prisma Client not generated"
- Run: `npm run db:generate`

**Error**: "Can't reach database server"
- Check your `DATABASE_URL` in `.env`
- Verify your Neon project is active
- Test connection: `npm run test-db`

## Resources

- [Neon Documentation](https://neon.tech/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Acknowledgments

- Thanks to all the open-source libraries that made this project possible
- Inspired by the gamification of learning platforms like Codecademy and freeCodeCamp
- Built with [Neon](https://neon.tech) - Serverless PostgreSQL
- Powered by [Prisma](https://www.prisma.io) - Next-generation ORM

---

**Designed and developed with ❤️ by Elisee Kajingu**

**Tech Stack**: React 19 • Vite • Tailwind CSS • Neon PostgreSQL • Prisma • OpenAI
