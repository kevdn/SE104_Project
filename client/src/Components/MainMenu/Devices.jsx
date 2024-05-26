import "./Devices.css";
import "./Button.css";
import MenuFunction from "./MenuFunction";
import React, { useState, useEffect, useCallback } from "react";
import { Container, Form, Table, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import debounce from "lodash.debounce";

const MainMenu = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Devices";
    axios
      .get("http://localhost:3001/Devices", {
        headers: {
          accessToken:
            localStorage.getItem("TruongPhongToken") ||
            localStorage.getItem("NhanVienToken"),
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
      <div className="header">TÌM KIẾM THIẾT BỊ</div>
      <MenuFunction />
      <SearchBar />
    </body>
  );
};

const SearchBar = () => {
  const [productType, setProductType] = useState("");
  const [data, setData] = useState([]);

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/getDevices").then((res) => {
      const dataArray = Array.isArray(res.data) ? res.data : [];
      console.log(dataArray);
      setData(dataArray);
      setSearchResults(dataArray);
    });
  }, []);

  function handleClick(event) {
    if (productType === "") {
      setSearchResults(data);
      return;
    }
    axios
      .get("http://localhost:3001/findDevices", {
        params: { productType: productType },
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
          <div className="LoaiSP">
            <Form.Group controlId="productType">
              <Form.Label>Loại Sản Phẩm</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập loại sản phẩm"
                name="productType"
                onChange={(event) => {
                  setProductType(event.target.value);
                }}
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
                <th>Tên Sản Phẩm</th>
                <th>Loại Sản Phẩm</th>
                <th>Giá Sản Phẩm</th>
                <th>Nhà Cung Cấp</th>
                <th>Số Lượng Tồn</th>
                <th>Số Lượng Bán Ra</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((item, index) => (
                <tr key={index}>
                  <td>{item.TenSanPham}</td>
                  <td>{item.MaLoaiSanPham}</td>
                  <td>{item.GiaSanPham}</td>
                  <td>{item.TenNhaCungCap}</td>
                  <td>{item.SoLuongTon}</td>
                  <td>{item.SoLuongBan}</td>
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
