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

export const Login = async (loginData, navigate, setErrorMessage) => {
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
      setErrorMessage(response.data)
      navigate("/");
    } else {
      setErrorMessage("Giriş başarısız: Geçersiz kullanıcı adı veya parola.");
    }
  } catch (error) {
    console.error("Error:", error);
    setErrorMessage("Kullanıcı adı veya parola yanlış!");
  }
};