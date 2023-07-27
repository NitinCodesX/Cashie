import React, { useEffect, useState } from "react";
import { Card } from "antd";
import Chart from "react-apexcharts";
import axios from "axios";
import "../Styles/Homepage.css";
const HomePage = () => {
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [categoryCounts, setCategoryCounts] = useState(null);
  const fetchD = async () => {
    try {
      const parameters = await axios.get(
        "http://localhost:8080/api/home/get-parameters"
      );
      setTotal(parameters.data.totalIncome);
      setTotalProducts(parameters.data.totalProducts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/bills/get-bills"
      );
      const sortedData = response.data.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setData(sortedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const prepareChartData = (data) => {
    const dailyIncomeData = {};
    data?.forEach((transaction) => {
      const date = new Date(transaction.date).toISOString().substr(0, 10); // Convert to 'yyyy-MM-dd' format
      if (dailyIncomeData[date]) {
        dailyIncomeData[date] += transaction.totalPrice;
      } else {
        dailyIncomeData[date] = transaction.totalPrice;
      }
    });
    const chartData = {
      x: Object.keys(dailyIncomeData), // Dates as x-axis values
      y: Object.values(dailyIncomeData), // Sales values for y-axis
    };
    return chartData;
  };
  const preparePieChartData = () => {
    let temp = {};
    if (data) {
      data.forEach((item) => {
        item.ItemsInCart?.forEach((cartItem) => {
          const category = cartItem?.category;
          if (category) {
            temp[category] = (temp[category] || 0) + 1;
          }
        });
      });
    }
    setCategoryCounts(temp);
  };
  useEffect(() => {
    fetchD();
    fetchData();
  }, []);
  useEffect(() => {
    if (data) {
      preparePieChartData();
    }
  }, [data]);
  return (
    <>
      <div className="container">
        <Card className="card" bordered={false}>
          <div className="card-title">Transactions</div>
          <div className="card-content">{data?.length || 0}</div>
        </Card>
        <Card className="card" bordered={false}>
          <div className="card-title">Income</div>
          <div className="card-content">{total}</div>
        </Card>
        <Card className="card" bordered={false}>
          <div className="card-title">Products</div>
          <div className="card-content">{totalProducts}</div>
        </Card>
      </div>
      <div className="bigContainer">
        <Card className="bigCard" bordered={false}>
          <div className="big-card-title">Sales Charts</div>
          <div className="big-card-content">
            <div>
              <div style={{ width: "80%" }}>
                {data?.length > 0 && (
                  <Chart
                    options={{
                      chart: {
                        type: "line",
                        zoom: {
                          enabled: false,
                        },
                      },
                      xaxis: {
                        type: "category",
                        categories: prepareChartData(data)?.x,
                        labels: {
                          style: {
                            fontSize: "14px", // Change the font size of x-axis labels
                          },
                        },
                      },
                      yaxis: {
                        min: 0,
                        labels: {
                          style: {
                            fontSize: "14px", // Change the font size of x-axis labels
                          },
                        },
                      },
                    }}
                    series={[{ data: prepareChartData(data).y }]}
                    type="line"
                    height={600}
                    width={800}
                  />
                )}
              </div>
            </div>
          </div>
        </Card>
        <Card className="bigCard" bordered={false}>
          <div className="big-card-title">Recent Transactions</div>
          <div className="big-card-content">
            <div>
              {categoryCounts && Object.keys(categoryCounts).length > 0 && (
                <Chart
                  options={{
                    chart: {
                      width: 180,
                      type: "pie",
                    },
                    labels: Object.keys(categoryCounts),
                    responsive: [
                      {
                        breakpoint: 480,
                        options: {
                          chart: {
                            width: 400,
                          },
                          legend: {
                            position: "bottom",
                          },
                        },
                      },
                    ],
                  }}
                  type="pie"
                  series={Object.values(categoryCounts)}
                  width={700}
                />
              )}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};
export default HomePage;
