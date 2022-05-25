import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
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
  let [tap, tapChange] = useState(0);
  // 0번 내용이 보이는 상태

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

      {/* 리액트에서 탭 UI 만들기 */}
      {/* 1. html css로 미리 디자인 */}
      <Nav variant="tabs" defaultActiveKey="link1">
        {/* 기본적으로 눌려있을 버튼 (defaultActiveKey) */}
        <Nav.Item
          onClick={() => {
            tapChange(0);
          }}
        >
          <Nav.Link eventKey="link0">버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item
          onClick={() => {
            tapChange(1);
          }}
        >
          <Nav.Link eventKey="link1">버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item
          onClick={() => {
            tapChange(2);
          }}
        >
          <Nav.Link eventKey="link2">버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tap={tap} tapChange={tapChange} />

      {/* 2. 탭 상태 저장해줄 state 필요 */}
    </div>

    /* 3. state에 따라서 UI가 어떻게 보일지 작성
      A. 조건문을 쓰면 된다! */
    // Q. 삼항 연산자는 여러 가지 조건을 쓸 수 없기에 일반 if 조건문을 써야함
    // 그러나 html 안에서는 If 조건문을 쓸 수 없기때문에 바깥에서 써야함
  );
}

// 그런데 어떻게 집어넣을까?
// 답 : 컴포넌트를 집어넣으면 된다.

// **주의사항** 컴포넌트는 함수이기때문에 'return'문을 반드시 써야함

// function TabContent(props) {
//   if (props.tap == 0) {
//     return <div>내용0</div>;
//   } else if (props.tap == 1) {
//     return <div>내용1</div>;
//   } else if (props.tap == 2) {
//     return <div>내용2</div>;
//   }
// }

// 팁2 센스 좋으면 if 필요없을 수도
function TabContent({ tap }) {
  let [fade, setFade] = useState("");
  // 4-1 탭 state가 변할 떄 end 부착
  // * 4-2 탭 state가 변할 때 end '뗏다가' 부착해야 실질적으로 애니메이션이 동작하는데
  // *** 어떻게 해야할까? A. "Clearfunction을 이용하자" + setTimeout 함수 (() => {}, 100)

  useEffect(() => {
    let a = setTimeout(() => {
      setFade("end");
      // 이거 2빠
    }, 100);
    // **왜 setTimeout을 써야만 구현될까?
    // 리액트의 automatic batching 기능때문이다.
    // state변경함수()를 다 한다음에 마지막에 재렌더링해주기 때문이다.
    // 그러니 1빠2빠를 합쳐서 실행하니까 최종적으로 end로만 바뀌니까 안되는 것 뗏다붙여다가 안됨
    // ***시간차를 두게 되면 의도대로 동작**

    return () => {
      clearTimeout(a);
      setFade("");
      // 이게 1빠
      //
    };
  }, [tap]);
  // [tap]이 변경될 때 마다 안의 코드 실행 해줌

  return (
    <div className={"start " + fade}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tap]}
    </div>
  );
}

function Ad() {
  return <div className="alert alert-warning">2초이내 구매시 할인</div>;
}

export default Detail;
