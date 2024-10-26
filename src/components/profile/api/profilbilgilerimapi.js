import { getCookie, setCookie, deleteCookie } from "../../cookie/cookie"; 

const token = getCookie("token");

const BASE_URL = 'http://213.142.159.49:8083/api';


export const profilGuncelle = async (formData) =>{
    try {
        const response = await fetch(`${BASE_URL}/user/update`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('User information updated:', data);
  
          if (data) { 
            deleteCookie("token");
            setCookie("token", data.token, 1); 
          }
        } else {
          console.error('Failed to update profile:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
}


export const profilGetir = async () => {
    try {
      const response = await fetch(`${BASE_URL}/user/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else if (response.status === 403) {
        console.error('Forbidden: You do not have permission to access this resource.');
        deleteCookie("token");
        window.location.href = "/girisyap";
      } else {
        console.error('Error:', response.statusText);
        deleteCookie("token");
        window.location.href = "/girisyap";
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };