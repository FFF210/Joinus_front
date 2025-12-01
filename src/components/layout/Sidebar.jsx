import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Sidebar({children}) {
  return (
    <div>
      {/* Sidebar */}
      <div
        style={{
          width: "150px",
          padding: "10px 8px",
          backgroundColor: "#fff",
          flexShrink: 0,
        }}
      >
        <h5 className="mb-4 fw-bold" style={{fontSize:"20px"}}>마이페이지</h5>

        {/* 쇼핑 정보 */}
        <div className="mb-4">
          <h6 className="fw-bold mb-2" style={{ color: "#739FF2", fontSize:"14px" }}>쇼핑 정보</h6>
          <Nav vertical>
            <NavItem>
              <NavLink href="#" style={{ color: "#000", fontSize:"12px" }}>
                주문목록/배송조회
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" style={{ color: "#000", fontSize:"12px" }}>
                장바구니
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" style={{ color: "#000", fontSize:"12px" }}>
                관심상품
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" style={{ color: "#000", fontSize:"12px" }}>
                취소/교환/반품 내역
              </NavLink>
            </NavItem>
          </Nav>
        </div>

        {/* 내 활동 */}
        <div className="mb-4">
          <h6 className="fw-bold mb-2" style={{ color: "#739FF2", fontSize:"14px" }}>내 활동</h6>
          <Nav vertical>
            <NavItem>
              <NavLink href="#" style={{ color: "#000", fontSize:"12px" }}>
                1:1 문의 내역
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" style={{ color: "#000", fontSize:"12px" }}>
                참여중인 제안
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" style={{ color: "#000", fontSize:"12px" }}>
                리뷰 관리
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" style={{ color: "#000", fontSize:"12px" }}>
                알림
              </NavLink>
            </NavItem>
          </Nav>
        </div>

        {/* 내 정보 */}
        <div>
          <h6 className="fw-bold mb-2" style={{ color: "#739FF2", fontSize:"14px" }}>내 정보</h6>
          <Nav vertical>
            <NavItem>
              <NavLink href="#" style={{ color: "#000", fontSize:"12px" }}>
                포인트
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" style={{ color: "#000", fontSize:"12px" }}>
                회원 등급
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" style={{ color: "#000", fontSize:"12px" }}>
                배송지 관리
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" style={{ color: "#000", fontSize:"12px" }}>
                결제 수단 관리
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" style={{ color: "#000", fontSize:"12px" }}>
                환불 계좌 관리
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" style={{ color: "#000", fontSize:"12px" }}>
                개인정보 관리
              </NavLink>
            </NavItem>
          </Nav>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "10px" }}>{children}</div>
    </div>
  );
}
