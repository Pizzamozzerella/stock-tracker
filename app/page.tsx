import Link from 'next/link'

const tickers = [
    { symbol: "IBM", name: "IBM", domain: "ibm.com", marketCap: "$154B" },
    { symbol: "AAPL", name: "Apple", domain: "apple.com", marketCap: "$3.1T" },
    { symbol: "GOOGL", name: "Alphabet", domain: "google.com", marketCap: "$2.1T" },
    { symbol: "MSFT", name: "Microsoft", domain: "microsoft.com", marketCap: "$3.0T" },
    { symbol: "NVDA", name: "NVIDIA", domain: "nvidia.com", marketCap: "$2.2T" },
    { symbol: "AVGO", name: "Broadcom", domain: "broadcom.com", marketCap: "$780B" },
    { symbol: "ORCL", name: "Oracle", domain: "oracle.com", marketCap: "$410B" },
    { symbol: "CSCO", name: "Cisco", domain: "cisco.com", marketCap: "$198B" },
    { symbol: "SNOW", name: "Snowflake", domain: "snowflake.com", marketCap: "$43B" },
    { symbol: "PLTR", name: "Palantir", domain: "palantir.com", marketCap: "$57B" },
    { symbol: "CRWD", name: "CrowdStrike", domain: "crowdstrike.com", marketCap: "$80B" },
    { symbol: "AMZN", name: "Amazon", domain: "amazon.com", marketCap: "$1.9T" },
    { symbol: "META", name: "Meta", domain: "meta.com", marketCap: "$1.3T" },
    { symbol: "NFLX", name: "Netflix", domain: "netflix.com", marketCap: "$280B" },
    { symbol: "UBER", name: "Uber", domain: "uber.com", marketCap: "$130B" },
    { symbol: "SPOT", name: "Spotify", domain: "spotify.com", marketCap: "$60B" },
];


const TickerCard = ({ symbol, name, domain, marketCap }: { 
    symbol: string; 
    name: string; 
    domain: string;
    marketCap: string;
}) => {
    return (
        <Link href={`/tickerCompany/${symbol}`} style={{ textDecoration: 'none' }}>
            <div className="card">
                <img
                    src={`https://logo.clearbit.com/${domain}`}
                    alt={`${name} logo`}
                    className="logo"
                />
                <div className="card-info">
                    <span className="company-name">{name}</span>
                    <span className="symbol">{symbol}</span>
                    <span className="market-cap">Mkt Cap: {marketCap}</span>
                </div>
            </div>
        </Link>
    );
};
export default function Home() {
  return (
        <main className="main">
            <h1 className="title">Market<span className="accent">Watch</span></h1>
            <p className="subtitle">Select a company to view live ticker data</p>
            <div className="grid">
                {tickers.map((ticker) => (
                    <TickerCard key={ticker.symbol} {...ticker} />
                ))}
            </div>
        </main>
  );
}
