import { Select, Button } from "antd";
import { useState } from "react";
import moment from "moment";
import MenuFunction from "./MenuFunction";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./BaoCaoCongNo.css";

const { Option } = Select;

const MainMenu = () => {

  const navigate = useNavigate()
    useEffect(() => {
        axios.get("http://localhost:3001/BaoCaoCongNo", {
            headers :{
                accessToken: localStorage.getItem("TruongPhongToken")
            }
        })
        .then((res) => {
            if (res.data.err){
                alert(res.data.err);
                navigate(-1)
            }       
        })
    }, [navigate])

  const [selectedMonth, setSelectedMonth] = useState(moment().month() + 1);
  const [selectedYear, setSelectedYear] = useState(moment().year());
  const [reportData, setReportData] = useState([]);

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const fetchReportData = async () => {
    // Placeholder for actual API call
    const response = await fetch(
      `/api/getReportData?month=${selectedMonth}&year=${selectedYear}`
    );
    const data = await response.json();
    setReportData(data);
  };

  return (
    <body className="wrapper3">
      <div className="header">Báo Cáo Công Nợ</div>
      <MenuFunction />
      <div className="content-container">
        <Content
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          handleMonthChange={handleMonthChange}
          handleYearChange={handleYearChange}
          fetchReportData={fetchReportData}
          reportData={reportData}
        />
      </div>
    </body>
  );
};

const Content = ({
  selectedMonth,
  selectedYear,
  handleMonthChange,
  handleYearChange,
  fetchReportData,
  reportData,
}) => {
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 30 }, (_, i) => moment().year() - i);

  return (
    <div className="Content">
      <h2>Phiếu báo cáo công nợ</h2>
      <div className="date-picker-container">
        <Select
          value={selectedMonth}
          onChange={handleMonthChange}
          style={{ width: 120, marginRight: 10 }}
        >
          {months.map((month) => (
            <Option key={month} value={month}>
              Tháng {month}
            </Option>
          ))}
        </Select>
        <Select
          value={selectedYear}
          onChange={handleYearChange}
          style={{ width: 120, marginRight: 10 }}
        >
          {years.map((year) => (
            <Option key={year} value={year}>
              Năm {year}
            </Option>
          ))}
        </Select>
        <Button type="primary" onClick={fetchReportData}>
          Lập báo cáo
        </Button>
      </div>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Nhà cung cấp</th>
            <th>Nợ đầu</th>
            <th>Phát sinh</th>
            <th>Nợ cuối</th>
          </tr>
        </thead>
        <tbody>
          {reportData.length > 0 ? (
            reportData.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{row.supplier}</td>
                <td>{row.openingDebt}</td>
                <td>{row.incurred}</td>
                <td>{row.endingDebt}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MainMenu;
