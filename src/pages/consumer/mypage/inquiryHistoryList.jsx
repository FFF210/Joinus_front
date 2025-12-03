import React, { useState } from 'react';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap';

export default function InquiryHistoryList() {

    const [open, setOpen] = useState('');
    const toggle = (id) => {
        if (open === id) {
            setOpen('');
        } else {
            setOpen(id);
        }
    };

    const inquiries = [
        { 
            id: 1, 
            title: "주문 관련 문의", 
            content: "주문 상태가 계속 대기중 입니다, 언제 출고 되나요?", 
            reply: "주문량 증가로 인해 지연된 점 양해 부탁드립니다. 금일 중 출고 예정입니다.",
            status: "답변 완료",
            date: "2025-11-20"
        },
        { 
            id: 2, 
            title: "교환 신청 문의", 
            content: "주문 상태가 계속 대기중 입니다, 언제 출고 되나요?", 
            reply: null,
            status: "답변 대기",
            date: "2025-11-20"
        },
    ];

    return (
        <>
            <div className="containe" style={{ width: '860px' }}>
                <div className="mb-0 fw-bold text-start"style={{ fontSize: '20px', marginBottom: '14px', padding: '20px 0' }}>1:1 문의 내역</div>

                <div className="box-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="review-box"style={{backgroundColor:'white',textAlign: 'center',fontSize: "16px", flexDirection: "column",width: '280px',border: '1px solid black',padding: '14px 0'}}>
                        전체 문의
                        <div>{inquiries.length}건</div>
                    </div>

                    <div className="review-box"style={{backgroundColor:'white', textAlign: 'center',fontSize: "16px",flexDirection: "column", width: '280px', border: '1px solid black', padding: '14px 0' }}>
                        답변 완료
                        <div>{inquiries.filter(i => i.reply !== null).length}건</div>
                    </div>

                    <div className="review-box"style={{backgroundColor:'white', textAlign: 'center', fontSize: "16px", flexDirection: "column", width: '280px', border: '1px solid black', padding: '14px 0' }}>
                        답변 대기
                        <div>{inquiries.filter(i => i.reply === null).length}건</div>
                    </div>
                </div>
            </div>

            <br /><br />

            <div>
                <Accordion open={open} toggle={toggle}>
                    {inquiries.map((item) => (
                        <AccordionItem key={item.id}  style={{ border: '1px solid #d0d0d0', marginBottom: '20px' }}>
                            <AccordionHeader  targetId={String(item.id)} style={{  background: "#e8f0ff", padding: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    {/* 작은 네모 라벨 */}
                                    <span style={{ fontSize: '12px', padding: '3px 8px', background: '#1E6EFF', color: 'white', borderRadius: '4px'}}>
                                        주문
                                    </span>
                                    <span style={{ fontSize: '12px', padding: '3px 8px', background: item.reply ? '#A0C4FF' : '#FFD4D4',color: '#333', borderRadius: '4px' }}>
                                        {item.reply ? '답변 완료' : '답변 대기'}
                                    </span>
                                    {item.title}
                                </div>
                                <div style={{ marginLeft: 'auto', marginRight: '10px', fontSize: '14px',  color: '#666',flex: 1, textAlign: 'right' }}>
                                    {item.date}
                                </div>
                            </AccordionHeader>

                            <AccordionBody accordionId={String(item.id)} style={{ background: "#fafafa", padding: "20px" }}>
                                {/* 문의 내용 */}
                                <div 
                                    style={{border: '1px solid #ddd', padding: '12px', background: 'white',marginBottom: item.reply ? '14px' : '0' }}>
                                    {item.content}
                                </div>

                                {/* 관리자 답변 */}
                                {item.reply && (
                                    <div style={{ border: '1px solid #cfe0ff',background: '#e9f2ff', padding: '12px'}}>
                                        {item.reply}
                                    </div>
                                )}
                            </AccordionBody>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </>
    );
}
