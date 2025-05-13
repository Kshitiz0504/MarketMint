import React from 'react'
import './Coin.css'
import { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext'
import LineChart from '../../components/LineChart/Linechart'

const Coin = () => {

    const {coinId} = useParams();
    const [coinData, setCoinData] = useState();
    const [historicalData, setHistoricalData] = useState();
    const {currency} = useContext(CoinContext);

    const fetchCoinData = async () => {
        try {
          const response = await fetch(`/api/coinData?coinId=${coinId}`);
          const data = await response.json();
          setCoinData(data);
        } catch (err) {
          console.error('Error fetching coin data:', err);
        }
      };
      
      const fetchHistoricalData = async () => {
        try {
          const response = await fetch(`/api/historicalData?coinId=${coinId}&currency=${currency.name}`);
          const data = await response.json();
          setHistoricalData(data);
        } catch (err) {
          console.error('Error fetching historical data:', err);
        }
      };
      

    useEffect(()=>{
        fetchCoinData();
        fetchHistoricalData();
    }, [currency])


    if(coinData && historicalData) {
        return (
            <div className='coin'>
                <div className="coin-name">
                <img src={coinData.image.large} alt="" />
                <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
            
                </div>
                <div className="coin-chart">
                    <LineChart historicalData={historicalData}/>
                </div>
                <div className="coin-info">
                    <ul>
                        <li> Crypto Market Rank </li>
                        <li> {coinData.market_cap_rank}</li>
                    </ul>

                    <ul>
                        <li> Current Price </li>
                        <li> {currency.symbol} {coinData.market_data.current_price [currency.name].toLocaleString()} </li>
                    </ul>

                    <ul>
                        <li> Market Cap </li>
                        <li> {currency.symbol} {coinData.market_data.market_cap [currency.name].toLocaleString()} </li>
                    </ul>

                    <ul>
                        <li> 24 Hour High </li>
                        <li> {currency.symbol} {coinData.market_data.high_24h [currency.name].toLocaleString()} </li>
                    </ul>

                    <ul>
                        <li> 24 Hour Low </li>
                        <li> {currency.symbol} {coinData.market_data.low_24h [currency.name].toLocaleString()} </li>
                    </ul>
                </div>
            </div>
        )
    }
    else{
        return(
            <div className="spinner">
                <div className="spin"></div>
            </div>
        )
    }

}

export default Coin