function delete_list(event){
	var container = event.target.parentNode.parentNode.parentNode.children;
	for (let i = 0; i <= container.length; i++){
		if (container[i] == event.target.parentNode.parentNode){
			event.target.parentNode.parentNode.remove();
			delete_list_api(i);
		}
	}
	async function delete_list_api(index) {
        var url =  '/api/board/delete_list';
        var board_id = document.URL.split('/')[4];
        await axios({
            method: 'DELETE',
            url: url,
            data: {
                'key' : api_key,
                'board_id': board_id,
                'list_id': index
            }

        }).then(function(response) {
            console.log(response.data);
        }).catch(function(error) {
            console.log(error)
        });
    }
}

