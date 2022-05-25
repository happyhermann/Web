import "./App.css";
import { Container, Navbar, Nav } from "react-bootstrap";
import { createContext, useState, useEffect } from "react";
import data from "./data";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./pages/detail";
import axios from "axios";

// Context API

// 특징
// 1. state 변경시 쓸데없는 것까지 재렌더링
// 2. 나중에 컴포넌트 재사용이 어려움 (다른 페이지에서 Import해서 재사용하려면)

// 셋팅1. createContext() '보관함 만들기'
export let Context1 = createContext();
// 셋팅2, <Context>로 원하는 컴포넌트 감싸기
//  => Routh path detail:id Detail로 가서 감싸기

function App() {
  let [books, booksState] = useState(data);
  let [재고] = useState([10, 11, 12]);
  // 이것을 Detail, tabcontent에서 쓰고 싶다면? props 써도 되지만
  // Context API를 이용해보자 props 없이 state 사용 가능
  let [click, clickState] = useState(0);
  let [btnHidden, btnState] = useState(true);
  let navigate = useNavigate();
  console.log(books);
  // 1. 페이지 이동도와주는 useNavigate();

  const imgs = [
    "https://m.media-amazon.com/images/I/71hjHuIcflL._AC_UY218_.jpg",
    "https://m.media-amazon.com/images/I/7187WlxW0NL._AC_UY436_FMwebp_QL65_.jpg",
    "https://m.media-amazon.com/images/I/71OFqSRFDgL._AC_UY436_FMwebp_QL65_.jpg",
    "https://m.media-amazon.com/images/I/81aWQ68Ko+L._AC_UY436_FMwebp_QL65_.jpg",
    "https://m.media-amazon.com/images/I/81+FqWQUwOL._AC_UY436_FMwebp_QL65_.jpg",
    "https://m.media-amazon.com/images/I/81YNcVhMwoL._AC_UY436_FMwebp_QL65_.jpg",
    "https://m.media-amazon.com/images/I/61okRL4awVL._AC_UY218_.jpg",
    "https://m.media-amazon.com/images/I/61DPY6pk6OL._AC_UL320_.jpg",
    "https://m.media-amazon.com/images/I/81WlPc-wF7L._AC_UL320_.jpg",
  ];
  // 길고 복잡한 코드는 다른 파일에 빼놓을 수 있음
  // 1. 변수를 export
  // 2. import 하면 끝

  return (
    <div className="App">
      <Navbar
        style={{ border: "2px solid black" }}
        className="bar"
        bg="white"
        variant="light"
      >
        <Container style={{ padding: "15px" }} className="box">
          <Navbar.Brand
            style={{ fontSize: "20px", fontWeight: "600", marginRight: "40px" }}
            className="title"
            href="#home"
          >
            원서 마켓
          </Navbar.Brand>
          <Nav
            style={{ fontSize: "18px", fontWeight: "500" }}
            className="me-auto"
          >
            <Nav.Link
              onClick={() => {
                navigate("/");
                // 이 함수를 이용하면 페이지 이동 가능
              }}
            >
              홈
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail/0");
              }}
            >
              Detail
            </Nav.Link>
            <Nav.Link href="#pricing">도서</Nav.Link>
            <Nav.Link href="#features">Q&A</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {/* ?sss */}
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <div style={{ marginBottom: "50px" }} className="main-bg"></div>
              <div className="container">
                <div className="row">
                  {books.map(function (a, i) {
                    return (
                      <Lists
                        books={books[i]}
                        i={i}
                        key={i}
                        booksState={booksState}
                        이미지주소={imgs[i]}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          }
        />

        <Route
          path="/detail/:id"
          // id : URL 파라미터
          element={
            <Context1.Provider value={{ 재고 }}>
              {/* 셋팅3. value={{state1, state2...}} */}
              <Detail books={books} booksState={booksState} />
              {/* 이제 여기 안의 모든 컴포넌트는 재고, shoes 사용가능 */}
            </Context1.Provider>
          }
        />

        {/* <Route path="*" element={<div>없는페이지</div>} /> */}
        {/* 지정한 path 외에 주소로 접속시 '없는 페이지' 띄워줌 */}

        <Route path="/event" element={<Event />}>
          <Route path="order" element={<h4>첫 주문시 독서대 증정</h4>} />
          <Route
            path="coupon"
            element={
              <div>
                <p>
                  생일기념 쿠폰을 받으시려면 몇 가지 정보를 기입해주셔야합니다
                </p>
              </div>
            }
          />
        </Route>

        {/* nested route
        언제 쓰면 좋은가? 
        -여러 유사한 페이지 필요할 때 (글자하나만 바뀌어야할 때, 박스하나 바뀌어야할 때
        ) */}
        {/* 장점 1. 라우트 작성이 약간 간단해짐
            장점 2. /about하고 /member 접속시엔 Element 2개나 보임 
             */}
      </Routes>

      {/* ajax : 새로고침 없이도 GET/POST 요청 가능 */}
      {/* ajax 옵션 3개 중 택1 가능 
          1. XMLHttpRequest
          2. fetch()
          3. axios
      */}
      <button
        style={{ padding: "10px 20px" }}
        onClick={(e) => {
          clickState(click + 1);

          let url = [
            "https://codingapple1.github.io/shop/data2.json",
            "https://codingapple1.github.io/shop/data3.json",
          ];

          if (click == 1) {
            url[0] = url[1];
          } else if (click == 2) {
            alert("더이상 상품이 없습니다");
          }
          axios
            .get(url[0])

            // 1. 데이터를 가져오고
            .then((결과) => {
              let data = 결과.data;
              let copy = [...books, ...결과.data];
              // 2. 스테이트에 집어 넣고
              // *스프레드 {},{},{} // {},{},{} = 괄호 벗겨주는 문법
              booksState(copy);
              // 3. 상품이 생성됨

              // 동적인 UI 만드는 법을 잘 기억해두자
            })
            .catch(() => {
              console.log("실패함ㅅㄱ");
            });

          // Q. ajax 요청 실패할 경우?
          // A. catch .catch()로 실패할 경우 어떤 함수를 실행할 것인지 임의 설정가능

          // ajax 이용한 GET요청은 axios.get('url')

          //* 서버로 데이터 전송하는 POST 요청 */\
          // axios.post("'/sdf", {name : 'Lee'});

          //* 동시에 ajax 요청 여러개 하려면
          // Promise.all([axios.get("/url1"), axios.get("/ur12")]).then(() => {});
          // 전부다 받아오면! then (그러면) 이곳에 함수 실행해주세요! 라는 의미
        }}
      >
        더보기
      </button>
      {/* ajax 숙제 : 버튼누르면 데이터 더 가져와서 html로 보여주기 */}

      <Input />
    </div>
  );
}

function Lists(props) {
  let imgs = props.이미지주소;

  return (
    <>
      <div className="col-md-4">
        <img className="img" src={imgs} width="80%" />
        <h4 className="titles"> {props.books.title}</h4>
        <p>{props.books.english}</p>
      </div>
    </>
  );
}

function Event() {
  return (
    <div>
      <h3>오늘의 이벤트</h3>
      <Outlet></Outlet>
    </div>
  );
}

// useEffect를 사용하여 input state 변경에 따라 조건문으로 걸러내기

function Input() {
  const [text, setText] = useState("");
  // 1. input 값 받아올 useState 값 설정

  useEffect(() => {
    if (isNaN(text) == true) {
      alert("숫자만 적으세요");
    }
    //** input에 입력한 값은 전부 문자형태로 출력되는 특성 가짐  **/
    // 4. 문자/숫자 파악은 isNaN() 함수 쓰면 됌
    // 문자열이면 true / 숫자면 false가 나옴
  }, [text]);

  // 3. useEffect 함수 설정
  // why? html 랜더링후 특정 조건만이 변경했을 때만 '재랜더링' 시켜줘서 랜더링을 줄여 줄 수 있음
  // [text] 변수, 즉 state (인풋에 입력) 값이 입력됐을 때만 useEffect안에 쓰인 코드 실행되게 설정

  return (
    <form>
      <input
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      {/* 2. input 태그 만들고 onChange 속성 부여 
      => setText (state 변경함수)에 e.target.value 이벤트 DOM 변경 */}
      <button type="submit">summit</button>
      <h4>{text}</h4>
    </form>
  );
}

export default App;
