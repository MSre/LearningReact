export default async function getPastOrder(orderId) {
  const res = await fetch(`/api/past-order/${orderId}`);
  return await res.json();
}
