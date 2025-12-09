import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import './OptionAddModal.css';

const OptionAddModal = ({ onClose, onAdd }) => {
  const [groupName, setGroupName] = useState('');
  const [options, setOptions] = useState([
    { optionName: '', price: '' }
  ]);

  // 옵션 행 추가
  const addOption = () => {
    setOptions([...options, { optionName: '', price: '' }]);
  };

  // 옵션 행 삭제
  const removeOption = (index) => {
    if (options.length > 1) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  // 옵션 값 변경
  const updateOption = (index, field, value) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  // 확인 버튼
  const handleConfirm = () => {
    if (!groupName.trim()) {
      alert('옵션 그룹명을 입력해주세요.');
      return;
    }

    const hasEmptyOption = options.some(opt => !opt.optionName.trim());
    if (hasEmptyOption) {
      alert('모든 옵션명을 입력해주세요.');
      return;
    }

    // 그룹 전체를 전달
    onAdd({
      groupName,
      options: options.map(opt => ({
        optionName: opt.optionName,
        price: parseInt(opt.price) || 0
      }))
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-small" onClick={(e) => e.stopPropagation()}>
        
        {/* 헤더 */}
        <div className="modal-header">
          <h3>옵션 추가</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* 바디 */}
        <div className="modal-body">
          
          {/* 옵션 그룹명 */}
          <div className="form-field">
            <label>옵션 그룹명 *</label>
            <input 
              type="text"
              placeholder="예: 사이즈, 색상"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          {/* 옵션 리스트 */}
          <div className="options-section">
            <div className="section-header-with-btn">
              <label>옵션 목록 *</label>
              <button 
                className="add-option-btn"
                onClick={addOption}
                type="button"
              >
                <Plus size={16} />
                옵션 추가
              </button>
            </div>

            <div className="option-rows">
              {options.map((option, index) => (
                <div key={index} className="option-input-row">
                  <div className="row-number">{index + 1}</div>
                  
                  <div className="option-inputs">
                    <input 
                      type="text"
                      placeholder="옵션명 (예: S)"
                      value={option.optionName}
                      onChange={(e) => updateOption(index, 'optionName', e.target.value)}
                    />
                    <input 
                      type="number"
                      placeholder="추가 가격"
                      value={option.price}
                      onChange={(e) => updateOption(index, 'price', e.target.value)}
                    />
                    <span className="price-unit">원</span>
                  </div>

                  {options.length > 1 && (
                    <button 
                      className="delete-row-btn"
                      onClick={() => removeOption(index)}
                      type="button"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 푸터 */}
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            취소
          </button>
          <button className="btn-primary" onClick={handleConfirm}>
            확인
          </button>
        </div>

      </div>
    </div>
  );
};

export default OptionAddModal;