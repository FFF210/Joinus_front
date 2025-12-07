import "bootstrap/dist/css/bootstrap.min.css";
import { React, useState,useRef, useEffect } from "react";
import { Link, useNavigate, useParams  } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { myAxios, baseUrl  } from "../../../config";

export default function ProposalModify() {
   const { id } = useParams();  
    const proposalId = id;   // 이제 proposalId 정의됨

    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [mainImage, setMainImage] = useState(null);
    const [subImages, setSubImages] = useState([null, null, null, null]);
  
    const [originalSiteUrl, setOriginalSiteUrl] = useState('');
    const [originalPrice, setOriginalPrice] = useState('');
    const [abroadShippingCost, setAbroadShippingCost] = useState('');
    const [minPart, setMinPart] = useState('');
  
    const [mainFile, setMainFile] = useState(null);
    const [subFiles, setSubFiles] = useState([null, null, null, null]);

    const navigate = useNavigate();
  
    const mainRef = useRef(null);
    const subRef = useRef(null);


    // 수정하면 submit하는 영역 
    const submit = () => {
      const formData = new FormData();
      formData.append('id', proposalId);
      formData.append('productName', productName);
      formData.append('category', category !== "선택하세요." ? category : "");
      formData.append('description', description);
      formData.append('originalSiteUrl', originalSiteUrl);
      formData.append('originalPrice', originalPrice);
      formData.append('abroadShippingCost', abroadShippingCost);
      formData.append('minPart', minPart);
      formData.append('memberUsername', "1");

      if (mainFile) formData.append('mainImage', mainFile);

      subFiles.forEach((file) => {
        if (file) formData.append('subImages', file);
      });

      myAxios().post(`/proposalModify`, formData)
        .then(res => {
          let proposalId = res.data;
          navigate(`/proposalsList/proposalDetail/${proposalId}`);
        })
        .catch(err => {
          console.log(err);
        });
    };
  
  
    // 대표 이미지 업로드
    const handleMainImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        setMainFile(file); // 서버 전송용
        const url = URL.createObjectURL(file);
        setMainImage(url); // 화면 미리보기용
      }
    };
  
    // 일반 이미지 업로드
    const handleSubImageUpload = (e, index) => {
      const file = e.target.files[0];
      if (file) {
        const newFiles = [...subFiles];
        newFiles[index] = file;
        setSubFiles(newFiles); // 서버 전송용
  
        const url = URL.createObjectURL(file);
        const newImages = [...subImages];
        newImages[index] = url;
        setSubImages(newImages); // 화면 미리보기용
      }
    };

    useEffect(() => {
      myAxios().get(`/proposalDetail?id=${proposalId}`)
        .then(res => {
          const p = res.data;
          setProductName(p.productName);
          setCategory(p.category);
          setDescription(p.description);
          setOriginalPrice(p.originalPrice);
          setOriginalSiteUrl(p.originalSiteUrl);
          setAbroadShippingCost(p.abroadShippingCost);
          setMinPart(p.minPart);

          // 이미지 미리보기
          setMainImage(`${baseUrl}/imageView?filename=${p.imageUrl}`);

          const subImgArr = (p.subImageUrls || []).filter(img => img !== p.imageUrl);
            setSubImages([
              subImgArr[0] ? `${baseUrl}/imageView?filename=${subImgArr[0]}` : null,
              subImgArr[1] ? `${baseUrl}/imageView?filename=${subImgArr[1]}` : null,
              subImgArr[2] ? `${baseUrl}/imageView?filename=${subImgArr[2]}` : null,
              subImgArr[3] ? `${baseUrl}/imageView?filename=${subImgArr[3]}` : null,
            ]);
          });
  }, []);

  return (
    <>
      {/* 제목 영역 (1020px 고정) */}
      <div style={styles.pageWrapper}>
        <div style={styles.container}>
          <h3 className="mb-4 fw-bold text-start">제안 수정하기</h3>
          <h6 className="text-start">
            공동 구매 제안을 수정해 주세요! 정확한 정보는 더 많은 참여를 이끌어낼 수 있어요.
          </h6>
        </div>
      </div>

      {/* 전체 폭 가로선 */}
      <hr style={styles.fullWidthHr} />

      {/* 본문 영역 */}
      <div style={styles.pageWrapper}>
              <div style={styles.container}>
                <Form>
                  <FormGroup><Link to="/proposalsList" style={{textDecoration: 'none', color: 'black'}}>
                    <Label className="fw-bold text-end d-block"><img src="/left.png" alt="뒤로가기" className="back" style={{width:'20px', height:'20px',  marginRight:"5px"}}/>뒤로가기</Label></Link>
                  </FormGroup>
                  {/* 이름 */}
                  <FormGroup className="mb-3">
                    <Label className="fw-bold text-start d-block" >상품명</Label>
                    <Input type="text" name="productName" value={productName} onChange={(e)=> setProductName(e.target.value)} placeholder="상품명을 입력하세요." />
                  </FormGroup>
      
                  {/* 제목 */}
                  {/* <FormGroup className="mb-3">
                    <Label className="fw-bold text-start d-block">제목 *</Label>
                    <Input type="text" name="title" onChange={(e)=> setTitle(e.target.value)} placeholder="예) 프리미엄 컵 이이전 공동구매 제안" />
                  </FormGroup> */}
      
                  {/* 카테고리 */}
                  <FormGroup className="mb-3">
                    <Label className="fw-bold text-start d-block">카테고리 *</Label>
                    <Input type="select" name="category" value={category} onChange={(e)=> setCategory(e.target.value)}>
                      <option>선택하세요.</option>
                      <option>뷰티</option>
                      <option>패션</option>
                      <option>전자기기</option>
                      <option>홈&리빙</option>
                      <option>식품</option>
                      <option>스포츠</option>
                    </Input>
                  </FormGroup>
      
                  {/* 상세 설명 */}
                  <FormGroup className="mb-3">
                    <Label className="fw-bold text-start d-block">상세 설명 *</Label>
                    <Input type="textarea" name="description" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="상세한 내용을 입력해주세요." rows={5} style={{ resize: "none" }}/>
                  </FormGroup>
      
                  {/* 상품 이미지 업로드 */}
                  <FormGroup className="mb-4">
                    <Label className="fw-bold text-start d-block">상품 이미지 *</Label>
                    <div style={styles.bigUploadBox}>
                      <div style={styles.imageGrid}>

                        {/* 대표 이미지 */}
                        <div style={styles.imageBox}>
                          <input type="file" accept="image/*" onChange={handleMainImageUpload} style={styles.fileInput}/>
                          {mainImage ? (
                            <img src={mainImage} alt="대표 이미지" style={styles.preview} />
                          ) : (
                            <p className="fw-bold text-center text-secondary small">
                              대표 이미지<br />Click to upload
                            </p>
                          )}
                        </div>

                        {/* ✔ 조건문 제거 → subImages 항상 표시 */}
                        {subImages.map((img, idx) => (
                          <div key={idx} style={styles.imageBox}>
                            <input type="file" accept="image/*" onChange={(e) => handleSubImageUpload(e, idx)} style={styles.fileInput}/>
                            {img ? (
                              <img src={img} alt={`서브 이미지 ${idx + 1}`} style={styles.preview}/>
                            ) : (
                              <p className="text-center text-secondary small">
                                사진 {idx + 1}<br />Click to upload
                              </p>
                            )}
                          </div>
                        ))}

                      </div>
                    </div>
                  </FormGroup>
      
                  {/* 원 상품 링크 */}
                  <FormGroup className="mb-4">
                    <Label className="fw-bold text-start d-block">원 상품 링크 *</Label>
                    <Input type="text" name="originalSiteUrl" value={originalSiteUrl} onChange={(e)=>setOriginalSiteUrl(e.target.value)} placeholder="상품 링크를 입력해주세요." />
                  </FormGroup>
      
                  {/* 원가 */}
                  <FormGroup className="mb-4">
                    <Label className="fw-bold text-start d-block">원가 *</Label>
                    <Input type="text" name="originalPrice" value={originalPrice} onChange={(e)=> setOriginalPrice(e.target.value)} placeholder="가격을 입력해주세요." />
                  </FormGroup>
      
                  {/* 해외 배송비 */}
                  <FormGroup className="mb-3">
                    <Label className="fw-bold text-start d-block">해외 배송비 *</Label>
                    <Input type="text" name="abroadShippingCost" value={abroadShippingCost} onChange={(e)=> setAbroadShippingCost(e.target.value)} placeholder="가격을 입력해주세요." />
                  </FormGroup>
      
                  {/* 최소 참여 인원 */}
                  <FormGroup className="mb-4">
                    <Label className="fw-bold text-start d-block">최소 참여 인원 *</Label>
                    <Input type="text" name="minPart" value={minPart} onChange={(e)=> setMinPart(e.target.value)} placeholder="예) 20" />
                  </FormGroup>
      
                  <div className="d-flex gap-2 justify-content-end">
                    <Link><Button color="secondary">취소하기</Button></Link>
                    <Button color="primary" onClick={submit}>수정하기</Button>
                  </div>
                </Form>
              </div>
            </div>
    </>
  );
}

const styles = {
  pageWrapper: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#fff",
  },
  container: {
    width: "1020px",
    padding: "20px 0",
  },

  // 전체 폭 hr
  fullWidthHr: {
  width: "100%",
  margin: "0",
},

  imageGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "10px",
    marginTop: "10px",
  },
  imageBox: {
    border: "1px dashed #bbb",
    height: "140px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "4px",
    position: "relative",
    cursor: "pointer",
    overflow: "hidden",
    backgroundColor: "#fafafa",
  },
  fileInput: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0,
    cursor: "pointer",
  },
  preview: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};
