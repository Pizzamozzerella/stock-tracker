//d3P64P7FBSVDEPJY3
import styles from './page.module.css'
interface PageProps{
    params: {
        symbol: string;
    };
}

interface DailyValues {
    "1. open": string;
    "2. high": string;
    "3. low": string;
    "4. close": string;
    "5. volume": string;
}
interface CompanyOverview {
    Symbol: string;
    Name: string;
    Description: string;
    Exchange: string;
    Currency: string;
    Country: string;
    Sector: string;
    Industry: string;
}
interface TickerResponse {
    "Meta Data": Record<string, string>;
    "Time Series (Daily)"?: Record<string, DailyValues>;
}

const getTickerPricesDaily = async (symbol: string): Promise<TickerResponse> => {

    const res = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=demo`);

    if (!res.ok) {
        throw new Error('Could not retrieve prices');
    }
    return res.json();
};
const TickerPriceDailysList = ({ data }: { data: TickerResponse }) => {
    const timeSeries = data["Time Series (Daily)"];
    if (!timeSeries) {
        return <p className={styles.noData}>No Ticker Data Available</p>;
    }

    const entries = Object.entries(timeSeries);

    return (
        <div className={styles.tickerContainer}>
            {entries.map(([date, values], index) => {
                const currentClosePrice = parseFloat(values["4. close"]);
                const prevEntry = entries[index + 1];
                const prevClosePrice = prevEntry ? parseFloat(prevEntry[1]["4. close"]) : null;
                const percentChange = prevClosePrice
                    ? (((currentClosePrice - prevClosePrice) / prevClosePrice) * 100).toFixed(2)
                    : null;

                return (
                    <div key={date} className={styles.tickerRow}>
                        <span className={styles.date}>{date}</span>
                        <span className={styles.price}>Close: {values["4. close"]}</span>
                        <span className={styles.volume}>Vol: {values["5. volume"]}</span>
                        {percentChange !== null && (
                            <span className={Number(percentChange) >= 0 ? styles.positive : styles.negative}>
                                {Number(percentChange) >= 0 ? "+" : ""}{percentChange}%
                            </span>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

const getCompanyOverview = async (symbol: string): Promise<CompanyOverview>  => {

    const res = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=demo`);

    if(!res.ok){
        throw new Error('Count not retrieve company');
    }
    return res.json();
};

const CompanyOverviewList =  ({company }: {company: CompanyOverview }) => {
 return (
        <div className={styles.companyContainer}>
            <div className={styles.companyHeader}>
                <h1 className={styles.companyName}>{company.Name}</h1>
                <span className={styles.symbol}>{company.Symbol}</span>
            </div>
            <div className={styles.companyDetails}>
                <p className={styles.description}>{company.Description}</p>
                <div className={styles.statsRow}>
                    <div className={styles.stat}>
                        <span className={styles.statLabel}>Exchange</span>
                        <span className={styles.statValue}>{company.Exchange}</span>
                    </div>
                    <div className={styles.stat}>
                        <span className={styles.statLabel}>Sector</span>
                        <span className={styles.statValue}>{company.Sector}</span>
                    </div>
                    <div className={styles.stat}>
                        <span className={styles.statLabel}>Industry</span>
                        <span className={styles.statValue}>{company.Industry}</span>
                    </div>
                    <div className={styles.stat}>
                        <span className={styles.statLabel}>Market Cap</span>
                        <span className={styles.statValue}>{company.MarketCapitalization}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default async function Home({ params }: PageProps) {
        const{ symbol } = await params;
        const [company, tickerData] = await Promise.all([
        getCompanyOverview(symbol),
        getTickerPricesDaily(symbol),
    ]);

  return (
        <div>
            <CompanyOverviewList company={company}/>
            <TickerPriceDailysList data={tickerData}/>
        </div>
  );
}
