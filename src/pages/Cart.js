import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addCount, changeName } from "./../store.js";

function Cart() {
  let dispatch = useDispatch();
  let state = useSelector((state) => {
    return state;
  });

  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>상품명</th>
          <th>수량</th>
          <th>변경하기</th>
        </tr>
      </thead>
      <tbody>
        {state.cart.map((a, i) => (
          <tr key={i}>
            <td>{state.cart[i].id}</td>
            <td>{state.cart[i].name}</td>
            <td>{state.cart[i].count}</td>
            <td>
              <button
                onClick={() => {
                  dispatch(addCount(i));
                }}
              >
                +
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Cart;
