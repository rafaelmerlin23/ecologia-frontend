import prefixUrl from "./ip";

export const HandleFetchPictures = async (form) => {
      
    const imageEndPoint = `${prefixUrl}pictures/show_picture`;
  
    try {
      const response = await fetch(imageEndPoint, {
        method: "POST",
        body: form,
      });
  
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      if (data.status === "success") {
        // Retorna las imágenes si se reciben correctamente
        return data;
      } else {
        return []; // Retorna un array vacío si no hay imágenes
      }
    } catch (error) {
      console.error(error);
      return []; // Retorna un array vacío en caso de error
    }
};

export default HandleFetchPictures