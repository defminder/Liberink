// When the user clicks on the sticker, open the modal
function edit_sticker(sticker) {

    var edit_modal = sticker.children[1];
    var edit_block = edit_modal.children[0];
    var edit_area = edit_block.children[0];

    sticker.parentNode.style.filter = 'none';
    edit_modal.style.display = 'block';
    edit_block.style.display = 'block';
    edit_block.style.position = 'fixed';
    edit_block.style.zIndex = 1000;
    edit_block.style.top = sticker.getBoundingClientRect().top + 'px';
    edit_block.style.left = sticker.getBoundingClientRect().left + 'px';
    edit_area.style.zIndex = 1001;
    edit_area.style.cursor = 'text';
    edit_area.select();

    function save_sticker_data(event) {
        var lists_container = sticker.parentNode.parentNode.parentNode;
        index_find: for (let i = 0; i < lists_container.children.length; i++) {
            if (lists_container.children[i] == sticker.parentNode.parentNode) {
                var list_container = lists_container.children[i].children[0];
                for (let j = 1; j < list_container.children.length - 1; j++) {
                    if (list_container.children[j] == sticker) {
                        update_text_api(edit_area.value, i, j - 1);
                        break index_find;
                    }
                }
            }
        }

        sticker.parentNode.style.filter = 'drop-shadow(1px 1px 2px #000)';
        sticker.children[0].value = edit_area.value;
        edit_modal.style.display = "none";
        edit_block.style.zIndex = 1;
        document.onmousedown = null;
        document.onkeypress = null;
    }

    document.onmousedown = function(event) {
        if (event.target != edit_area) {
            save_sticker_data(event);
        };
    };

    document.onkeypress = function(e) {
        if (e.shiftKey && e.keyCode == 13){
            // auto add new line
        }
        else if (!e.shiftKey && e.keyCode == 13) {
            e.preventDefault();
            save_sticker_data(event);
        }
    }

    async function update_text_api(text, list_id, sticker_id) {
        var url =  '/api/board/update_sticker_text';
        await axios({
            method: 'PUT',
            url: url,
            data: {
                'key': api_key,
                'board_id': board_id,
                'list_id': list_id,
                'sticker_id': sticker_id,
                'text': text
            }

        }).then(function(response) {
            console.log(response.data);
        }).catch(function(error) {
            console.log(error)
        });
    }
}