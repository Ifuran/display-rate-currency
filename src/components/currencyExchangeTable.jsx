import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useEffect, useState } from "react";

const currencyExchangeTable = () => {
  const currencies = ["CAD", "IDR", "JPY", "CHF", "EUR", "GBP"];
  const currencyApi = import.meta.env.VITE_CURRENCY_KEY;

  const [currencyRates, setCurrencyRates] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrency = async () => {
    if (!currencyApi) {
      setError("API KEY is missing!");
      setLoading(false);
    }

    try {
      const { data } = await axios.get(
        `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${currencyApi}`
      );
      setCurrencyRates(data.rates);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrency();
  }, []);

  const calculateBuyRate = (rate) => {
    return (parseFloat(rate) * 1.05).toFixed(4);
  };
  const calculateSellRate = (rate) => {
    return (parseFloat(rate) * 0.95).toFixed(4);
  };

  if (loading) return <div className="text-center pt-5">Loading...</div>;
  if (error) return <div className="text-center text-danger pt-5">{error}</div>;
  return (
    <>
      <div className="row vh-100">
        <div className="table-wrapper p-5 col-10 mx-auto">
          <Table hover responsive className="text-center fs-5">
            <thead>
              <tr>
                <th></th>
                <th>We Buy</th>
                <th>Exchange Rate</th>
                <th>We Sell</th>
              </tr>
            </thead>
            <tbody>
              {currencies.map((currency) => (
                <tr key={currency}>
                  <td className="fw-bold">{currency}</td>
                  <td>
                    {currencyRates[currency]
                      ? calculateBuyRate(currencyRates[currency])
                      : "-"}
                  </td>
                  <td>
                    {currencyRates[currency]
                      ? parseFloat(currencyRates[currency]).toFixed(4)
                      : "-"}
                  </td>
                  <td>
                    {currencyRates[currency]
                      ? calculateSellRate(currencyRates[currency])
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default currencyExchangeTable;
