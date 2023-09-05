import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import styles from "./styles.module.scss";
import Header from "@/Components/HeaderLogged/Header";
import Cookies from 'js-cookie';
import Footer from "../../Components/Footer/footer"

const Index = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [filter, setFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState(0); // Price filter state
  const [inputValid, setInputValid] = useState(true); // To track input validity
  const [errorMessage, setErrorMessage] = useState(""); // To store error message

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

  const filteredCrypto = cryptoData.filter(
    (crypto) =>
      crypto.CoinInfo.FullName.toLowerCase().includes(filter.toLowerCase()) &&
      crypto.RAW.USD.HIGHDAY >= priceFilter // Filter by price
  );

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
            responsive: true, // Make the chart responsive
            maintainAspectRatio: false, // Prevent the chart from maintaining aspect ratio
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
    axios
      .post("https://cryptobe.adaptable.app/userLogData", filteredCrypto,{
        headers: {
          authorization:  Cookies.get('UserToken'),
        },
      })
      .then((response) => {
        console.log(response.data); 
      })
      .catch((error) => {
        console.error("Error sending filtered data to the backend:", error);
      });
  }, [cryptoData,filteredCrypto]);

  return (
    <div>
      <Header />
      {filteredCrypto.length === 0 && (
        <div className={styles.errorMessage}>No items match your search.</div>
      )}

      <div className={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Search"
          value={filter}
          onChange={(event) => {
            const inputValue = event.target.value;
            if (inputValue.length <= 30) {
              setFilter(inputValue);
              setInputValid(true);
              setErrorMessage("");
            } else {
              setInputValid(false);
              setErrorMessage("Input should not exceed 30 characters.");
            }
          }}
          className={`${styles.searchInput} ${
            !inputValid ? styles.redInput : ""
          }`}
          maxLength={30}
        />
      </div>
      <div className={styles.searchWrapper}>
        <input
          type="range"
          min="0"
          max="30000"
          step={1000}
          value={priceFilter}
          onChange={(event) => setPriceFilter(Number(event.target.value))}
          className={`${styles.range} ${styles.customRange}`}
        />
      </div>
      <div className={styles.priceText}>Price Filter ${priceFilter}</div>

      <h1>Crypto Chart</h1>
      <div className={styles.cryptoWrapper}>
        {filteredCrypto.map((crypto) => (
          <div key={crypto.CoinInfo.Id} className="crypto-item ">
            <h2 className="text-light">{crypto.CoinInfo.FullName}</h2>
            <p>Symbol: {crypto.CoinInfo.Name}</p>
            <div className="price-chart">
              <canvas
                id={`chart-${crypto.CoinInfo.Id}`}
                className={styles.chartCanvas} // Add the chart canvas class here
              />
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Index;
