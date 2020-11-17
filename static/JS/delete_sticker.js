function delete_sticker(event){
	var target_sticker = event.target.parentNode;
	var wrappers = event.target.parentNode.parentNode.parentNode.parentNode.children;
	index_find: 
	for (let i = 0; i <= wrappers.length; i++){
		if (wrappers[i] == target_sticker.parentNode.parentNode){
			var stickers = wrappers[i].children[0].children;
			for (let j = 1; j < stickers.length - 1; j++){
	    		if (stickers[j] == event.target.parentNode){
	    			delete_sticker_api(i, j - 1);
	    			event.target.parentNode.remove();
	    			break index_find;
	    		}
	    	}
		}
	}
	async function delete_sticker_api(list_id, sticker_id) {
        var url =  '/api/board/delete_sticker';
        await axios({
            method: 'DELETE',
            url: url,
            data: {
                'key' : api_key,
                'board_id': board_id,
                'list_id': list_id,
                'sticker_id' : sticker_id
            }

        }).then(function(response) {
            console.log(response.data);
        }).catch(function(error) {
            console.log(error)
        });
    }
}