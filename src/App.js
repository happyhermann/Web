import "./App.css";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useState } from "react";
import data from "./data";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./pages/detail";

function App() {
  let [books, booksState] = useState(data);
  let navigate = useNavigate();

  // 1. 페이지 이동도와주는 useNavigate();

  const imgs = [
    "https://m.media-amazon.com/images/I/71hjHuIcflL._AC_UY218_.jpg",
    "https://m.media-amazon.com/images/I/7187WlxW0NL._AC_UY436_FMwebp_QL65_.jpg",
    "https://m.media-amazon.com/images/I/71OFqSRFDgL._AC_UY436_FMwebp_QL65_.jpg",
    "https://m.media-amazon.com/images/I/81aWQ68Ko+L._AC_UY436_FMwebp_QL65_.jpg",
    "https://m.media-amazon.com/images/I/81+FqWQUwOL._AC_UY436_FMwebp_QL65_.jpg",
    "https://m.media-amazon.com/images/I/81YNcVhMwoL._AC_UY436_FMwebp_QL65_.jpg",
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
                navigate("/detail");
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
                        bookTitle={books[i].title}
                        bookEnglish={books[i].english}
                        책변경={booksState}
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
          element={<Detail books={books} />}
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
    </div>
  );
}

function Lists(props) {
  let bookTitle = [...props.bookTitle];
  let bookEnglish = [...props.bookEnglish];
  let imgs = props.이미지주소;
  console.log(imgs);
  return (
    <>
      <div className="col-md-4">
        <img className="img" src={imgs} width="80%" />
        <h4 className="titles"> {bookTitle}</h4>
        <p>{bookEnglish}</p>
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

export default App;
