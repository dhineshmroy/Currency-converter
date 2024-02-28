import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setfromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    const getExchangeRate = async () => {
      try{
        let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        const response = await axios.get(url);
        console.log(response);
        setExchangeRate(response.data.rates[toCurrency]);
      }catch(error){
        console.log("Error occur while getting details: ", error);
      }
    }
    getExchangeRate();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if(exchangeRate !== null){
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    }
  }, [amount, exchangeRate])

  const handleAmount = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  }
  

  return (
    <>
      <div className="currency-converter">
        <div className="box"></div>
        <div className="data">
          <h1>Curency Convertor</h1>
          <div className="input-container">
            <label htmlFor="amt">Amount :</label>
            <input type="number" id="amt" onChange={handleAmount} value={amount} />
          </div>
          <div className="input-container">
            <label htmlFor="fromCurrency">From Currency :</label>
            <select id="fromCurrency" value={fromCurrency} onChange={(e) => {setfromCurrency(e.target.value)}}>
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="toCurrency">To Currency :</label>
            <select id="toCurrency" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>
          <div className="result">
            <p>{amount} {fromCurrency} is equals {convertedAmount} {toCurrency}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
