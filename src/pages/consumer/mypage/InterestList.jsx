import "bootstrap/dist/css/bootstrap.min.css";
import { Label, FormGroup, Input, Button, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useEffect, useState } from "react";
import { myAxios, baseUrl } from "../../../config";
import { useNavigate } from "react-router-dom";
import "./PaginationCom.css";

export default function InterestList() {
  //     // 로그인 유저 정보 (추가)
  const userInfo =
    JSON.parse(sessionStorage.getItem("userInfo"))
  const username = userInfo?.username;

  const [timeLeftMap, setTimeLeftMap] = useState({});

  // 로그인 유저 정보
  // const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  // const username = userInfo?.username;

  const [interestList, setInterestList] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [allChecked, setAllChecked] = useState(false);

  // ⭐ 페이징 상태
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const size = 10;

  const navigate = useNavigate();

  // 전체 선택
  const handleAllCheck = () => {
    const newAllChecked = !allChecked;
    setAllChecked(newAllChecked);

    const updatedChecked = {};
    interestList.forEach(item => {
      updatedChecked[item.id] = newAllChecked;
    });

    setCheckedItems(updatedChecked);
  };

  // 개별 선택
  const handleItemCheck = (id) => {
    const updatedChecked = {
      ...checkedItems,
      [id]: !checkedItems[id]
    };

    setCheckedItems(updatedChecked);

    const allSelected = interestList.every(
      item => updatedChecked[item.id]
    );
    setAllChecked(allSelected);
  };

  // 관심상품 조회 (페이징)
  useEffect(() => {
    const fetchInterestList = async () => {
      try {
        const response = await myAxios().get("/interestList", {
          params: {
            username,
            page,
            size
          }
        });

        const data = response.data;

        // Page 객체 대응
        setInterestList(data?.content ?? []);
        setTotalPages(data?.totalPages ?? 0);

        setCheckedItems({});
        setAllChecked(false);

      } catch (error) {
        console.error("관심상품 조회 실패", error);
      }
    };

    if (username) fetchInterestList();
  }, [username, page]);

  // 개별 삭제
  const deleteInterest = async (id) => {
    try {
      await myAxios().post("/deleteWish", { id, username });
      setInterestList(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error("관심상품 삭제 실패", error);
    }
  };

  // 선택 삭제
  const deleteSelected = async () => {
    const selectedIds = Object.keys(checkedItems).filter(
      id => checkedItems[id]
    );

    if (selectedIds.length === 0) {
      alert("선택된 항목이 없습니다.");
      return;
    }

    try {
      await Promise.all(
        selectedIds.map(id =>
          myAxios().post("/deleteAllWish", { id, username })
        )
      );

      setInterestList(prev =>
        prev.filter(item => !selectedIds.includes(String(item.id)))
      );

    } catch (error) {
      console.error("선택 삭제 실패", error);
    }
  };

  const parseEndDate = (endDate) => {
    if (!endDate) return null;

    // ✅ Timestamp 객체 대응
    if (typeof endDate === "object" && endDate.time) {
      return endDate.time;
    }

    // 문자열일 경우도 대비
    if (typeof endDate === "string") {
      return new Date(endDate.replace(" ", "T")).getTime();
    }

    return null;
  };

  useEffect(() => {
    if (interestList.length === 0) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const updated = {};

      interestList.forEach(item => {
        const endTime = parseEndDate(item.product?.endDate);

        if (!endTime) {
          updated[item.id] = "날짜 없음";
          return;
        }

        const distance = endTime - now;

        if (distance <= 0) {
          updated[item.id] = "종료";
          return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance / (1000 * 60)) % 60);
        const seconds = Math.floor((distance / 1000) % 60);

        updated[item.id] =
          `${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;
      });

      setTimeLeftMap(updated);
    }, 1000);

    return () => clearInterval(interval);
  }, [interestList]);


  return (
    <>
      <div className="fw-bold d-block" style={{ fontSize: "20px", margin: "20px auto" }}>관심상품</div>
      <div style={{ width: '860px', }}>

        {/* 헤더 */}
        <div style={{
          borderTop: "2px solid #e0e0e0",
          borderBottom: "2px solid #e0e0e0"
        }}>
          <FormGroup check className="header" style={{
            backgroundColor: '#f8f8f8',
            margin: '0',
            height: '48px',
            display: 'flex',
            alignItems: 'center'
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginLeft: '5px',
              width: '120px'
            }}>
              <Input
                type="checkbox"
                checked={allChecked}
                onChange={handleAllCheck}
                style={{ cursor: 'pointer' }}
              />
              <Label check style={{
                margin: 0,
                fontSize: "13px",
                fontWeight: "600",
                color: "#444",
                cursor: 'pointer'
              }}>
               
              </Label>
            </div>
            <Label className="headerLabel" style={{
              margin: "0 280px 0 20px",
              fontSize: "13px",
              fontWeight: "700",
              color: "#444"
            }}>
              상품정보
            </Label>
           <Label
  className="headerLabel"
  style={{
    width: "140px",
    textAlign: "center",
    fontSize: "13px",
    fontWeight: "700",
    color: "#444"
  }}
>
  마감날짜
</Label>

<Label
  className="headerLabel"
  style={{
    width: "80px",
    textAlign: "center",
    fontSize: "13px",
    fontWeight: "700",
    color: "#444"
  }}
>
  선택
</Label>

          </FormGroup>
        </div>
        {/* 상품 리스트 */}
        {interestList.map(item => (
          <div key={item.id}>
            <FormGroup
  check
  style={{
    display: "grid",
    gridTemplateColumns: "40px 520px 180px 80px",
    alignItems: "center",
    height: "120px"
  }}
>

              <Input type="checkbox" style={{ marginRight: "50px" }}
                checked={checkedItems[item.id] || false}
                onChange={() => handleItemCheck(item.id)}
              />
              {/* 상품 이미지 */}
              <div onClick={() => navigate(`/gbProductDetail/${item.product?.id}`)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                <img
                  src={`${baseUrl}/file/gbProduct/${item.product?.thumbnail?.fileName}`}
                  style={{ width: "70px", height: "70px", marginRight: "20px" }}
                />

                {/* 상품명 */}
                <div style={{ fontSize: "12px", width: "450px", marginRight: "20px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {item.product?.name}
                </div>
              </div>

              {/* 시간 컬럼 */}
<div
  style={{
    width: "140px",
    fontSize: "12px",
    color: "red",
    whiteSpace: "nowrap",
    textAlign: "center",          // ⭐ 가로 중앙
    display: "flex",
    justifyContent: "center",     // ⭐ flex 중앙
    alignItems: "center",  
    marginLeft: "10px"       // ⭐ 세로 중앙
  }}
>
  {timeLeftMap[item.id] ?? "계산 중"}
</div>


{/* 선택(삭제) 컬럼 */}
<div
  style={{
    width: "80px",           // ⭐ 선택 컬럼 폭 고정
    display: "flex",
    justifyContent: "center",
    marginLeft:"14px"
  }}
>
  <Button
    size="sm"
    style={{
      backgroundColor: "#f7f7f7",
      color: "black",
      border: "none"
    }}
    onClick={() => deleteInterest(item.id)}
  >
    삭제
  </Button>
</div>

          
            </FormGroup>
            <hr style={{ margin: "0 auto 5px auto" }} />
          </div>
        ))}
      </div>
      {interestList.length > 0 && (
        <Button
  onClick={deleteSelected}
  style={{
    fontSize: "12px",
    width: "80px",
    height: "30px",
    marginTop:"10px",
    backgroundColor: "#739FF2",
    color: "#fff",
    border: "none",
    transition: "background-color 0.15s ease"
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = "#5f88e6"; // ⭐ 살짝 진하게
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = "#739FF2"; // ⭐ 원래 색
  }}
>
  전체 삭제
</Button>

      )}
      <Pagination className="paginationContainer">
        {/* 이전 */}
        <PaginationItem disabled={page === 0}>
          <PaginationLink onClick={() => setPage(page - 1)}>
            이전
          </PaginationLink>
        </PaginationItem>

        {/* 페이지 번호 */}
        {[...Array(totalPages)].map((_, idx) => (
          <PaginationItem key={idx} active={page === idx}>
            <PaginationLink onClick={() => setPage(idx)}>
              {idx + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* 다음 */}
        <PaginationItem disabled={page === totalPages - 1}>
          <PaginationLink onClick={() => setPage(page + 1)}>
            다음
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </>
  );
}