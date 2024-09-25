import { Table } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const currencyApi = import.meta.env.VITE_CURRENCY_KEY;

  const fetchCurrency = async () => {
    try {
      const { data } = await axios.get(
        `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${currencyApi}`
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCurrency();
  }, []);
  return (
    <>
      <div className="row vh-100">
        <div className="table-wrapper p-5 col-6 mx-auto">
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
              <tr>
                <td>CAD</td>
                <td>100</td>
                <td>95</td>
                <td>98</td>
              </tr>
              <tr>
                <td>IDR</td>
                <td>102</td>
                <td>96</td>
                <td>97</td>
              </tr>
              <tr>
                <td>JPY</td>
                <td>100</td>
                <td>95</td>
                <td>98</td>
              </tr>
              <tr>
                <td>CHF</td>
                <td>102</td>
                <td>96</td>
                <td>97</td>
              </tr>
              <tr>
                <td>EUR</td>
                <td>100</td>
                <td>95</td>
                <td>98</td>
              </tr>
              <tr>
                <td>USD</td>
                <td>102</td>
                <td>96</td>
                <td>97</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default App;
