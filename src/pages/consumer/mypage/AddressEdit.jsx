import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddressAdd.css"; // 🔥 Add랑 같은 CSS 사용

export default function AddressEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const username = userInfo?.username;

  const [form, setForm] = useState({
    addressName: "",
    recipientName: "",
    phone: "",
    postcode: "",
    streetAddress: "",
    addressDetail: "",
    accessInstructions: "",
    isDefault: false,
  });

  // =======================
  // 기존 배송지 불러오기
  // =======================
  useEffect(() => {
    if (!username) return;

    axios
      .get(`http://localhost:8080/mypage/address/${id}`)
      .then((res) => {
        setForm(res.data);
      })
      .catch((err) => console.error(err));
  }, [id, username]);

  // =======================
  // input 공용 핸들러
  // =======================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =======================
  // 수정 처리 (PUT)
  // =======================
  const handleSubmit = async () => {
    if (!username) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      await axios.put(`http://localhost:8080/mypage/address/${id}`, {
        ...form,
        memberUsername: username,
      });

      alert("배송지가 수정되었습니다!");
      navigate("/mypage/addressList");
    } catch (err) {
      console.error(err);
      alert("수정 실패했습니다.");
    }
  };

  return (
    <div className="addressadd-content">
      {/* ===== 페이지 제목 ===== */}
      <div className="addressadd-title">배송지 수정</div>

      {/* ===== 배송지명 ===== */}
      <div className="addressadd-form-row">
        <div className="addressadd-label-flex">
          <label className="addressadd-label">
            배송지명 <span className="addressadd-required">*</span>
          </label>

          <label className="addressadd-checkbox-default">
            <input
              type="checkbox"
              name="isDefault"
              checked={form.isDefault}
              onChange={handleChange}
            />
            기본배송지 설정
          </label>
        </div>

        <input
          type="text"
          name="addressName"
          className="addressadd-input-box"
          value={form.addressName}
          onChange={handleChange}
        />
      </div>

      {/* ===== 받는 분 ===== */}
      <div className="addressadd-form-row">
        <label className="addressadd-label">
          받는 분 <span className="addressadd-required">*</span>
        </label>
        <input
          type="text"
          name="recipientName"
          className="addressadd-input-box"
          value={form.recipientName}
          onChange={handleChange}
        />
      </div>

      {/* ===== 연락처 ===== */}
      <div className="addressadd-form-row">
        <label className="addressadd-label">
          연락처 <span className="addressadd-required">*</span>
        </label>
        <input
          type="text"
          name="phone"
          className="addressadd-input-box"
          value={form.phone}
          onChange={handleChange}
        />
      </div>

      {/* ===== 주소 ===== */}
      <div className="addressadd-form-row">
        <label className="addressadd-label">
          주소 <span className="addressadd-required">*</span>
        </label>

        <div className="addressadd-address-row">
          <input
            type="text"
            name="postcode"
            className="addressadd-postcode-input"
            value={form.postcode}
            onChange={handleChange}
          />

          <button className="addressadd-postcode-btn">검색</button>

          <input
            type="text"
            name="streetAddress"
            className="addressadd-road-input"
            value={form.streetAddress}
            onChange={handleChange}
          />

          <button className="addressadd-postcode-btn">검색</button>
        </div>

        <textarea
          name="addressDetail"
          className="addressadd-textarea-box"
          value={form.addressDetail}
          onChange={handleChange}
        ></textarea>
      </div>

      {/* ===== 출입방법 ===== */}
      <div className="addressadd-form-row">
        <label className="addressadd-label">
          공동현관 출입방법 <span className="addressadd-required">*</span>
        </label>
        <input
          type="text"
          name="accessInstructions"
          className="addressadd-input-box"
          value={form.accessInstructions}
          onChange={handleChange}
        />
      </div>

      {/* ===== 버튼 ===== */}
      <div className="addressadd-btn-row">
        <button className="addressadd-btn-confirm" onClick={handleSubmit}>
          확인
        </button>

        <button
          className="addressadd-btn-cancel"
          onClick={() => navigate(-1)}
        >
          취소
        </button>
      </div>
    </div>
  );
}
