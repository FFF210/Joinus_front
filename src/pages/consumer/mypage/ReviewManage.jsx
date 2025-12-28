import "../../../css/mypage/ReviewManage.css";
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from "react";
import { myAxios } from "../../../config";

export default function ReviewManage({ children }) {

    const [reviewCount, setReviewCount] = useState(0);
    const [pointBalance, setPointBalance] = useState(0);

    useEffect(() => {
        const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        const username = userInfo?.username;
        myAxios().get(`/mypage/reviewInfo/${username}`)
            .then(res => {
                setReviewCount(res.data.reviewCount || 0);
                setPointBalance(res.data.pointBalance || 0);
            })
            .catch(err => console.error("리뷰/포인트 조회 실패:", err));
    }, []);


    return (
        <>
            <div className="container" style={{ width: '860px' }}>
                <div style={{
                    marginBottom: '24px',
                    paddingTop: '20px'
                }}>
                    <h1 style={{
                        fontSize: '28px',
                        fontWeight: '700',
                        color: '#222',
                        margin: 0
                    }}>
                        리뷰 관리
                    </h1>
                </div>

                <div style={{
                    display: 'flex',
                    gap: '20px',
                    marginBottom: '32px'
                }}>
                    <div style={{
                        flex: 1,
                        textAlign: 'center',
                        padding: '28px 24px',
                        backgroundColor: '#f8f8f8',
                        borderRadius: '8px',
                        border: '1px solid #e0e0e0'
                    }}>
                        <div style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#666',
                            marginBottom: '12px'
                        }}>
                            전체 리뷰
                        </div>
                        <div style={{
                            fontSize: '28px',
                            fontWeight: '700',
                            color: '#222'
                        }}>
                            {reviewCount}건
                        </div>
                    </div>

                    <div style={{
                        flex: 1,
                        textAlign: 'center',
                        padding: '28px 24px',
                        backgroundColor: '#f8f8f8',
                        borderRadius: '8px',
                        border: '1px solid #e0e0e0'
                    }}>
                        <div style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#666',
                            marginBottom: '12px'
                        }}>
                            적립 포인트
                        </div>
                        <div style={{
                            fontSize: '28px',
                            fontWeight: '700',
                            color: '#739FF2'
                        }}>
                            {pointBalance.toLocaleString()}P
                        </div>
                    </div>
                </div>
            </div>
            {/* <div style={{ flex: 1, paddingTop:'10px', width:'860px'}}><ReviewWrite/>{children}</div> */}
            <div style={{ flex: 1, paddingTop: '10px', width: '860px' }}>
                <Outlet context={{ setReviewCount, setPointBalance }} /> {/* 여기서 ReviewWrite / ReviewWrited 렌더링 */}
            </div>
        </>
    )
}
