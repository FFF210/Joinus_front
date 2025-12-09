const ParticipantsModal = ({ productId, onClose }) => {
const [participants, setParticipants] = useState([]);
  
  useEffect(() => {
    const fetchParticipants = async () => {
      const response = await myAxios().get(`/admin/gbProduct/${productId}/participants`);
      setParticipants(response.data);
    };
    
    fetchParticipants();
  }, [productId]);
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>참여인원 목록</h2>
        
        <table>
          <thead>
            <tr>
              <th>주문번호</th>
              <th>주문일</th>
              <th>주문자명</th>
              <th>옵션명</th>
              <th>수량</th>
              <th>결제수단</th>
              <th>결제금액</th>
            </tr>
          </thead>
          <tbody>
            {participants.map(p => (
              <tr key={p.orderNumber}>
                <td>{p.orderNumber}</td>
                <td>{new Date(p.orderDate).toLocaleDateString()}</td>
                <td>{p.customerName}</td>
                <td>{p.optionName}</td>
                <td>{p.quantity}</td>
                <td>{p.paymentMethod}</td>
                <td>{p.paymentAmount.toLocaleString()}원</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};