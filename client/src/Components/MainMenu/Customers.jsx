import "./Customer.css";
import MenuFunction from "./MenuFunction";
import React, { useState, useEffect } from "react";
import { Container, Form, Table, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MainMenu = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Customers";
    axios
      .get("http://localhost:3001/Customers", {
        headers: {
          accessToken:
            localStorage.getItem("NhanVienToken") ||
            localStorage.getItem("TruongPhongToken"),
        },
      })
      .then((res) => {
        if (res.data.err) {
          alert("Chưa đăng nhập");
          navigate(-1);
        }
      });
  }, [navigate]);

  return (
    <body className="wrapper3">
      <div className="header">TRA CỨU KHÁCH HÀNG</div>
      <MenuFunction />
      <SearchBar />
    </body>
  );
};

const SearchBar = () => {
  const [customerPhone, setCustomerPhone] = useState("");
  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/getCustomers").then((res) => {
      const dataArray = Array.isArray(res.data) ? res.data : [];
      console.log(dataArray);
      setData(dataArray);
      setSearchResults(dataArray);
    });
  }, []);

  function handleClick(event) {
    event.preventDefault();
    if (customerPhone === "") {
      setSearchResults(data);
      return;
    }
    axios
      .get("http://localhost:3001/findCustomers", {
        params: { customerPhone: customerPhone },
      })
      .then((res) => {
        const dataArray = Array.isArray(res.data) ? res.data : [];
        console.log(dataArray);
        setSearchResults(dataArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="search-bar">
      <Container>
        <Form className="FormContainer" onClick={handleClick}>
          <div className="CustomerPhone">
            <Form.Group controlId="customerPhone">
              <Form.Label>Số Điện Thoại</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập số điện thoại"
                value={customerPhone}
                onChange={(event) => setCustomerPhone(event.target.value)}
              />
            </Form.Group>
          </div>
          <div className="search-button-container">
            <Button
              variant="primary"
              style={{
                backgroundColor: "#9B4A47",
                borderColor: "#9B4A47",
                padding: "10px 20px",
                fontSize: "16px",
                borderRadius: "5px",
                marginTop: "20px",
              }}
            >
              Tìm kiếm
            </Button>
          </div>
        </Form>
        <div className="table-container">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Mã Khách Hàng</th>
                <th>Tên Khách Hàng</th>
                <th>Loại khách hàng</th>
                <th>Số Điện Thoại</th>
                <th>Số đơn mua</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((customer, index) => (
                <tr key={index}>
                  <td>{customer.MaKhachHang}</td>
                  <td>{customer.TenKhachHang}</td>
                  <td>{customer.TenLoaiKhachHang}</td>
                  <td>{customer.SDT}</td>
                  <td>{customer.SoDonMua}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
};

export default MainMenu;
