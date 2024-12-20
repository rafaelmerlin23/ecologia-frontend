const handleCreate = (url, token, data, onSuccess,getData) => {
    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': token
        },
        body: data
    })
    .then((res) => res.json())
    .then((responseData) => {
        getData && getData(responseData)
        if (responseData && responseData.status === 'success') {
            onSuccess(responseData);
        } 
    })
    .catch((error) => {
        console.error('Error:', error);
        
    });
};

export default handleCreate