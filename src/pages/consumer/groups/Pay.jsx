import { Link } from "react-router-dom";
import { Label, FormGroup,Input,Button } from "reactstrap";

export default function Pay(){
    return(
        <>
            <div style={styles.pageWrapper}>
                <div style={styles.container2}>
                    <div style={{border:'none', height:"100px", display:'flex'}}>
                        <div style={{border:'none', width:"100px", height:'100px', backgroundColor:'#d9d9d9', justifyContent:'center',display:'flex',alignItems: 'center'}}>
                            <img src='/check.png' style={{width:'50px', height:'50px'}}/>
                        </div>
                        <div style={{border:'none', width:'920px', height:'100px', backgroundColor:'#F7F7F7', padding:'10px 20px'}}>
                            <div className="fw-bold" style={{fontSize:'24px'}}>주의</div>
                            <div style={{fontSize:'12px'}}>결제 전에 주문정보와 배송지를 반드시 확인해주세요. 입력된 정보가 정확하지 않으면 배송 지연이나 통관 문제가 발생할 수 있습니다.</div>
                            <div style={{fontSize:'12px'}}>결제 후에는 주문 정보 변경이 불가합니다. 배송지, 수량, 결제 수단을 다시 한 번 확인해주세요.</div>
                        </div>
                    </div>
                    <br/><br/>
                    <div style={{ border: "1px solid black" , borderRadius:'5px'}}>
                        {/* 1행(헤더) */}
                        <div style={{display: "flex", borderBottom: "1px solid black", height: "32px", fontSize:'12px'}}>
                            <div style={{ flex: 1, borderRight: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor:'#E5EEFF' }}>주문일자</div>
                            <div style={{ flex: 2, borderRight: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor:'#E5EEFF' }}>상품정보</div>
                            <div style={{ flex: 1, borderRight: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor:'#E5EEFF' }}>수량</div>
                            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor:'#E5EEFF' }}>가격</div>
                        </div>

                        {/* 2행(내용) */}
                        <div style={{ display: "flex", height: "118px", fontSize:'12px' }}>
                            <div style={{ flex: 1, borderRight: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center" }}>2025-12-01</div>
                            <div style={{flex: 2,borderRight: "1px solid black",display: "flex",alignItems: "center",gap: "10px",}}>
                                <img src="/computer.png" style={{ width: "60px", height: "60px", marginLeft:'20px' }} />
                                <div>상품명</div>
                            </div>
                            <div style={{ flex: 1, borderRight: "1px solid black", display: "flex", justifyContent: "center", alignItems: "center" }}>1</div>
                            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>10,000</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* 배송지 + 오른쪽 박스 3개 */}
            <div style={styles.pageWrapper}>
                <div style={styles.container}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                    
                    {/* 왼쪽 배송지 박스 */}
                    <div style={{ border: '1px solid black', overflow: 'hidden', width: '500px' }}>
                        <div style={row}>
                            <div style={leftCol}>배송지 선택</div>
                            <div style={rightCol}>
                            <FormGroup tag="fieldset" style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                                <FormGroup check style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                    <Input name="radio1" type="radio" />
                                    <Label check>기존 배송지</Label>
                                </FormGroup>
                                <FormGroup check style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                    <Input name="radio1" type="radio" />
                                <Label check>신규 배송지</Label>
                                </FormGroup>
                            </FormGroup>
                            <FormGroup>
                                <Input id="exampleSelect" name="select" type="select" style={{ fontSize: '12px', width: '100px' }}>
                                <option>집으로</option>
                                </Input>
                            </FormGroup>
                            </div>
                        </div>

                        <div style={row}>
                            <div style={leftCol}>배송지명</div>
                            <div style={rightCol}>샘플 상품명입니다</div>
                        </div>
                        <div style={row}>
                            <div style={leftCol}>이름</div>
                            <div style={rightCol}>
                            <div style={{ border: '1px solid #A9A9A9', backgroundColor: '#d9d9d9', fontSize: '12px', width: '343px', height: '20px' }}>최지성</div>
                            </div>
                        </div>
                        <div style={row}>
                            <div style={leftCol}>주소</div>
                            <div style={rightCol}>10,000원</div>
                        </div>
                        <div style={row}>
                            <div style={leftCol}>이메일</div>
                            <div style={rightCol}>
                            <div style={{ border: '1px solid #A9A9A9', backgroundColor: '#d9d9d9', fontSize: '12px', width: '343px', height: '20px' }}>jisung0629jisung@gmail.com</div>
                            </div>
                        </div>
                        <div style={row}>
                            <div style={leftCol}>전화번호</div>
                            <div style={rightCol}>
                            <div style={{ border: '1px solid #A9A9A9', backgroundColor: '#d9d9d9', fontSize: '12px', width: '343px', height: '20px' }}>010-4627-6195</div>
                            </div>
                        </div>
                        <div style={row}>
                            <div style={leftCol}>배달 요청사항</div>
                            <div style={rightCol}>
                            <Input type="textarea" style={{ border: '1px solid #A9A9A9', fontSize: '12px', width: '343px', height: '50px', resize: 'none' }} />
                            </div>
                        </div>
                        </div>

                        {/* 오른쪽 박스 3개 */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ border: '1px solid black', width: '500px', height: '110px' }}>
                                <div style={row}>
                                    <div style={{width: '128px',padding: '5px',fontWeight: 'bold',borderRight: '1px solid #A09B9B',display: 'flex',          
                                        alignItems: 'center',justifyContent: 'center',textAlign: 'center', fontSize:'12px', height:'35px'}}>
                                        포인트
                                    </div>
                                    <div style={{flex: 1,flexDirection: 'column',display:'flex',padding: '5px', justifyContent:'center'}}>샘플 상품명입니다</div>
                                </div>
                                <hr style={{border:'1px solid black', margin:'0'}}/>
                                <div style={row}>
                                    <div style={{width: '128px',padding: '5px',fontWeight: 'bold',borderRight: '1px solid #A09B9B',display: 'flex',          
                                        alignItems: 'center',justifyContent: 'center',textAlign: 'center', fontSize:'12px', height:'34px'}}>보유 포인트</div>
                                    <div style={{flex: 1, flexDirection: 'column', display:'flex',padding: '5px', justifyContent:'center', color:'#5173D2'}}>5000p</div>
                                </div>
                                <div style={row}>
                                    <div style={{width: '128px',padding: '5px',fontWeight: 'bold',borderRight: '1px solid #A09B9B',display: 'flex',          
                                        alignItems: 'center',justifyContent: 'center',textAlign: 'center', fontSize:'12px', height:'35px'}}>사용 포인트</div>
                                    <div style={{flex: 1, flexDirection: 'column', display:'flex',padding: '5px', justifyContent:'center'}}>1000p</div>
                                </div>
                            </div>
                            {/* 결제 수단 */}
                            <div style={{ border: '1px solid black', width: '500px', height: '110px' }}>
                                <div style={row}>
                                    <div style={{width: '128px',padding: '10px',fontWeight: 'bold',display: 'flex',          
                                        alignItems: 'center',textAlign: 'center', fontSize:'12px', height:'35px'}}>
                                        결제 수단
                                    </div>
                                </div>
                                <hr style={{border:'1px solid black', margin:'0'}}/>
                                    <FormGroup check style={{ display: "flex", alignItems: "center", gap: "5px" ,fontSize:"12px", marginLeft:'10px', marginTop:'10px'}}>
                                        <Input name="radio1" type="radio"/>
                                        <Label check >카카오페이</Label>
                                    </FormGroup>
                                    <FormGroup check style={{ display: "flex", alignItems: "center", gap: "5px"  ,fontSize:"12px", marginLeft:'10px'}}>
                                        <Input name="radio1" type="radio"  />
                                    <Label check >네이버페이</Label>
                                    </FormGroup>
                            </div>
                            <div style={{ border: '1px solid black', width: '500px', height: '190px' }}>
                                <div style={row}>
                                    <div className="fw-bold" style={{width: '500px',padding: '10px',fontWeight: 'bold',display: 'flex',          
                                        alignItems: 'center',textAlign: 'center', fontSize:'20px', height:'45px', justifyContent:'center'}}>
                                        결제 금액
                                    </div>
                                </div>
                                <div style={{padding:'5px', fontSize:'12px'}}>
                                    <div style={{padding:'3px', justifyContent:'space-between',display:'flex'}}>
                                        <div>총 주문 금액</div>
                                        <div>1,054,314</div>
                                    </div>
                                    <div style={{padding:'3px', justifyContent:'space-between',display:'flex'}}>
                                        <div>국내 배송비</div>
                                        <div>3,000</div>
                                    </div>
                                    <div style={{padding:'3px', justifyContent:'space-between',display:'flex'}}>
                                        <div>포인트 사용</div>
                                        <div>1,000</div>
                                    </div>
                                </div>
                                <hr style={{border:'1px solid black', margin:'0'}}/>
                                <div style={{padding:'5px', fontSize:'12px'}}>
                                    <div style={{padding:'3px', justifyContent:'space-between',display:'flex'}}>
                                        <div style={{color:'red'}}>총 주문 금액</div>
                                        <div>1,057,314</div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Link to='/payComplate'>
                                            <Button style={{ fontSize: '12px', backgroundColor: '#739FF2', padding: '3px', border:'none'}}>
                                                결제하기
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br/><br/><br/>
        </>
    )
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

  container2: {
    width: "1020px",
    padding: "0 0 20px 0",
  },
}

const row = {
    display: 'flex',
    borderBottom: '1px solid #A09B9B',
    fontSize:'12px'
    
};

const leftCol = {
    width: '135px',
    padding: '10px',
    fontWeight: 'bold',
    borderRight: '1px solid #A09B9B',
    display: 'flex',          
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize:'12px'
};
const rightCol = {
    flex: 1,
    flexDirection: 'column',
    padding: '10px',
    display:'flex'
};
