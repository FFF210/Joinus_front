import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { myAxios } from "../../../config";
import "./AddressEdit.css";

export default function AddressEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 로그인 유저
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const username = userInfo?.username;

  const [form, setForm] = useState({
    id: null,
    addressName: "",
    recipientName: "",
    phone: "",
    postcode: "",
    streetAddress: "",
    addressDetail: "",
    accessInstructions: "",
    isDefault: false,
  });

  // 기존 배송지 조회
  useEffect(() => {
    myAxios()
      .get(`/mypage/address/${id}`)
      .then((res) => {
        setForm(res.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  // input 공용 핸들러
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 수정 요청
  const handleSubmit = () => {
    if (!username) {
      alert("로그인이 필요합니다.");
      return;
    }

    myAxios()
      .put(`/mypage/address/${id}`, {
        ...form,
        memberUsername: username, // ✅ submit 시점에만 주입
      })
      .then(() => {
        alert("배송지가 수정되었습니다!");
        navigate("/mypage/addressList");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="addressedit-content">
      <div className="addressedit-title">배송지 수정</div>

      <div className="addressedit-form-row">
        <label className="addressedit-label">배송지명</label>
        <input
          name="addressName"
          value={form.addressName}
          onChange={handleChange}
          className="addressedit-input-box"
        />
      </div>

      <div className="addressedit-form-row">
        <label className="addressedit-label">받는 분</label>
        <input
          name="recipientName"
          value={form.recipientName}
          onChange={handleChange}
          className="addressedit-input-box"
        />
      </div>

      <div className="addressedit-form-row">
        <label className="addressedit-label">연락처</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="addressedit-input-box"
        />
      </div>

      <div className="addressedit-form-row">
        <label className="addressedit-label">주소</label>
        <input
          name="postcode"
          value={form.postcode}
          onChange={handleChange}
          className="addressedit-input-box"
        />
        <input
          name="streetAddress"
          value={form.streetAddress}
          onChange={handleChange}
          className="addressedit-input-box"
        />
        <textarea
          name="addressDetail"
          value={form.addressDetail}
          onChange={handleChange}
          className="addressedit-textarea-box"
        />
      </div>

      <div className="addressedit-form-row">
        <label className="addressedit-label">출입방법</label>
        <input
          name="accessInstructions"
          value={form.accessInstructions}
          onChange={handleChange}
          className="addressedit-input-box"
        />
      </div>

      <div className="addressedit-btn-row">
        <button onClick={handleSubmit} className="addressedit-btn-confirm">
          확인
        </button>
        <button onClick={() => navigate(-1)} className="addressedit-btn-cancel">
          취소
        </button>
      </div>
    </div>
  );
}
