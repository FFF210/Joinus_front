import React, { useState, useEffect } from 'react';
import { myAxios } from '../../config';
import { X, Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import OptionAddModal from './OptionAddModal';
import '../../styles/components/button.css';
import './GBProductCreate.css';

const GBProductCreatePage = () => {
  const [formData, setFormData] = useState({
    status: 'DRAFT',
    startDate: '',
    endDate: '',
    category: '',
    productName: '',
    country: '',
    siteUrl: '',
    description: '',
    originalPrice: '',
    shippingCost: '',
    exchangeRate: 0,
    participants: 0,
    feeRate: 10,
    domesticShipping: '3000',
    groupBuyPrice: '',
    supplierName: '',
    proposalNumber: '',
    minParticipants: '',
    productMemo: '',
    shippingMethod: 'DEFAULT'
  });

  const [mainImage, setMainImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [detailImages, setDetailImages] = useState([]);
  const [isLoadingRate, setIsLoadingRate] = useState(true);

  // 옵션 그룹 상태
  const [optionGroups, setOptionGroups] = useState([]);
  const [expandedGroup, setExpandedGroup] = useState(null);
  const [showOptionModal, setShowOptionModal] = useState(false);

  // 가격 자동 계산
  useEffect(() => {
    const price = parseFloat(formData.originalPrice) || 0;
    const shipping = parseFloat(formData.shippingCost) || 0;
    const rate = parseFloat(formData.exchangeRate) || 0;
    const people = parseInt(formData.participants) || 1;
    const fee = parseFloat(formData.feeRate) || 0;
    const domestic = parseFloat(formData.domesticShipping) || 0;

    const totalDollar = price + shipping;
    const totalWon = totalDollar * rate;
    const perPerson = totalWon / people;
    const final = perPerson * (1 + fee / 100) + domestic;

    updateField('groupBuyPrice', Math.round(final));
  }, [
    formData.originalPrice,
    formData.shippingCost,
    formData.exchangeRate,
    formData.participants,
    formData.domesticShipping
  ]);

  // 환율 자동 불러오기
  useEffect(() => {
    fetchExchangeRate();
  }, []);

  // 환율 불러오기
  const fetchExchangeRate = async () => {
    try {
      setIsLoadingRate(true);
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      const usdToKrw = data.rates.KRW;
      updateField('exchangeRate', Math.round(usdToKrw));
    } catch (error) {
      console.error('환율 불러오기 실패:', error);
      updateField('exchangeRate', 1350);
    } finally {
      setIsLoadingRate(false);
    }
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // 참여 인원 조정
  const adjustParticipants = (delta) => {
    updateField('participants', Math.max(1, formData.participants + delta));
  };

  // 옵션 그룹 추가
  const handleAddOptionGroup = (optionGroup) => {
    setOptionGroups(prev => [...prev, optionGroup]);
    setShowOptionModal(false);
  };

  // 옵션 그룹 삭제
  const handleDeleteOptionGroup = (id) => {
    setOptionGroups(prev => prev.filter(group => group.id !== id));
  };

  //  옵션 그룹 토글
  const toggleOptionGroup = (id) => {
    setExpandedGroup(prev => prev === id ? null : id);
  };

  // 창 닫기 전 경고
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
      return '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  // 상태 변환 함수 (백에서 해줘서 필요없지만...)
  // const convertStatus = (status) => {
  //   const statusMap = {
  //     '미게시': 'DRAFT',
  //     '진행중': 'ONGOING',
  //     '구매대기': 'PENDING_ORDER',
  //     '완료': 'COMPLETED'
  //   };
  //   return statusMap[status] || 'DRAFT';
  // };

  // 날짜 변환 함수
  const formatDateToTimestamp = (dateString) => {
    if (!dateString) return null;
    return `${dateString} 00:00:00`;
  };

  //제안 숫자 추출 함수
  const extractNumberOnly = (input) => {
    if (!input) return '';

    // 숫자만 있으면 그대로
    if (/^\d+$/.test(input)) {
      return input;
    }

    // URL에서 숫자 추출
    const parts = input.split('/');
    for (let i = parts.length - 1; i >= 0; i--) {
      if (/^\d+$/.test(parts[i])) {
        return parts[i];
      }
    }

    return '';
  };


  // ===== 저장 (미게시) =====
  const handleSave = async () => {
    try {
      const productFormData = new FormData();

      // 기본 정보
      productFormData.append('name', formData.productName);
      productFormData.append('categoryId', formData.category);
      productFormData.append('startDate', formatDateToTimestamp(formData.startDate));
      productFormData.append('endDate', formatDateToTimestamp(formData.endDate));
      productFormData.append('originalSiteUrl', formData.siteUrl);
      productFormData.append('description', formData.description);
      productFormData.append('originalPrice', formData.originalPrice);
      productFormData.append('abroadShippingCost', formData.shippingCost);
      productFormData.append('exchangeRate', formData.exchangeRate);
      productFormData.append('minParticipants', formData.minParticipants);
      productFormData.append('price', formData.groupBuyPrice);
      productFormData.append('supplierName', formData.supplierName);
      productFormData.append('shippingMethod', formData.shippingMethod);

      productFormData.append('note', formData.productMemo);

      // proposalId (있을 때만)
      if (formData.proposalNumber) {
        productFormData.append('proposalId', formData.proposalNumber);
      }

      productFormData.append('status', formData.status);

      // 파일들
      if (mainImage) {
        productFormData.append('thumbnail', mainImage);
      }
      if (additionalImages && additionalImages.length > 0) {
        additionalImages.forEach(img => {
          productFormData.append('images', img);
        });
      }
      if (detailImages && detailImages.length > 0) {
      detailImages.forEach(img => {
        productFormData.append('details', img);
      });
    }

      const response = await myAxios().post('/admin/gbProductCreate', productFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const productId = response.data;

      // 옵션 그룹별로 등록
      if (optionGroups && optionGroups.length > 0) {
        for (const group of optionGroups) {
          for (const option of group.options) {
            const optionData = {
              groupName: group.groupName,
              name: option.name,
              price: option.price
            };

            await myAxios().post(`/admin/gbProducts/${productId}/options`, [optionData]);
          }
        }
      }

      alert('미게시 상태로 저장되었습니다!');

      if (window.opener && !window.opener.closed) {
        window.opener.location.reload();
      }

      window.close();

    } catch (error) {
      console.error('저장 오류:', error);
      alert(`저장 실패: ${error.response?.data?.message || error.message}`);
    }
  };

  // ===== 게시 =====
  const handleSubmit = async () => {
    try {
      const productFormData = new FormData();

      // 기본 정보
      productFormData.append('name', formData.productName);
      productFormData.append('categoryId', formData.category);
      productFormData.append('startDate', formatDateToTimestamp(formData.startDate));
      productFormData.append('endDate', formatDateToTimestamp(formData.endDate));
      productFormData.append('originalSiteUrl', formData.siteUrl);
      productFormData.append('description', formData.description);
      productFormData.append('originalPrice', formData.originalPrice);
      productFormData.append('abroadShippingCost', formData.shippingCost);
      productFormData.append('exchangeRate', formData.exchangeRate);
      productFormData.append('minParticipants', formData.minParticipants);
      productFormData.append('price', formData.groupBuyPrice);
      productFormData.append('supplierName', formData.supplierName);
      productFormData.append('shippingMethod', formData.shippingMethod);
      productFormData.append('note', formData.productMemo);
      if (formData.proposalNumber) {
        productFormData.append('proposalId', formData.proposalNumber);
      }
      productFormData.append('status', formData.status);

      // 썸네일 (필수)
      if (mainImage) {
        productFormData.append('thumbnail', mainImage);
      } else {
        alert('대표 이미지를 업로드해주세요.');
        return;
      }

      // 미리보기
      if (additionalImages && additionalImages.length > 0) {
        additionalImages.forEach(img => {
          productFormData.append('images', img);
        });
      }

      //상품 상세설명 이미지
      if (detailImages && detailImages.length > 0) {
      detailImages.forEach(img => {
        productFormData.append('details', img);
      });
    }

      const productResponse = await myAxios().post('/admin/gbProductCreate', productFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const productId = productResponse.data;
      console.log('✅ 상품 등록 완료:', productId);

      // 옵션 그룹별로 등록
      if (optionGroups && optionGroups.length > 0) {
        for (const group of optionGroups) {
          for (const option of group.options) {
            const optionData = {
              groupName: group.groupName,
              name: option.name,
              price: option.price
            };

            await myAxios().post(`/admin/gbProducts/${productId}/options`, [optionData]);
          }
        }

        console.log('✅ 옵션 등록 완료');
      }

      alert(`공구가 등록되었습니다! (ID: ${productId})`);

      if (window.opener && !window.opener.closed) {
        window.opener.postMessage({
          type: 'GB_PRODUCT_CREATED',
          productId: productId
        }, '*');
        window.opener.location.reload();
      }

      window.close();

    } catch (error) {
      console.error('등록 오류:', error);
      alert(`등록 실패: ${error.response?.data?.message || error.message}`);
    }
  };

  //URL 파라미터로 proposalId 받을 때 대비
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const proposalId = urlParams.get('proposalId');

    if (proposalId) {
      updateField('proposalNumber', proposalId);  // 폼에 자동 입력
    }
  }, []);

  return (
    <div className="gb-product-create-page">
      <div className="create-container">

        {/* 헤더 */}
        <div className="modal-header-large">
          <h2>공구 등록</h2>
        </div>

        {/* 내용 */}
        <div className="modal-body-large">

          {/* 표시 설정 */}
          <section className="form-section">
            <h3 className="section-title">표시 설정</h3>
            <div className="form-field">
              <label>상태</label>
              <select value={formData.status} onChange={(e) => updateField('status', e.target.value)}>
                <option value="DRAFT">미게시</option>
                <option value="ONGOING">진행중</option>
                <option value="PENDING_ORDER">발주대기</option>
                <option value="COMPLETED">완료</option>
              </select>
            </div>
          </section>

          {/* 진행기간 */}
          <section className="form-section">
            <h3 className="section-title">진행기간</h3>
            <div className="form-row">
              <div className="form-field">
                <label>시작일</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => updateField('startDate', e.target.value)}
                />
              </div>
              <div className="form-field">
                <label>마감일</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => updateField('endDate', e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* 카테고리 선택 */}
          <section className="form-section">
            <h3 className="section-title">카테고리 선택</h3>
            <div className="form-field">
              <select value={formData.category} onChange={(e) => updateField('category', e.target.value)}>
                <option value="">카테고리 선택</option>
                <option value="1">전자기기</option>
                <option value="2">건강식품</option>
                <option value="3">화장품</option>
                <option value="4">생활용품</option>
                <option value="5">패션/잡화</option>
              </select>
            </div>
          </section>

          {/* 기본 정보 */}
          <section className="form-section">
            <h3 className="section-title">기본 정보</h3>

            <div className="form-field">
              <label>공구 상품명</label>
              <input
                type="text"
                placeholder="공동 구매로 등록할 상품명을 입력하세요"
                value={formData.productName}
                onChange={(e) => updateField('productName', e.target.value)}
              />
            </div>

            <div className="form-field">
              <label>원 판매 국가</label>
              <input
                type="text"
                placeholder="원 판매 국가를 입력하세요"
                value={formData.country}
                onChange={(e) => updateField('country', e.target.value)}
              />
            </div>

            <div className="form-field">
              <label>원 사이트 주소</label>
              <input
                type="url"
                placeholder=""
                value={formData.siteUrl}
                onChange={(e) => updateField('siteUrl', e.target.value)}
              />
            </div>

            {/* 대표이미지 */}
            <div className="form-field">
              <label>대표이미지 (필수)</label>
              {mainImage && (
                <div className="image-preview">
                  <img src={URL.createObjectURL(mainImage)} alt="대표이미지" />
                  <button
                    className="remove-image-btn"
                    onClick={() => setMainImage(null)}
                  >
                    ×
                  </button>
                </div>
              )}
              {!mainImage && (
                <div className="upload-box">
                  <input
                    type="file"
                    id="main-image"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => setMainImage(e.target.files[0])}
                  />
                  <label htmlFor="main-image" className="upload-label">
                    <div className="upload-content">
                      ↑<br />
                      <span className="upload-text">Click to upload</span><br />
                      <small>이미지 파일만 가능</small>
                    </div>
                  </label>
                </div>
              )}
            </div>

            {/* 추가 이미지 */}
            <div className="form-field">
              <label>추가 이미지 (최대 4개)</label>

              <div className="image-grid">
                {additionalImages.map((img, index) => (
                  <div key={index} className="image-slot preview">
                    <img src={URL.createObjectURL(img)} alt={`preview-${index}`} />
                    <button
                      className="remove-image-btn"
                      onClick={() => {
                        setAdditionalImages(prev => prev.filter((_, i) => i !== index));
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}

                {additionalImages.length < 4 && (
                  <div className="image-slot">
                    <input
                      type="file"
                      id="additional-images"
                      accept="image/*"
                      multiple
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        const remaining = 4 - additionalImages.length;
                        const newFiles = files.slice(0, remaining);
                        setAdditionalImages(prev => [...prev, ...newFiles]);
                        e.target.value = '';
                      }}
                    />
                    <label htmlFor="additional-images" className="upload-label">
                      <div className="upload-content">
                        <Plus size={32} />
                      </div>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* 상품 설명 */}
          <section className="form-section">
            <h3 className="section-title">상품 설명</h3>
            <div className="form-field">
              <textarea
                rows={6}
                placeholder="상품에 대한 상세 설명을 입력하세요"
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
              />
            </div>
          </section>

          <section className="form-section">
            <h3 className="section-title">상품 상세설명 이미지</h3>

            <div className="form-field">
              <label>상세설명 이미지 (최대 4개)</label>

              <div className="image-grid">
                {/* 미리보기 */}
                {detailImages.map((img, index) => (
                  <div key={index} className="image-slot preview">
                    <img src={URL.createObjectURL(img)} alt={`detail-${index}`} />
                    <button
                      className="remove-image-btn"
                      onClick={() => {
                        setDetailImages(prev => prev.filter((_, i) => i !== index));
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}

                {/* 추가 버튼 (4개 미만일 때만) */}
                {detailImages.length < 4 && (
                  <div className="image-slot">
                    <input
                      type="file"
                      id="detail-images"
                      accept="image/*"
                      multiple
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        const remaining = 4 - detailImages.length;
                        const newFiles = files.slice(0, remaining);
                        setDetailImages(prev => [...prev, ...newFiles]);
                        e.target.value = '';
                      }}
                    />
                    <label htmlFor="detail-images" className="upload-label">
                      <div className="upload-content">
                        <Plus size={32} />
                      </div>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </section>


          {/* 옵션 정보 */}
          <section className="form-section">
            <h3 className="section-title">옵션 정보</h3>

            {optionGroups.length > 0 && (
              <div className="options-table">
                {optionGroups.map((group) => (
                  <div key={group.id} className="option-group-container">
                    <div
                      className="option-group-header"
                      onClick={() => toggleOptionGroup(group.id)}
                    >
                      <div className="option-group-summary">
                        <strong>{group.groupName}</strong>
                        <span className="option-count">
                          {group.options.length}개 옵션
                        </span>
                      </div>
                      <div className="option-actions">
                        {expandedGroup === group.id ?
                          <ChevronUp size={20} /> :
                          <ChevronDown size={20} />
                        }
                      </div>
                    </div>

                    {expandedGroup === group.id && (
                      <div className="option-group-details">
                        {group.options.map((opt, index) => (
                          <div key={index} className="option-detail-row">
                            <span className="option-detail-name">{opt.name}</span>
                            <span className="option-detail-price">
                              +{opt.price.toLocaleString()}원
                            </span>
                          </div>
                        ))}
                        <button
                          className="delete-group-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteOptionGroup(group.id);
                          }}
                        >
                          그룹 삭제
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <button
              className="add-btn"
              onClick={() => setShowOptionModal(true)}
            >
              <Plus size={16} /> 옵션 추가
            </button>
          </section>

          {/* 판매 정보 */}
          <section className="form-section">
            <h3 className="section-title">판매 정보 및 가격 계산</h3>

            <div className="price-calc-grid">

              <div className="form-field">
                <label>원가 ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="12.50"
                  value={formData.originalPrice}
                  onChange={(e) => updateField('originalPrice', e.target.value)}
                />
              </div>

              <div className="form-field">
                <label>해외 배송비 ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="40.00"
                  value={formData.shippingCost}
                  onChange={(e) => updateField('shippingCost', e.target.value)}
                />
              </div>

              <div className="form-field full-width">
                <label>환율 (₩/$)</label>
                <div className="exchange-rate-box">
                  {isLoadingRate ? (
                    <span className="loading-text">환율 불러오는 중...</span>
                  ) : (
                    <>
                      <input
                        type="number"
                        value={formData.exchangeRate}
                        onChange={(e) => updateField('exchangeRate', e.target.value)}
                      />
                      <button
                        className="refresh-rate-btn"
                        onClick={fetchExchangeRate}
                        type="button"
                        title="환율 새로고침"
                      >
                        🔄
                      </button>
                    </>
                  )}
                </div>
                <small className="field-hint">현재 환율 자동 적용 (실시간)</small>
              </div>

              <div className="form-field">
                <label>예상 참여 인원 *</label>
                <div className="calc-counter">
                  <button
                    className="calc-counter-btn"
                    onClick={() => adjustParticipants(-1)}
                    type="button"
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    className="calc-counter-value"
                    value={formData.participants}
                    onChange={(e) => updateField('participants', parseInt(e.target.value) || 1)}
                  />
                  <button
                    className="calc-counter-btn"
                    onClick={() => adjustParticipants(1)}
                    type="button"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="form-field">
                <label>수수료</label>
                <input
                  type="text"
                  value="10%"
                  disabled
                  style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}
                />
              </div>

              <div className="form-field full-width">
                <label>국내 배송비 (₩)</label>
                <input
                  type="number"
                  placeholder="3000"
                  value={formData.domesticShipping}
                  onChange={(e) => updateField('domesticShipping', e.target.value)}
                />
              </div>
            </div>

            {/* 계산 결과 */}
            <div className="calc-result-inline">
              <div className="calc-result-row">
                <span>달러 총액:</span>
                <strong>${((parseFloat(formData.originalPrice) || 0) + (parseFloat(formData.shippingCost) || 0)).toFixed(2)}</strong>
              </div>
              <div className="calc-result-row">
                <span>원화 총액:</span>
                <strong>
                  {Math.round(
                    ((parseFloat(formData.originalPrice) || 0) + (parseFloat(formData.shippingCost) || 0)) *
                    (parseFloat(formData.exchangeRate) || 0)
                  ).toLocaleString()}원
                </strong>
              </div>
              <div className="calc-result-row">
                <span>1인당 가격:</span>
                <strong>
                  {Math.round(
                    ((parseFloat(formData.originalPrice) || 0) + (parseFloat(formData.shippingCost) || 0)) *
                    (parseFloat(formData.exchangeRate) || 0) /
                    (parseInt(formData.participants) || 1)
                  ).toLocaleString()}원
                </strong>
              </div>
              <div className="calc-result-row highlight">
                <span>최종 판매가:</span>
                <strong className="final-price">
                  {formData.groupBuyPrice.toLocaleString()}원
                </strong>
              </div>
              <small className="calc-formula">
                = (원가 + 해외배송비) × 환율 ÷ 인원 × (1 + 수수료) + 국내배송비
              </small>
            </div>

            <div className="form-field" style={{ marginTop: '24px' }}>
              <label>납품 업체명</label>
              <input
                type="text"
                placeholder="납품 업체명을 입력하세요"
                value={formData.supplierName}
                onChange={(e) => updateField('supplierName', e.target.value)}
              />
            </div>
          </section>

          {/* 공구 정보 */}
          <section className="form-section">
            <h3 className="section-title">공구 정보</h3>

            <div className="form-field">
              <label>제안 번호 및 제안 url</label>
              <input
                type="text"
                placeholder="제안 번호 또는 URL을 입력하세요 (예: 123 또는 /proposal/123)"
                value={formData.proposalNumber}
                onChange={(e) => updateField('proposalNumber', e.target.value)}
              />
              <small className="field-hint">
                제안 번호만 입력하거나, 제안 페이지 URL을 복붙하세요.
              </small>
            </div>

            {/* ✅ 제안 페이지 바로가기 버튼 (있을 때만) */}
            {formData.proposalNumber && (
              <a
                href={`/proposal/${extractNumberOnly(formData.proposalNumber)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="proposal-link-btn"
              >
                📋 제안 페이지 보기
              </a>
            )}

            <div className="form-field">
              <label>최소 인원</label>
              <input
                type="number"
                placeholder="최소 참여 인원을 입력하세요"
                value={formData.minParticipants}
                onChange={(e) => updateField('minParticipants', e.target.value)}
              />
            </div>

            <div className="form-field">
              <label>상품 메모 및 주의사항</label>
              <textarea
                rows={4}
                placeholder="상품 관련 메모나 주의사항을 입력하세요"
                value={formData.productMemo}
                onChange={(e) => updateField('productMemo', e.target.value)}
              />
            </div>
          </section>

          {/* 배송 정보 */}
          <section className="form-section">
            <h3 className="section-title">배송 정보</h3>

            {/* 배송 방법 (Enum) */}
            <div className="form-field">
              <label>배송 방법</label>
              <select
                value={formData.shippingMethod}
                onChange={(e) => updateField('shippingMethod', e.target.value)}
              >
                <option value="DEFAULT">유료</option>
                <option value="FREE">무료</option>
              </select>
            </div>


          </section>

        </div>

        {/* 푸터 */}
        <div className="modal-footer-large">
          <button className="btn-secondary" onClick={() => window.close()}>취소</button>
          <button className="btn-outline" onClick={handleSave}>저장</button>
          <button className="btn-outline">미리보기</button>
          <button className="btn-primary" onClick={handleSubmit}>게시</button>
        </div>
      </div>

      {/* 옵션 모달 */}
      {showOptionModal && (
        <OptionAddModal
          onClose={() => setShowOptionModal(false)}
          onAdd={handleAddOptionGroup}
        />
      )}
    </div>
  );
};

export default GBProductCreatePage;