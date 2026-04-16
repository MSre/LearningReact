export default async function getPastOrder(orderId) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const res = await fetch(`${apiUrl}/api/past-order/${orderId}`);
  return await res.json();
}
