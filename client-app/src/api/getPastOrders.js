export default async function getPastOrders(page) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const res = await fetch(`${apiUrl}/api/past-orders?page=${page}`);
  return await res.json();
}
