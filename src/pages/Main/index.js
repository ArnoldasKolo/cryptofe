import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import styles from "./styles.module.scss"

const Index = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const chartRefs = useRef({});

  const fetchAllCoins = async () => {
    try {
      const response = await axios.get(
        "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD"
      );

      const { Data } = response.data;
      setCryptoData(Data);
    } catch (error) {
      console.error("Error fetching cryptocurrency data:", error);
    }
  };

  useEffect(() => {
    fetchAllCoins();
  }, []);

  useEffect(() => {
    // Create a chart for each cryptocurrency
    cryptoData.forEach((crypto) => {
      const ctx = document.getElementById(`chart-${crypto.CoinInfo.Id}`);
      if (ctx) {
        // Destroy existing chart
        if (chartRefs.current[crypto.CoinInfo.Id]) {
          chartRefs.current[crypto.CoinInfo.Id].destroy();
        }

        // Create a new chart
        chartRefs.current[crypto.CoinInfo.Id] = new Chart(ctx, {
          type: "line",
          data: {
            labels: ["Low", "Open", "High"],
            datasets: [
              {
                label: `${crypto.CoinInfo.FullName} Prices Of the Day`,
                backgroundColor: ["white", "white", "white"],
                borderColor: ["#63fb90", "#63fb90", "#63fb90"],
                data: [
                  crypto.RAW.USD.LOWDAY,
                  crypto.RAW.USD.OPENDAY,
                  crypto.RAW.USD.HIGHDAY,
                ],
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: false, // Allow y-axis to start from non-zero value
                ticks: {
                  precision: 2, // Set the precision of y-axis labels
                },
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const label = context.dataset.label || "";
                    const value = context.parsed.y.toFixed(2); // Display two decimal places
                    return `${label}: ${value}`;
                  },
                },
              },
            },
          },
        });
      }
    });
  }, [cryptoData]);

  return (
    <div>
      <h1>Crypto Chart</h1>
      <div className={styles.cryptoWrapper}>
        {cryptoData.map((crypto) => (
          <div key={crypto.CoinInfo.Id} className="crypto-item ">
            <h2 className="text-light">{crypto.CoinInfo.FullName}</h2>
            <p>Symbol: {crypto.CoinInfo.Name}</p>
            <div className="price-chart">
              <canvas
                id={`chart-${crypto.CoinInfo.Id}`}
                width={400}
                height={200}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
