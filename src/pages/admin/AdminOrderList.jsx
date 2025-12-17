import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Input,
    Button,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    FormGroup,
    Label
} from "reactstrap";
import { myAxios } from "../../config";
import SearchFilter from './SearchFilter';
import AdminHeader from "../../components/layout/AdminHeader";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminOrderList() {
    const navigate = useNavigate();

    // ========================================
    // State
    // ========================================
    const [searchType, setSearchType] = useState("");
    const [keyword, setKeyword] = useState("");

    const [orderPage, setOrderPage] = useState({
        content: [],
        totalPages: 0,
        totalElements: 0,
        number: 0
    });
    const [currentPage, setCurrentPage] = useState(0);


    // ========================================
    // 데이터 조회
    // ========================================
    const fetchOrders = async (page = 0) => {
        try {
            const params = {
                searchType: searchType || null,
                keyword: keyword || null,
                page,
                size: 10
            };

            console.log('🔍 API 요청:', params);

            const response = await myAxios().get('/admin/adminOrderList', { params });

            console.log('📥 API 응답:', response.data);

            setOrderPage(response.data);
            setCurrentPage(page);

        } catch (error) {
            console.error("구매 대기 목록 조회 실패:", error);
            alert("구매 대기 목록을 불러오는 데 실패했습니다.");
        }
    };


    // ========================================
    // 초기 로드
    // ========================================
    useEffect(() => {
        fetchOrders();
    }, []);


    // ========================================
    // 검색
    // ========================================
    const handleSearch = () => {
        fetchOrders(0);
    };

    const handleReset = () => {
        setSearchType("");
        setKeyword("");
        fetchOrders(0);
    };


    // ========================================
    // 페이지 변경
    // ========================================
    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 0 && pageNumber < orderPage.totalPages) {
            fetchOrders(pageNumber);
        }
    };


    // ========================================
    // 상세 페이지 이동
    // ========================================
    const handleRowClick = (gbProductId) => {
        navigate(`/admin/adminOrderDetail/${gbProductId}`);
    };


    // ========================================
    // 스타일
    // ========================================
    const confirmBtnStyle = {
        backgroundColor: '#739FF2',
        padding: '10px 20px',
        width: '120px',
        color: 'white'
    };

    const cancelBtnStyle = {
        border: '1px solid #739FF2',
        backgroundColor: 'white',
        padding: '10px 20px',
        width: '120px',
        color: '#739FF2'
    };


    return (
        <div className="admin-layout">
            <div className="main-content">
                <AdminHeader title="공구 관리 > 구매 대기 상품" />
                <div className="content-area">
                    <Container fluid className="p-5">

                        {/* 검색 Section */}
                        <div
                            className="p-4 rounded mb-4"
                            style={{ backgroundColor: "white" }}
                        >
                            <Row className="gap-4">
                                {/* 검색옵션 */}
                                <Col md="3">
                                    <FormGroup>
                                        <Label className="fw-bold mb-2">검색옵션</Label>
                                        <Input
                                            type="select"
                                            value={searchType}
                                            onChange={(e) => setSearchType(e.target.value)}
                                        >
                                            <option value="">검색옵션 선택</option>
                                            <option value="supplyNo">공구번호</option>
                                            <option value="name">공구명</option>
                                        </Input>
                                    </FormGroup>
                                </Col>

                                {/* 검색어 */}
                                <Col md="8">
                                    <FormGroup>
                                        <Label className="fw-bold mb-2">검색어</Label>
                                        <Input
                                            type="text"
                                            placeholder="검색어 입력"
                                            value={keyword}
                                            onChange={(e) => setKeyword(e.target.value)}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') handleSearch();
                                            }}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row className="gap-4">
                                {/* 버튼 영역 */}
                                <Col className="d-flex align-item-center justify-content-center">
                                    <div className="d-flex">
                                        <Button
                                            style={confirmBtnStyle}
                                            onClick={handleSearch}
                                        >
                                            검색
                                        </Button>

                                        <Button
                                            className="ms-3"
                                            style={cancelBtnStyle}
                                            onClick={handleReset}
                                        >
                                            설정 초기화
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        {/* Table */}
                        <div className="bg-white rounded shadow-sm p-3">
                            <Table bordered hover responsive className="text-center align-middle">
                                <thead style={{ background: "#E5EEFF" }}>
                                    <tr>
                                        <th style={{ background: "#E5EEFF" }}>공구번호</th>
                                        <th style={{ background: "#E5EEFF" }}>공구명</th>
                                        <th style={{ background: "#E5EEFF" }}>수량</th>
                                        <th style={{ background: "#E5EEFF" }}>공구마감일</th>
                                        <th style={{ background: "#E5EEFF" }}>가격</th>
                                        <th style={{ background: "#E5EEFF" }}>관리자 주문번호</th>
                                        <th style={{ background: "#E5EEFF" }}>관리자 주문일</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderPage.content.length === 0 ? (
                                        <tr>
                                            <td colSpan="7">구매 대기 중인 공구가 없습니다.</td>
                                        </tr>
                                    ) : (
                                        orderPage.content.map((order) => (
                                            <tr
                                                key={order.gbProductId}
                                                onClick={() => handleRowClick(order.gbProductId)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <td>{order.gbProductId}</td>
                                                <td className="text-start">{order.gbProductName}</td>
                                                <td>{order.totalQuantity}</td>
                                                <td>
                                                    {order.endDate
                                                        ? order.endDate.substring(0, 10).replace(/-/g, '.')
                                                        : 'N/A'}
                                                </td>
                                                <td>{order.totalAmount?.toLocaleString()}원</td>
                                                {/* 관리자 주문번호 */}
                                                <td>
                                                    {order.adminOrderId || (
                                                        <span style={{ color: '#999' }}>입력 필요</span>
                                                    )}
                                                </td>

                                                {/* 관리자 주문일 */}
                                                <td>
                                                    {order.adminOrderDt
                                                        ? order.adminOrderDt.substring(0, 10).replace(/-/g, '.')
                                                        : <span style={{ color: '#999' }}>-</span>}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </Table>

                            {/* Pagination */}
                            {orderPage.totalPages > 0 && (
                                <div className="d-flex justify-content-center mt-4">
                                    <Pagination>
                                        {Array.from({ length: orderPage.totalPages }, (_, i) => (
                                            <PaginationItem key={i} active={i === currentPage}>
                                                <PaginationLink onClick={() => handlePageChange(i)}>
                                                    {i + 1}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))}
                                    </Pagination>
                                </div>
                            )}
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    );
}