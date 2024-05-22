import "./Devices.css";
import MenuFunction from './MenuFunction';
import React, { useState, useEffect, useCallback } from 'react';
import { Container, Form, Table, Button } from 'react-bootstrap';
import { data } from './data.js';
import debounce from 'lodash.debounce';

const MainMenu = () => {
    return (
        <body className="wrapper3">
            <div className='header'>THIẾT BỊ</div>
            <MenuFunction />
            <SearchBar />
        </body>
    );
}

const SearchBar = () => {
    const [productName, setProductName] = useState('');
    const [productType, setProductType] = useState('');
    const [supplier, setSupplier] = useState('');
    const [status, setStatus] = useState('');
    const [searchResults, setSearchResults] = useState(data);

    const handleSearch = useCallback(debounce(() => {
        const filteredResults = data.filter(data_file => {
            return (
                (productName === '' || data_file.name.toLowerCase().includes(productName.toLowerCase())) &&
                (productType === '' || data_file.productType.toLowerCase().includes(productType.toLowerCase())) &&
                (supplier === '' || data_file.supplier.toLowerCase().includes(supplier.toLowerCase())) &&
                (status === '' || (
                    (status === 'Available' && data_file.stockQuantity > 0) ||
                    (status === 'Out of stock' && data_file.stockQuantity === 0)
                ))
            );
        });
        setSearchResults(filteredResults);
    }, 300), [productName, productType, supplier, status]);

    useEffect(() => {
        handleSearch();
        return handleSearch.cancel;
    }, [productName, productType, supplier, status, handleSearch]);

    return (
        <div className='search-bar'>
            <Container>
                <Form className="FormContainer">
                    <div className="TenSP">
                        <Form.Group controlId="productName">
                            <Form.Label>Tên Sản Phẩm</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tên sản phẩm"
                                value={productName}
                                onChange={event => setProductName(event.target.value)}
                            />
                        </Form.Group>
                    </div>
                    <div className="LoaiSP">
                        <Form.Group controlId="productType">
                            <Form.Label>Loại Sản Phẩm</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập loại sản phẩm"
                                value={productType}
                                onChange={event => setProductType(event.target.value)}
                            />
                        </Form.Group>
                    </div>
                    <div className="NCC">
                        <Form.Group controlId="supplier">
                            <Form.Label>Nhà Cung Cấp</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập nhà cung cấp"
                                value={supplier}
                                onChange={event => setSupplier(event.target.value)}
                            />
                        </Form.Group>
                    </div>
                    <div className="Tinhtrang">
                        <Form.Group controlId="status">
                            <Form.Label>Tình trạng</Form.Label>
                            <Form.Control as="select" value={status} onChange={event => setStatus(event.target.value)}>
                                <option value="">Chọn tình trạng</option>
                                <option value="Available">Có sẵn</option>
                                <option value="Out of stock">Hết hàng</option>
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <div className="search-button-container">
                        <Button 
                            variant="primary" 
                            onClick={handleSearch}
                            style={{
                                backgroundColor: '#9B4A47',
                                borderColor: '#9B4A47',
                                padding: '10px 20px',
                                fontSize: '16px',
                                borderRadius: '5px',
                                margin: '20px'
                            }}
                        >
                            Tìm kiếm
                        </Button>
                    </div>
                </Form>
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
                                <td>{item.name}</td>
                                <td>{item.productType}</td>
                                <td>{item.price}</td>
                                <td>{item.supplier}</td>
                                <td>{item.stockQuantity}</td>
                                <td>{item.soldQuantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}

export default MainMenu;
