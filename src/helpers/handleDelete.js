import prefixUrl from "./ip";
export const  handleDelete= (endPoint,formData,token,thenFetch)=>{
    
    const url = prefixUrl+endPoint
    // Hacer la petición DELETE
    fetch(url, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Authorization': token // Envía el token en el encabezado Authorization
      },
      body: formData
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.status === 'success') {
          thenFetch()
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  
}