import prefixUrl from "./ip";
import { toParam } from "./HandleFetchPictures";

export const DownloadImages = async (filters) => {
    console.log("se ejecuto", filters)
    // Define la URL base de tu API
    const BASE_URL = `${prefixUrl}pictures/download_picture_zip`;

    // Construye los query params
    const params = toParam(filters)
    // Construye la URL final

    const url = `${BASE_URL}?${params}`;

    try {
        // Realiza la solicitud GET
        const response = await fetch(url, {
            method: "GET",
        });

        // Verifica si la respuesta es exitosa
        if (response.ok) {
            // Descarga el archivo ZIP
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
// // Componente de ejemplo para llamar a la función
// const App = () => {
//     const handleDownload = () => {
//         const filters = {
//             date_begin: "2024-01-01",
//             date_end: "2024-12-31",
//             tags: [1, 2, 3],
//             albums: [10, 20],
//             locations: [100],
//             projects: [200],
//             scores: [2.5, 3],
//             page: 1,
//             quantity: 50,
//         };

//         DownloadPictures(filters);
//     };

//     return (
//         <div>
//             <button onClick={handleDownload}>Descargar Imágenes</button>
//         </div>
//     );
// };

// export default App;
