# STOCKTRACKER

a Next.js app that uses the AlphaAdvantge API to fetch data about a company's stock ticker and a basic 
overview of the company. The user clicks on the company's card on the homepage and is then sent
to their respective information page containing the tickers information.

# GETTING STARTED

git clone https://github.com/Pizzamozzerella/stocktracker.git
cd stocktracker

## 2. Install dependencies
npm install

### 3. Set up environment variables
Copy the example env file and fill in your API key:
cp .env.example .env.local

Get a free API key at https://www.alphavantage.co/support/#api-key
then open .env.local and replace your_key_here with your actual key.

### 4. Run the development server
npm run dev

Open http://localhost:3000 in your browser.