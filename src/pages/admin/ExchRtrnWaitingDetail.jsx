
import React from 'react';
import {
    Container, Row, Col, Card, CardImg, CardBody,
    Form, FormGroup, Label, Input, Button,
    CardTitle, CardText
} from 'reactstrap';

export default function ExchRtrnWaitingDetail() {
    return (
        <Container fluid className="p-4 bg-light min-vh-100">
            {/* Header and Action Buttons */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0">교환 신청 관리</h1>
                <div className="d-flex gap-2">
                    <Button color="secondary" outline>신청 거부</Button>
                    <Button color="primary">신청 승인</Button>
                </div>
            </div>

            <Row className="g-4"> {/* g-4 adds consistent gap between columns/rows */}
                {/* Left Column: Application Info */}
                <Col md={6}>
                    <Card>
                        <CardBody>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <CardTitle tag="h5" className="mb-0">신청정보</CardTitle>
                                <Button color="link" size="sm" className="p-0">신청정보 자세히 보기</Button>
                            </div>

                            <Form>
                                {/* 교환신청 */}
                                <FormGroup>
                                    <Label for="applicationType" className="text-muted">신청구분</Label>
                                    <Input id="applicationType" value="교환신청" readOnly />
                                </FormGroup>

                                {/* 신청번호 */}
                                <FormGroup>
                                    <Label for="applicationNumber" className="text-muted">신청번호</Label>
                                    <Input id="applicationNumber" value="cs20251118" readOnly />
                                </FormGroup>

                                {/* 신청자명 */}
                                <FormGroup>
                                    <Label for="applicantName" className="text-muted">신청자명</Label>
                                    <Input id="applicantName" value="김길동" readOnly />
                                </FormGroup>

                                {/* 회수상품 코드*/}
                                <FormGroup>
                                    <Label for="returnProducttId" className="text-muted">회수상품코드</Label>
                                    <Input id="returnProducttId" value="1234" readOnly />
                                </FormGroup>

                                {/*회수상품 */}
                                <FormGroup>
                                    <Label for="returnproductNm" className="text-muted">회수상품</Label>
                                    <Input id="returnproductNme" value="Xbox Core 무선 게임 컨트롤러 - Electric Volt Series X|S, One, Windows PC" readOnly />
                                </FormGroup>

                                {/* 선택옵션 및 수량 */}
                                <Row form>
                                    <Col md={8}>
                                        <FormGroup>
                                            <Label for="options" className="text-muted">옵션</Label>
                                            <Input id="options" value="xl" readOnly />
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for="quantity" className="text-muted">수량</Label>
                                            <Input id="quantity" value="2" readOnly />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                {/* 신청상품 코드*/}
                                <FormGroup>
                                    <Label for="reqProducttId" className="text-muted">신청상품코드</Label>
                                    <Input id="reqProducttId" value="1234" readOnly />
                                </FormGroup>

                                {/* 신청상품 */}
                                <FormGroup>
                                    <Label for="reqProductNm" className="text-muted">신청상품</Label>
                                    <Input id="reqProductNm" value="Xbox Core 무선 게임 컨트롤러 - Electric Volt Series X|S, One, Windows PC" readOnly />
                                </FormGroup>

                                {/* 선택옵션 및 수량 */}
                                <Row form>
                                    <Col md={8}>
                                        <FormGroup>
                                            <Label for="options" className="text-muted">옵션</Label>
                                            <Input id="options" value="xl" readOnly />
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for="quantity" className="text-muted">수량</Label>
                                            <Input id="quantity" value="2" readOnly />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                 {/* 신청사유 */}
                                <FormGroup>
                                    <Label for="reason" className="text-muted">사유</Label>
                                    <Input id="reason" value="구성품 누락" readOnly />
                                </FormGroup>

                                {/* 이미지 Placeholder (실제 이미지 대신 카드 사용) */}
                                <Row form className="g-2 mt-2" style={{ width: '900px', height: '200px' }}>
                                    <Col md={3}>
                                        <Card className="p-3 text-center bg-light border-dashed">
                                            <CardImg src="/productSampleImg.png" alt="Photo 1" className="img-fluid rounded" />
                                        </Card>
                                    </Col>
                                    <Col md={3}>
                                        <Card className="p-3 text-center bg-light border-dashed">
                                            <CardImg src="/productSampleImg.png" alt="Photo 1" className="img-fluid rounded" />
                                        </Card>
                                    </Col>
                                    <Col md={3}>
                                        <Card className="p-3 text-center bg-light border-dashed">
                                            <CardImg src="/productSampleImg.png" alt="Photo 1" className="img-fluid rounded" />
                                        </Card>
                                    </Col>
                                    <Col md={3}>
                                        <Card className="p-3 text-center bg-light border-dashed">
                                            <CardImg src="/productSampleImg.png" alt="Photo 1" className="img-fluid rounded" />
                                        </Card>
                                    </Col>
                                </Row>

                                {/* 회수 방법 */}
                                <FormGroup className="mt-4">
                                    <Label for="pickupMethod" className="text-muted">회수방법</Label>
                                    <Input id="pickupMethod" value="직접회수" readOnly />
                                </FormGroup>

                                {/* 배송지 */}
                                <FormGroup>
                                    <Label for="shippingAddress" className="text-muted">배송지</Label>
                                    <Input id="shippingAddress" value="서울 가산디지털로 호서대벤처타워" readOnly />
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>

                {/* Right Column: Order/Delivery Info and Admin Memo */}
                <Col md={6}>
                    {/* 주문/배송 정보 */}
                    <Card className="mb-4">
                        <CardBody>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <CardTitle tag="h5" className="mb-0">주문/배송 정보</CardTitle>
                                <Button color="link" size="sm" className="p-0">주문/배송 정보 자세히 보기</Button>
                            </div>
                            <CardText className="text-success mb-3">2025-11-18 13:00:00 배송완료</CardText>

                            <Form>
                                {/* 주문번호 */}
                                <FormGroup row className="mb-2 align-items-center">
                                    <Label sm={3} className="text-muted">주문번호</Label>
                                    <Col sm={9}><Input value="cs20251118" readOnly /></Col>
                                </FormGroup>

                                {/* 주문자명 */}
                                <FormGroup row className="mb-2 align-items-center">
                                    <Label sm={3} className="text-muted">주문자명</Label>
                                    <Col sm={9}><Input value="김길동" readOnly /></Col>
                                </FormGroup>

                                {/* 결제수단 */}
                                <FormGroup row className="mb-2 align-items-center">
                                    <Label sm={3} className="text-muted">결제수단</Label>
                                    <Col sm={9}><Input value="신용카드" readOnly /></Col>
                                </FormGroup>

                                {/* 결제금액 */}
                                <FormGroup row className="mb-2 align-items-center">
                                    <Label sm={3} className="text-muted">결제금액</Label>
                                    <Col sm={9}><Input value="120$" readOnly /></Col>
                                </FormGroup>

                                {/* 송장번호 */}
                                <FormGroup row className="mb-2 align-items-center">
                                    <Label sm={3} className="text-muted">송장번호</Label>
                                    <Col sm={9}><Input value="123456797" readOnly /></Col>
                                </FormGroup>

                                {/* 배송주소 (짧게) */}
                                <FormGroup row className="mb-2 align-items-center">
                                    <Label sm={3} className="text-muted">배송주소</Label>
                                    <Col sm={9}><Input value="호서벤처타워" readOnly /></Col>
                                </FormGroup>

                                {/* 배송주소 (길게) */}
                                <FormGroup row className="mb-2 align-items-center">
                                    <Label sm={3} className="text-muted">배송주소</Label>
                                    <Col sm={9}><Input value="서울 가산디지털로 호서대벤처타워" readOnly /></Col>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>

                    {/* 관리자 메모 */}
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">관리자 메모</CardTitle>
                            <FormGroup>
                                <Input type="textarea" id="adminReason" rows={3} placeholder="관리자 메모." style={{ resize: 'none' }} />
                                <Input type="textarea" id="adminReason" rows={3} placeholder="관리자 메모." style={{ resize: 'none' }} />
                            </FormGroup>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
