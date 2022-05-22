import { useParams } from "react-router";

function Detail(props) {
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

export default Detail;
