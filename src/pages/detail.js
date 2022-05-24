import { useParams } from "react-router";
import { useEffect, useState } from "react";
// import styled from "styled-components";

// styled-components쓰면 JS파일에서 전부 해결가능

// 오렌지 버튼이 필요하면? -props 문법쓰면 더 편리함
// pros로 컴포넌트 재활용 가능
// let YellowButton = styled.button`
//   background: ${(props) => props.bg};
//   color: ${(props) => (props.bg == "blue" ? "white" : "black")};
//   padding: 10px;
// `;

//stlyed-components 문법
// 장점1 CSS파일 안열고 JS파일에서 만들기 가능
// 장점2 스타일이 다른 js파일로 오염되지 않음
// 장점3 페이지 로딩시간 단축

// 참고1 간단한 프로그래밍 기입 가능 (ex. 조건문)
// 참고2 기존 스타일 복사 가능

// 단점1. JS파일 매우 복잡
// 단점2. 중복스타일은 컴포넌트간 import할텐데 CSS와 바를 바가 없다
// 단점3. 협업시 CSS 담당의 숙련도 이슈

// 컴포넌트의 Lifecycle
//페이지에 장착되기도 (mount)
//업데이트도되고 (update)
//필요없으면 제거 (unmount)

function Detail(props) {
  useEffect(() => {
    // mount, update시 코드 실행해주는 useEffect
    let a = setTimeout(function () {
      setHidden(false);
    }, 2000);
    console.log(2);

    return () => {
      console.log(1);
      clearTimeout(a);
      // 기존코드 치우는거 여기에 많이 작성함
      // 기존 데이터요청은 제거해주세요~

      // (참고) clean up function은 mount시 실행안됨 unmount시 실행됨
      // unmount : 다른 페이지로 넘어갔을 때 삭제된다는 말이다.
    };
    // useEffect 동작전에 실행되는 return () => {} **clean up function**
  }, []);
  // [] 디펜던시, 조건에 맞을 때만 출력
  // *편법 "[]" 디펜던시가 없다면 mount에만 실행함, 이러면 업데이트 될 때마다 되는게 아니라 1번만 실행

  // // Lifecycle과 useEffect2 빡통식 정리시간
  // // useEffect(()=> {}) 1.재렌더링마다 코드 실행하고 싶으면
  // // useEffect(() => {}, []) 2. mount시 1회 코드 실행하고 싶으면
  // // useEffect(() => {
  //   return () => {
  //     // 3. unmount시 1회 코드실행하고 싶으면

  //   }
  // }, [])
  // // 4. useEffect 실행 전에 뭔가 실행하려면 언제나 return () => {}
  // 5. 특정 state 변경시에만 실행하고 싶을 시 []안에 변수 넣기

  // useEffect와 setTimeout을 이용해서 비동기적으로?
  let [count, setCount] = useState(0);
  let [hidden, setHidden] = useState(true);

  // 숙제 div 2초후 사라지게 만들기
  // (동적 UI 만들기)
  // -UI 상태 저장할 state 만들고
  // -state 따라서 UI가 어떻게 보일지 작성

  // useEffect 쓰는 이유
  // **html 렌더링 후에 동작함,
  // 이럴때 쓰면 좋다
  // -어려운 연산
  // -서버에서 데이터가져오는 작업
  // -타이머 장착하는 거

  const imgs = [
    "https://m.media-amazon.com/images/I/71hjHuIcflL._AC_UY218_.jpg",
    "https://m.media-amazon.com/images/I/7187WlxW0NL._AC_UY436_FMwebp_QL65_.jpg",
    "https://m.media-amazon.com/images/I/71OFqSRFDgL._AC_UY436_FMwebp_QL65_.jpg",
    "https://m.media-amazon.com/images/I/81aWQ68Ko+L._AC_UY436_FMwebp_QL65_.jpg",
    "https://m.media-amazon.com/images/I/81+FqWQUwOL._AC_UY436_FMwebp_QL65_.jpg",
    "https://m.media-amazon.com/images/I/81YNcVhMwoL._AC_UY436_FMwebp_QL65_.jpg",
  ];

  let { id } = useParams();
  console.log(id);
  // 유저가 URL파라미터에 입력한거 가져오려면
  // useParams(); 함수 선언하기

  let 찾은상품 = props.books.find(function (x) {
    return x.id == id;
    // array자료.id == url에 입력한 번호일 경우 결과를 변수에 담아줌
    // {상품 1개} 이런거 남을 듯
  });
  console.log(찾은상품);

  return (
    <div className="container">
      {hidden && <Ad />}
      {/* 조건문 hidden이 State(true)일때 Ad 반환한다는 간결한 문법 */}
      {/* *애플코딩 삼항연산자 방식 
      hidden == true ? <Ad/> : null */}

      <div className="row">
        <div className="col-md-6">
          <img src={imgs[id]} width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.title}</p>
          <p>{찾은상품.price}원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}

function Ad() {
  return <div className="alert alert-warning">2초이내 구매시 할인</div>;
}

export default Detail;
