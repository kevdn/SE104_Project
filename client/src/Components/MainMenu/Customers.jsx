import "./Devices.css";
import MenuFunction from './MenuFunction';
import React, { useState, useEffect, useCallback } from 'react';
import { Container, Form, Table, Button } from 'react-bootstrap';
import { customerData } from './customerdata.js';
import debounce from 'lodash.debounce';
import axios from "axios";
import { useNavigate } from "react-router-dom";


const MainMenu = () => {

    const navigate = useNavigate()
    useEffect(() => {
        axios.get("http://localhost:3001/Customers", {
            headers :{
                accessToken: localStorage.getItem("NhanVienToken") ||localStorage.getItem("TruongPhongToken")
            }
        })
        .then((res) => {
            if (res.data.err){
                alert("Chưa đăng nhập");
                navigate(-1)
            }       
        })
    }, [navigate])

    return (
        <body className="wrapper3">
            <div className='header'>Tra cứu khách hàng</div>
            <MenuFunction />
            <SearchBar />
        </body>
    );
}

const SearchBar = () => {
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [searchResults, setSearchResults] = useState(customerData);

    const handleSearch = useCallback(debounce(() => {
        const filteredResults = customerData.filter(customer => {
            return (
                (customerName === '' || customer.name.toLowerCase().includes(customerName.toLowerCase())) &&
                (customerEmail === '' || customer.email.toLowerCase().includes(customerEmail.toLowerCase())) &&
                (customerPhone === '' || customer.phone.includes(customerPhone)) &&
                (customerAddress === '' || customer.address.toLowerCase().includes(customerAddress.toLowerCase()))
            );
        });
        setSearchResults(filteredResults);
    }, 300), [customerName, customerEmail, customerPhone, customerAddress]);

    useEffect(() => {
        handleSearch();
        return handleSearch.cancel;
    }, [customerName, customerEmail, customerPhone, customerAddress, handleSearch]);

    return (
        <div className='search-bar'>
            <Container>
                <Form className="FormContainer">
                    <div className="CustomerName">
                        <Form.Group controlId="customerName">
                            <Form.Label>Tên Khách Hàng</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tên khách hàng"
                                value={customerName}
                                onChange={event => setCustomerName(event.target.value)}
                            />
                        </Form.Group>
                    </div>
                    <div className="CustomerEmail">
                        <Form.Group controlId="customerEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Nhập email"
                                value={customerEmail}
                                onChange={event => setCustomerEmail(event.target.value)}
                            />
                        </Form.Group>
                    </div>
                    <div className="CustomerPhone">
                        <Form.Group controlId="customerPhone">
                            <Form.Label>Số Điện Thoại</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập số điện thoại"
                                value={customerPhone}
                                onChange={event => setCustomerPhone(event.target.value)}
                            />
                        </Form.Group>
                    </div>
                    <div className="CustomerAddress">
                        <Form.Group controlId="customerAddress">
                            <Form.Label>Địa Chỉ</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập địa chỉ"
                                value={customerAddress}
                                onChange={event => setCustomerAddress(event.target.value)}
                            />
                        </Form.Group>
                    </div>
                    
                </Form>
                <div className="table-container">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Tên Khách Hàng</th>
                                <th>Email</th>
                                <th>Số Điện Thoại</th>
                                <th>Địa Chỉ</th>
                                <th>Tình Trạng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchResults.map((customer, index) => (
                                <tr key={index}>
                                    <td>{customer.name}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.phone}</td>
                                    <td>{customer.address}</td>
                                    <td>{customer.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Container>
        </div>
    );
}

export default MainMenu;
