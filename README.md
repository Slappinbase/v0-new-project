# SolXtreme Dashboard

A comprehensive Solana dashboard with real-time market data, Jupiter swap integration, Grok AI analysis, TradingView charts, pump.fun trending tokens, and liquidity information.

## Features

- Real-time Solana token price data
- Jupiter aggregator for token swaps
- Grok AI-powered market analysis
- TradingView-style price charts
- pump.fun trending tokens
- Liquidity pool information
- Responsive design for all devices

## Deployment on Render

1. Fork this repository
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Use the following settings:
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Add the required environment variables:
   - `NEXT_PUBLIC_JUPITER_API_URL`: Jupiter API URL
   - `NEXT_PUBLIC_GROK_API_URL`: Grok API URL
   - `GROK_API_KEY`: Your Grok API key
6. Deploy the service

## Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env.local` file with the required environment variables
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technologies Used

- Next.js 14
- Tailwind CSS
- shadcn/ui components
- Jupiter API
- Grok AI
- Canvas API for charts
