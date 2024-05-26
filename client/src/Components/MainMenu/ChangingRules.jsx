import "./MainMenu.css";
import MenuFunction from "./MenuFunction";
import "./Services.css";
import "./ChangingRules.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MainMenu = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Changing Regulations";

    axios
      .get("http://localhost:3001/ChangingRules", {
        headers: {
          accessToken: localStorage.getItem("TruongPhongToken"),
        },
      })
      .then((res) => {
        if (res.data.err) {
          alert(res.data.err);
          navigate(-1);
        }
      });
  }, [navigate]);
  return (
    <body className="wrapper3">
      <div className="header">THAY ĐỔI QUY ĐỊNH</div>
      <MenuFunction />
      <Content />
    </body>
  );
};

const Content = () => {
  const [selectedOption, setSelectedOption] = useState("1");
  const [wayToPay, setWayToPay] = useState("");
  const [productType, setProductType] = useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleThemHinhThuc = () => {
    axios
      .post("http://localhost:3001/ChangingWayToPay", { wayToPay })
      .then((res) => {
        if (res.data.success) {
          setWayToPay("");
          alert("Thêm hình thức thanh toán thành công");
        } else {
          alert(res.data.err);
        }
      });
  };

  const handleNhapSanPham = () => {
    axios
      .post("http://localhost:3001/ChangingProductType", { productType })
      .then((res) => {
        if (res.data.success) {
          setProductType("");
          alert("Thêm loại sản phẩm thành công");
        } else {
          alert(res.data.err);
        }
      });
  };

  return (
    <div className="Content">
      <div className="serviceWrapper">
        <form action="">
          <h1>Thay đổi quy định</h1>
          <div className="register"></div>
          <div className="ruleChoice">
            <p>Chọn quy định muốn thay đổi:</p>
            <select onChange={handleSelectChange}>
              <option value="1">Thay đổi loại sản phẩm</option>
              <option value="2">Thay đổi hình thức thanh toán</option>
            </select>
          </div>
          <div className="register"></div>

          {selectedOption == 1 && (
            <div className="sanPham">
              <div>
                <p>Thêm loại sản phẩm: </p>
                <input
                  type="text"
                  placeholder="Nhập loại sản phẩm mới"
                  required=""
                  name="productType"
                  onChange={(event) => {
                    setProductType(event.target.value);
                  }}
                />
                <button
                  className="ruleButton"
                  type="submit"
                  onClick={handleNhapSanPham}
                >
                  Thêm
                </button>
              </div>
            </div>
          )}

          {selectedOption == 2 && (
            <div className="hinhThuc">
              <div>
                <p>Thêm hình thức thanh toán: </p>
                <input
                  type="text"
                  placeholder="Nhập loại hình thức thanh toán mới"
                  required=""
                  name="wayToPay"
                  onChange={(event) => {
                    setWayToPay(event.target.value);
                  }}
                />
                <button
                  className="ruleButton"
                  type="submit"
                  onClick={handleThemHinhThuc}
                >
                  Thêm
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default MainMenu;
