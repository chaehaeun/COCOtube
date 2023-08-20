const MyPageInfo = () => {
  return (
    <>
      <h3 className="sr-only_Title">회원 상세 정보</h3>
      <div>
        <ul>
          <li>
            <span>자기 소개 말</span>
            <p>안녕하세요. 잘 부탁드립니다.</p>
          </li>
          <li>
            <span>좋아요 영상 개수</span>
            <p>10개</p>
          </li>
          <li>
            <span>구독 채널 개수</span>
            <p>10개</p>
          </li>
          <li>
            <span>작성한 댓글 수</span>
            <p>10개</p>
          </li>
        </ul>
        <div>
          <span>통계</span>
          <ul>
            <li>
              가입일 : <span></span>
            </li>
            <li>
              마지막 로그인 : <span></span>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default MyPageInfo
