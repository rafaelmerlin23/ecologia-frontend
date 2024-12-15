import prefixUrl from "./ip";
import { toParam } from "./HandleFetchPictures";

export const DownloadImages = async (filters,token) => {
    console.log("se ejecuto", filters)
    const BASE_URL = `${prefixUrl}pictures/download_picture_zip`;

    const params = toParam(filters)

    const url = `${BASE_URL}?${params}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': token
            },
        });

        if (response.ok) {
            const blob = await response.blob();
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = "pictures.zip";
            link.click();
        } else {
            // Maneja los errores
            const errorData = await response.json();
            console.error("Error:", errorData.message);
        }
    } catch (error) {
        console.error("Error de red:", error);
    }
};

export default DownloadImages
