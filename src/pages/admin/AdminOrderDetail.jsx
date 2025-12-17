import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Input,
    Button,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink
} from "reactstrap";
import { myAxios } from "../../config";
import AdminHeader from "../../components/layout/AdminHeader";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminOrderDetail() {
    const { gbProductId } = useParams();
    
    // State
    const [orderDetail, setOrderDetail] = useState(null);
    const [adminOrderNo, setAdminOrderNo] = useState("");
    
    const [participantPage, setParticipantPage] = useState({
        content: [],
        totalPages: 0,
        totalElements: 0,
        number: 0
    });
    const [currentPage, setCurrentPage] = useState(0);
    
    const [trackingInputs, setTrackingInputs] = useState({});
    const [carrierInputs, setCarrierInputs] = useState({});
    
    
    // 공구 상품 정보 조회
    const fetchOrderDetail = async () => {
        try {
            const response = await myAxios().get(
                `/admin/adminOrderDetail/${gbProductId}`
            );
            
            console.log('📥 공구 상품 정보:', response.data);
            
            setOrderDetail(response.data);
            setAdminOrderNo(response.data.adminOrderId || "");
            
        } catch (error) {
            console.error("공구 상품 정보 조회 실패:", error);
            alert("공구 상품 정보를 불러오는 데 실패했습니다.");
        }
    };
    
    
    // 참여자 목록 조회
    const fetchParticipants = async (page = 0) => {
        try {
            const response = await myAxios().get(
                `/admin/adminOrderDetail/${gbProductId}/participants`,
                { params: { page, size: 10 } }
            );
            
            console.log('📥 참여자 목록:', response.data);
            
            setParticipantPage(response.data);
            setCurrentPage(page);
            
        } catch (error) {
            console.error("참여자 목록 조회 실패:", error);
            alert("참여자 목록을 불러오는 데 실패했습니다.");
        }
    };
    
    
    // 초기 로드
    useEffect(() => {
        fetchOrderDetail();
        fetchParticipants();
    }, [gbProductId]);
    
    
    // 페이지 변경
    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 0 && pageNumber < participantPage.totalPages) {
            fetchParticipants(pageNumber);
        }
    };
    
    
    // 관리자 주문번호 저장
    const handleSaveAdminOrder = async () => {
        if (!adminOrderNo.trim()) {
            alert("관리자 주문번호를 입력해주세요.");
            return;
        }
        
        try {
            await myAxios().post(
                `/admin/adminOrderDetail/${gbProductId}/admin-order`,
                { adminOrderId: adminOrderNo }
            );
            
            alert("관리자 주문번호가 저장되었습니다.");
            fetchOrderDetail();
            
        } catch (error) {
            console.error("관리자 주문번호 저장 실패:", error);
            alert("저장에 실패했습니다.");
        }
    };
    
    
    // 송장번호 입력 핸들러
    const handleTrackingChange = (orderId, value) => {
        setTrackingInputs(prev => ({
            ...prev,
            [orderId]: value
        }));
    };
    
    const handleCarrierChange = (orderId, value) => {
        setCarrierInputs(prev => ({
            ...prev,
            [orderId]: value
        }));
    };
    
    
    // 송장번호 저장
    const handleSaveTracking = async (orderId) => {
        const trackingNo = trackingInputs[orderId];
        const carrierName = carrierInputs[orderId] || "CJ대한통운";
        
        if (!trackingNo || !trackingNo.trim()) {
            alert("송장번호를 입력해주세요.");
            return;
        }
        
        try {
            await myAxios().post(
                `/admin/adminOrderDetail/${orderId}/tracking`,
                { 
                    trackingNo: trackingNo,
                    carrierName: carrierName
                }
            );
            
            alert("송장번호가 저장되었습니다.");
            
            setTrackingInputs(prev => {
                const newInputs = { ...prev };
                delete newInputs[orderId];
                return newInputs;
            });
            setCarrierInputs(prev => {
                const newInputs = { ...prev };
                delete newInputs[orderId];
                return newInputs;
            });
            
            fetchParticipants(currentPage);
            
        } catch (error) {
            console.error("송장번호 저장 실패:", error);
            alert("저장에 실패했습니다.");
        }
    };
    
    
    // 스타일
    const tableHeaderStyle = {
        background: '#eaf1ff',
        textAlign: 'center',
        verticalAlign: 'middle'
    };
    
    
    // 로딩 중
    if (!orderDetail) {
        return (
            <div className="admin-layout">
                <div className="main-content">
                    <AdminHeader title="공구관리 > 주문 공구 상품" />
                    <div className="content-area">
                        <Container fluid className="p-5">
                            <p>로딩 중...</p>
                        </Container>
                    </div>
                </div>
            </div>
        );
    }
    
    
    return (
        <div className="admin-layout">
            <div className="main-content">
                <AdminHeader title="공구관리 > 구매한 공구 상품" />
                <div className="content-area">
                    <Container fluid className="p-5">
                        
                        {/* 공구 상품 카드 */}
                        <div>
                            <h6 
                                className="fw-bold mb-3" 
                                style={{ 
                                    background: '#eaf1ff', 
                                    padding: '10px',
                                    borderRadius: '4px'
                                }}
                            >
                                공구 상품
                            </h6>
                            <Row 
                                className="align-items-center" 
                                style={{ 
                                    backgroundColor: 'white', 
                                    minHeight: '250px', 
                                    padding: '20px',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '4px'
                                }}
                            >
                                {/* 이미지 */}
                                <Col md="2" className="text-center">
                                    <img
                                        src={orderDetail.thumbnailFileId 
                                            ? `http://localhost:8080/file/view/${orderDetail.thumbnailFileId}` 
                                            : "/productSampleImg.png"}
                                        alt="product"
                                        className="img-fluid rounded"
                                        style={{ 
                                            width: '200px',
                                            height: '200px',
                                            objectFit: 'cover'
                                        }}
                                        onError={(e) => {
                                            console.log('이미지 로드 실패:', e.target.src);
                                            console.log('thumbnailFileId:', orderDetail.thumbnailFileId);
                                            e.target.src = "/productSampleImg.png";
                                        }}
                                    />
                                </Col>

                                <Col md="10">
                                    {/* 주문번호 입력 */}
                                    <div className="d-flex flex-row gap-2 align-items-center mb-3">
                                        <div style={{ minWidth: '100px' }}>
                                            <strong>주문번호:</strong>
                                        </div>
                                        <div style={{ flex: 1, maxWidth: '400px' }}>
                                            <Input 
                                                type="text" 
                                                placeholder="주문번호 입력"
                                                value={adminOrderNo}
                                                onChange={(e) => setAdminOrderNo(e.target.value)}
                                                disabled={!!orderDetail.adminOrderId}
                                            />
                                        </div>
                                        <div>
                                            <Button 
                                                style={{ backgroundColor: '#739FF2', border: 'none' }}
                                                onClick={handleSaveAdminOrder}
                                                disabled={!!orderDetail.adminOrderId}
                                            >
                                                저장
                                            </Button>
                                        </div>
                                    </div>
                                    
                                    {/* 상품 상세정보 */}
                                    <div className="mb-2">
                                        <strong>상품명:</strong> {orderDetail.gbProductName}
                                    </div>
                                    
                                    {/* 옵션별 수량 */}
                                    {orderDetail.optionSummaries?.map((option) => (
                                        <div key={option.optionId} className="mb-1">
                                            <strong>옵션:</strong> {option.optionName} / <strong>수량:</strong> {option.totalQuantity}
                                        </div>
                                    ))}

                                    {orderDetail.originalSiteUrl && (
                                        <div className="mt-3">
                                            <a 
                                                href={orderDetail.originalSiteUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-primary" 
                                                style={{ fontSize: "0.9rem", textDecoration: 'none' }}
                                            >
                                                🔗 원 사이트 주소: {orderDetail.originalSiteUrl}
                                            </a>
                                        </div>
                                    )}
                                </Col>
                            </Row>
                        </div>

                        {/* 참여자 테이블 */}
                        <div className="mt-4">
                            <h6 
                                className="fw-bold mb-3" 
                                style={{ 
                                    background: '#eaf1ff', 
                                    padding: '10px',
                                    borderRadius: '4px'
                                }}
                            >
                                참여자 목록
                            </h6>
                            <Table bordered hover className="align-middle text-center">
                                <thead>
                                    <tr>
                                        <th style={tableHeaderStyle}>주문번호</th>
                                        <th style={tableHeaderStyle}>주문일</th>
                                        <th style={tableHeaderStyle}>주문자명</th>
                                        <th style={tableHeaderStyle}>옵션명</th>
                                        <th style={tableHeaderStyle}>수량</th>
                                        <th style={tableHeaderStyle}>결제수단</th>
                                        <th style={tableHeaderStyle}>결제금액</th>
                                        <th style={tableHeaderStyle}>택배사</th>
                                        <th style={tableHeaderStyle}>송장번호</th>
                                        <th style={tableHeaderStyle}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {participantPage.content.length === 0 ? (
                                        <tr>
                                            <td colSpan="10">참여자가 없습니다.</td>
                                        </tr>
                                    ) : (
                                        participantPage.content.map((participant) => (
                                            <tr key={participant.orderId}>
                                                <td>{participant.orderId}</td>
                                                <td>
                                                    {participant.orderDate 
                                                        ? participant.orderDate.substring(0, 10).replace(/-/g, '.') 
                                                        : 'N/A'}
                                                </td>
                                                <td>{participant.customerName}</td>
                                                <td className="text-start">
                                                    {participant.options?.map((opt, idx) => (
                                                        <div key={idx}>{opt.optionName}</div>
                                                    ))}
                                                </td>
                                                <td>
                                                    {participant.options?.map((opt, idx) => (
                                                        <div key={idx}>{opt.quantity}</div>
                                                    ))}
                                                </td>
                                                <td>{participant.paymentMethod}</td>
                                                <td>{participant.paymentAmount?.toLocaleString()}원</td>
                                                
                                                {/* 택배사 */}
                                                <td>
                                                    {participant.trackingNo ? (
                                                        participant.carrierName || '-'
                                                    ) : (
                                                        <Input 
                                                            type="select"
                                                            value={carrierInputs[participant.orderId] || "CJ대한통운"}
                                                            onChange={(e) => handleCarrierChange(participant.orderId, e.target.value)}
                                                            style={{ minWidth: '120px' }}
                                                        >
                                                            <option>CJ대한통운</option>
                                                            <option>우체국택배</option>
                                                            <option>한진택배</option>
                                                            <option>롯데택배</option>
                                                        </Input>
                                                    )}
                                                </td>
                                                
                                                {/* 송장번호 */}
                                                <td>
                                                    {participant.trackingNo ? (
                                                        participant.trackingNo
                                                    ) : (
                                                        <Input 
                                                            type="text"
                                                            placeholder="송장번호 입력"
                                                            value={trackingInputs[participant.orderId] || ""}
                                                            onChange={(e) => handleTrackingChange(participant.orderId, e.target.value)}
                                                        />
                                                    )}
                                                </td>
                                                
                                                <td>
                                                    <Button 
                                                        className="px-3" 
                                                        style={{ 
                                                            backgroundColor: '#739FF2',
                                                            border: 'none'
                                                        }}
                                                        onClick={() => handleSaveTracking(participant.orderId)}
                                                        disabled={!!participant.trackingNo}
                                                    >
                                                        저장
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </Table>
                        </div>

                        {/* 페이지네이션 */}
                        {participantPage.totalPages > 0 && (
                            <div className="d-flex justify-content-center mt-4">
                                <Pagination>
                                    {Array.from({ length: participantPage.totalPages }, (_, i) => (
                                        <PaginationItem key={i} active={i === currentPage}>
                                            <PaginationLink onClick={() => handlePageChange(i)}>
                                                {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                </Pagination>
                            </div>
                        )}
                    </Container>
                </div>
            </div>
        </div>
    );
}