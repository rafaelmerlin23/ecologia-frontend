const handleCreate = (url, token, data, onSuccess) => {
    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': token
        },
        body: data
    })
    .then((res) => res.json())
    .then((responseData) => {
        console.log('Respuesta del servidor:', responseData);
        if (responseData && responseData.status === 'success') {
            onSuccess();
        } 
    })
    .catch((error) => {
        console.error('Error:', error);
        
    });
};

export default handleCreate