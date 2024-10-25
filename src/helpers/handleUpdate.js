const handleUpdate = (url, token, formData, onSuccess) => {
    fetch(url, {
        method: 'PATCH',
        headers: {
            'Authorization': token
        },
        body: formData
    })
    .then((res) => res.json())
    .then((data) => {
        console.log('Respuesta del servidor:', data);
        if (data && data.status === 'success') {
            onSuccess && onSuccess(); // Llama al callback en caso de éxito
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};

export default handleUpdate