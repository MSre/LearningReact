import { createLazyFileRoute } from "@tanstack/react-router";
import { useState, Suspense, use, startTransition } from "react";
import { useQuery } from "@tanstack/react-query";
import getPastOrders from "../api/getPastOrders.js";
import getPastOrder from "../api/getPastOrder.js";
import { intlFormat } from "../intlFormatter.js";
import Modal from "../Modal.jsx";
import ErrorBoundary from "../ErrorBoundary.jsx";
import { useSuspenseQuery } from "@tanstack/react-query"; // Add this

export const Route = createLazyFileRoute("/past")({
  component: ErrorBoundaryWrappedPastOrderRoutes,
});

function ErrorBoundaryWrappedPastOrderRoutes() {
  const [page, setPage] = useState(1);
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="past-orders">
            <h2>Loading Past Order...</h2>
          </div>
        }
      >
        <PastOrdersRoute page={page} setPage={setPage} />
      </Suspense>
    </ErrorBoundary>
  );
}

function PastOrdersRoute({ page, setPage }) {
  const { data } = useSuspenseQuery({
    queryKey: ["past-orders", page],
    queryFn: () => getPastOrders(page),
    staleTime: 30000,
  });
  const [focusedOrder, setFocusedOrder] = useState();
  const { isLoading: isLoadingFocusOrder, data: focusOrderData } = useQuery({
    queryKey: ["past-order", focusedOrder],
    queryFn: () => getPastOrder(focusedOrder),
    staleTime: 86400000,
    enabled: !!focusedOrder,
  });

  return (
    <div className="past-orders">
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Date</td>
            <td>Time</td>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.order_id}>
              <td>
                <button onClick={() => setFocusedOrder(order.order_id)}>
                  {order.order_id}
                </button>
              </td>
              <td>{order.date}</td>
              <td>{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pages">
        <button
          disabled={page <= 1}
          onClick={() => {
            setPage(page - 1);
          }}
        >
          Previous
        </button>
        <button
          disabled={data.length < 10}
          onClick={() =>
            startTransition(() => {
              setPage(page + 1);
            })
          }
        >
          Next
        </button>
      </div>
      {focusedOrder ? (
        <Modal>
          <h2>Order #{focusedOrder}</h2>
          {!isLoadingFocusOrder ? (
            <table>
              <thead>
                <tr>
                  <td>Image</td>
                  <td>Name</td>
                  <td>Size</td>
                  <td>Quantity</td>
                  <td>Price</td>
                  <td>Total</td>
                </tr>
              </thead>
              <tbody>
                {focusOrderData.orderItems.map((pizza) => (
                  <tr key={`${pizza.pizzaTypeId}_${pizza.size}`}>
                    <td>
                      <img src={pizza.image} alt={pizza.name} />
                    </td>
                    <td>{pizza.name}</td>
                    <td>{pizza.size}</td>
                    <td>{pizza.quantity}</td>
                    <td>{intlFormat(pizza.price)}</td>
                    <td>{intlFormat(pizza.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading...</p>
          )}
          <button onClick={() => setFocusedOrder(null)}>Close</button>
        </Modal>
      ) : null}
    </div>
  );
}
