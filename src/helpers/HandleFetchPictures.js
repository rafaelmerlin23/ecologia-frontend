import prefixUrl from "./ip";

export const toParam = (params) => {
  const queryString = new URLSearchParams(
    Object.entries(params).reduce((acc, [key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => acc.append(key, v));
      } else {
        acc.append(key, value);
      }
      return acc;
    }, new URLSearchParams())
  ).toString();
  return queryString
}

export const HandleFetchPictures = async (query, token) => {

  const Params = toParam(query)

  const imageEndPoint = `${prefixUrl}pictures/show_picture?${Params}`;


  try {
    const response = await fetch(imageEndPoint, {
      method: "GET",
      headers: {
        'Authorization': token // Envía el token en el encabezado Authorization
      }
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