import React, { useEffect, useState } from "react";
import "./MypageAlert.css";
import axios from "axios";

export default function MypageAlert() {
  const [alertList, setAlertList] = useState([]);
  const [openedIds, setOpenedIds] = useState([]); // 열려있는 아코디언 ID(여러 개!)
  const [readUiIds, setReadUiIds] = useState([]); // NEW 제거용 UI 상태

  const username = "ehgns0311";

  // 알림 리스트 불러오기
  const getAlertList = () => {
    axios
      .get(`http://localhost:8080/mypage/alert?username=${username}`)
      .then((res) => setAlertList(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAlertList();
  }, []);

  // 읽지 않은 알림 수
  const unreadCount = alertList.filter(
    (a) => !a.readedAt && !readUiIds.includes(a.id)
  ).length;

  // 아코디언 토글 (여러 개 동시에 열릴 수 있음)
  const toggle = (id) => {
    // 이미 열려있으면 → 닫기
    if (openedIds.includes(id)) {
      setOpenedIds(openedIds.filter((item) => item !== id));
    } else {
      // 열리면 NEW 제거 처리
      if (!readUiIds.includes(id)) {
        setReadUiIds([...readUiIds, id]);
      }
      // 열기
      setOpenedIds([...openedIds, id]);
    }
  };

  // 삭제 기능
  const deleteAlert = (id) => {
    if (!window.confirm("이 알림을 삭제하시겠습니까?")) return;

    axios
      .delete(`http://localhost:8080/mypage/alert/delete?id=${id}`)
      .then(() => {
        // 화면에서 삭제
        setAlertList(alertList.filter((alert) => alert.id !== id));

        // 열려있던 배열에서도 제거
        setOpenedIds(openedIds.filter((item) => item !== id));
        setReadUiIds(readUiIds.filter((item) => item !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1 className="alert-title-main">알림</h1>

      <p className="alert-count">
        읽지 않은 알림이{" "}
        <strong className="alert-blue">{unreadCount}개</strong> 있습니다.
      </p>

      <div className="alert-list">
        {alertList.length === 0 && (
          <div style={{ padding: "20px", color: "#777" }}>
            알림이 없습니다.
          </div>
        )}

        {alertList.map((alert) => {
          const isOpen = openedIds.includes(alert.id);
          const showNew = !alert.readedAt && !readUiIds.includes(alert.id);
          const unreadBackground = showNew;

          return (
            <div
              key={alert.id}
              className={`alert-accordion-item ${
                unreadBackground ? "alert-unread" : ""
              }`}
            >
              {/* 헤더 */}
              <div className="alert-accordion-header" onClick={() => toggle(alert.id)}>
                <div className="alert-left">
                  <div className="alert-icon">✉</div>
                  <div>
                    <div className="alert-title">
                      {alert.title}
                      {showNew && <span className="alert-badge-new">NEW</span>}
                    </div>
                    <div className="alert-date">{alert.createdAt}</div>
                  </div>
                </div>
                <div className="alert-arrow">{isOpen ? "▲" : "▼"}</div>
              </div>

              {/* 본문 */}
              {isOpen && (
                <div className="alert-accordion-body">
                  <div className="alert-text">{alert.content}</div>

                  <button
                    className="alert-btn-delete alert-delete-bottom"
                    onClick={() => deleteAlert(alert.id)}
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 안내 박스 */}
      <div className="alert-info-box">
        <div className="alert-info-title">안내사항</div>
        • 알림은 30일 보관 후 자동 삭제됩니다.
        <br />
        • 삭제된 알림은 복구할 수 없습니다.
      </div>
    </>
  );
}
