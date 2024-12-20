const handleUpdate = (url, token, formData, onSuccess,getData) => {
    fetch(url, {
        method: 'PATCH',
        headers: {
            'Authorization': token
        },
        body: formData
    })
    .then((res) => res.json())
    .then((data) => {
        getData && getData(data);
        console.log('Respuesta del servidor:', data);
        if (data && data.status === 'success') {
            onSuccess && onSuccess(data); // Llama al callback en caso de éxito
        }
    })
    .catch((error) => {
        onError && onError(error);
        console.error('Error:', error);
    });
};

export default handleUpdate