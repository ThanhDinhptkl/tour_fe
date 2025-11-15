const API_BASE_URL = "http://localhost:8080/api"; // địa chỉ khi chạy API-GETWAY trong dev

export const getAllTours = async () => {
  const response = await fetch(`${API_BASE_URL}/tours`);
  return response.json();
};

export const bookTour = async (data) => {
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getCustomerById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/customers/${id}`);
  return response.json();
};
