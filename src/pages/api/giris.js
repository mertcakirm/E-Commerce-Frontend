const BASE_URL = "https://localhost:8000";

export const Register = (registerDTO) => {
  fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerDTO),
  });
};

export const Login = async (loginData, navigate) => {
  const loginDTO = {
    email: loginData.email,
    password: loginData.password,
  };

  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginDTO),
      credentials: 'include'
    });
    if (response.ok) {
      navigate("/");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};