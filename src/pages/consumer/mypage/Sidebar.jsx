import React, { useEffect, useState } from "react";
import { Nav, NavItem } from "reactstrap"; 
import { NavLink } from "react-router-dom";   
import "bootstrap/dist/css/bootstrap.min.css";
import UserInfo from "./UserInfo";
import axios from "axios";

export default function Sidebar({children}) {
  const [unreadCount, setUnreadCount] = useState(0);

  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const username = userInfo?.username;

  useEffect(() => {
    if (!username) return;

    axios
      .get(`http://localhost:8080/mypage/alert?username=${username}`)
      .then((res) => {
        const count = (res.data || []).filter(
          (a) => !a.readedAt
        ).length;
        setUnreadCount(count);
      })
      .catch(() => setUnreadCount(0));
  }, [username]);
  return (<>
    <div
      style={{
        width: "1020px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "row",
        minHeight: "100vh",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "150px",
          padding: "10px 8px",
          backgroundColor: "#fff",
          flexShrink: 0,
        }}
      >
       <NavLink 
  to="/mypage/main" 
  style={{ textDecoration: "none" }}
>
  <h5 className="mb-4 fw-bold" style={{fontSize:"20px", color:"#000"}}>
    마이페이지
  </h5>
</NavLink>
        

        {/* 쇼핑 정보 */}
        <div className="mb-4">
          <h6 className="fw-bold mb-2" style={{ color: "#739FF2", fontSize:"14px" }}>쇼핑 정보</h6>
          <Nav vertical>
            <NavItem>
              <NavLink to="/mypage/orderList" style={{ color: "#000", fontSize:"12px", textDecoration: "none" }}>
                주문/배송조회
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/mypage/shopCartList" style={{ color: "#000", fontSize:"12px", textDecoration: "none" }}>
                장바구니
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/mypage/interestList" style={{ color: "#000", fontSize:"12px", textDecoration: "none" }}>
                관심상품
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/mypage/cnclExchRtrnHisList" style={{ color: "#000", fontSize:"12px", textDecoration: "none" }}>
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
              {/* 문의한 목록  */}
              <NavLink to='/mypage/inquiryHistoryList' style={{ color: "#000", fontSize:"12px", textDecoration: "none" }}>
                1:1 문의 내역
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/mypage/suggestions"  style={{ color: "#000", fontSize:"12px", textDecoration: "none" }}>
                공동구매 요청
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/mypage/reviewManage" style={{ color: "#000", fontSize:"12px", textDecoration: "none" }}>
                리뷰 관리
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to="/mypage/alert"
                style={{
                  color: "#000",
                  fontSize: "12px",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                알림
                {unreadCount > 0 && (
                 <span
  style={{
    fontSize: "12px",
    backgroundColor: "#739FF2",
    color: "#fff",
    borderRadius: "7px",
    marginLeft: "-1px",

    minWidth: "18px",
    height: "18px",

    display: "flex",            
    alignItems: "center",          
    justifyContent: "center",      

    fontWeight: "500",
  }}
>
  {unreadCount}
</span>

                )}
              </NavLink>
            </NavItem>
          </Nav>
        </div>

        {/* 내 정보 */}
        <div>
          <h6 className="fw-bold mb-2" style={{ color: "#739FF2", fontSize:"14px" }}>내 정보</h6>
          <Nav vertical>
            <NavItem>
              <NavLink to="/mypage/points" style={{ color: "#000", fontSize:"12px", textDecoration: "none" }}>
                포인트
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/mypage/tier" style={{ color: "#000", fontSize:"12px", textDecoration: "none" }}>
                회원 등급
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/mypage/addressList" style={{ color: "#000", fontSize:"12px", textDecoration: "none" }}>
                배송지 관리
              </NavLink>
            </NavItem>
            <NavItem>
                <NavLink to="/mypage/profileIndex"  style={{ color: "#000", fontSize:"12px", textDecoration: "none" }}>
                개인정보 관리
              </NavLink>
            </NavItem>
          </Nav>
        </div>
      </div>
        
      {/* Content */}
      <div style={{ flex: 1, padding: "10px", width:'880px'}}><UserInfo />{children}</div>
      
    </div>
  </>);
}