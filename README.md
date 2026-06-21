# Millennium Brains

How to run the website locally.

## Prerequisites

Please download:
- [Node.js](https://nodejs.org/) (v18 or newer, includes npm)

## Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/jibi2n/millennium-brains.git
   ```
2. Go into the project folder:
   ```bash
   cd millennium-brains
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   Alternatively, you may check a production server.
   For that, you need the .env.local file, you may ask for it in the Telegram GC or ask in person.
   Then, start the prod server:
   ```bash
   npm run build
   npx wrangler dev --config dist/server/wrangler.json
   ```
   Then, ctrl+click the link it gives you. (It should be smth like http://localhost:8787)
   
5. Open the website in your browser:
   ```
   http://localhost:8080
   ```
   !note: look at your terminal and click the link it gives you.

## Other commands

- Build for production: `npm run build`

If the app is deployed and running properly, you may see it at https://millennium-brains.hytfoundationinterns-dreamacademy.workers.dev
