import prefixUrl from "./ip"

export const handleGet = async (endPoint, token) => {
    try {
      const response = await fetch(`${prefixUrl}${endPoint}`, {
        method: 'GET',
        headers: {
          'Authorization': token // Envía el token en el encabezado Authorization
        }
      });
  
      const data = await response.json();
  
      if (data && data.status === 'success') {
        return data.response;
      } else {
        throw new Error('Respuesta no exitosa');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error; // Lanza el error para que sea manejado en el código que llame a esta función
    }
  };
  

export default handleGet