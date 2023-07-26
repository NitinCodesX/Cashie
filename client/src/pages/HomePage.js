import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import "../Styles/Homepage.css";
import Chart from "react-apexcharts";
import axios from "axios";

const HomePage = () => {
  const [data, setData] = useState(null);
  const [total, setTotal]=useState(0);
  const [totalProducts,setTotalProducts]=useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/bills/get-bills")
      .then((response) => {
        const sortedData = response.data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        setData(sortedData);
        const totalSum = data.reduce((accumulator, item) => accumulator + item.totalPrice, 0);
        let temp = 0;
        data.forEach((item) => {
          const totalQty = item?.ItemsInCart?.reduce((accumulator, cartItem) => accumulator + cartItem.qty, 0);
          temp+=totalQty
        });
        setTotalProducts(temp)
        setTotal(totalSum)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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

  // ApexCharts options
  const chartOptions = {
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
    
  };

  
  return (
    <>
      <div className="container">
        <Card className="card" bordered={false}>
          <div className="card-title">Transactions</div>
          <div className="card-content">{data?.length}</div>
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
          <div className="big-card-content"><div>
      <div style={{ width: "80%" }}>
        {data && (
          <Chart
            options={chartOptions}
            series={[{ data: prepareChartData(data).y }]}
            type="line"
            height={400}
            width={600}
          />
        )}
      </div>
        </div></div>
        </Card>
        <Card className="bigCard" bordered={false}>
          <div className="big-card-title">Recent Transactions</div>
          <div className="big-card-content">EEEEEE</div>
        </Card>
    </div>
    </>
  );
};

export default HomePage;
