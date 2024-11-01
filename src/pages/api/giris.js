import { setCookie } from "../../components/cookie/cookie";
const BASE_URL = "http://213.142.159.49:8083/api";

export const Register = (registerDTO) => {
  fetch(`${BASE_URL}/member/register`, {
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
    const response = await fetch(`${BASE_URL}/member/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginDTO),
    });

    const responseData = await response.json();

    if (response.ok && responseData.token) {
      setCookie("token", responseData.token, 7);
      navigate("/");
    } else {
      setErrorMessage("Giriş başarısız: Geçersiz kullanıcı adı veya parola.");
    }
  } catch (error) {
    console.error("Error:", error);
    setErrorMessage("Kullanıcı adı veya parola yanlış!");
  }
};