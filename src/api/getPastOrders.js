export default async function getPastOrders(page) {
  const res = await fetch(`/api/past-orders?page=${page}`);
  return await res.json();
}
