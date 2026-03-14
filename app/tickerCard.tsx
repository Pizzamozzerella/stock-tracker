"use client";

import Link from 'next/link';
import Image from 'next/image';

const TickerCard = ({ symbol, name, domain, marketCap }: {
    symbol: string;
    name: string;
    domain: string;
    marketCap: string;
}) => {
    return (
        <Link href={`/tickerCompany/${symbol}`} style={{ textDecoration: 'none' }}>
            <div className="card">
              <Image
                    src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
                    alt={`${name} logo`}
                    width={48}
                    height={48}
                    className="logo"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                    }}
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

export default TickerCard;