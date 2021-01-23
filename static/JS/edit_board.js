function edit_board(event){
    event.preventDefault();
    var target_board = event.target.parentNode;
    var edit_container = document.getElementById('board_edit_modal');
    var [title, description, submit] = edit_container.getElementsByClassName('form-group');
    var board_title = target_board.childNodes[3];
    title.childNodes[3].value = board_title.innerHTML.trim();
    var target_board_description = target_board.querySelectorAll('.container_board_description');
    var board_description = undefined;
    if (target_board_description.length > 0){
        board_description = target_board_description[0];
        description.childNodes[3].value = target_board_description[0].innerHTML.trim().replace('<br>', '\n');
    }
    edit_container.style.display = 'block';
    document.body.style.overflow = 'hidden';

    var close = edit_container.getElementsByClassName('close')[0];
    close.onclick = function() {
        edit_container.style.display = "none";
        document.body.style.overflow = 'visible';
    }

    submit.onclick = function save_edit(){
        var board_description = undefined;
        if (target_board_description.length > 0){
            board_description = target_board_description[0];
        }
        document.onkeypress = null;
        console.log(description.childNodes[3].value);
        if (title.childNodes[3].value != ''){
            if (description.childNodes[3].value == ''){
                if (board_description !== undefined){
                    console.log('test1');
                    target_board.removeChild(board_description);
                    board_title.classList.remove('container_board_title');
                    board_title.classList.add('container_board_only_title');
                }
                else{
                    console.log('test2');
                    var board_description = document.createElement('div');
                    board_description.classList.add('container_board_description');
                    target_board.childNodes[3].after(board_description);
                    board_description.innerHTML = description.childNodes[3].value;
                }
            }
            else if(board_description == undefined){
                console.log('test3');
                board_title.classList.remove('container_board_only_title');
                board_title.classList.add('container_board_title');
                var board_description = document.createElement('div');
                board_description.classList.add('container_board_description');
                target_board.childNodes[3].after(board_description);
                board_description.innerHTML = description.childNodes[3].value;
            }
            else{
                console.log('test4');
                board_description.innerHTML = description.childNodes[3].value;
            }
            board_title.innerHTML = title.childNodes[3].value;
            edit_container.style.display = "none";
            document.body.style.overflow = 'visible';
            var boards = document.getElementsByClassName('container_board');
            for (var id = 0; id < boards.length; id++){
                if (boards[id] == target_board){
                    edit_board_api(id - 1);
                }
            }
        }
    }

    document.onkeypress = function(e) {
        if (!e.shiftKey && e.keyCode == 13) {
            submit.onclick();
        }
    }

    async function edit_board_api(board_id) {
        var url =  '/api/board/update';
        await axios({
            method: 'PUT',
            url: url,
            data: {
                'key' : api_key,
                'board_id': boards_id.split(',')[board_id],
                'title': title.childNodes[3].value,
                'description' : description.childNodes[3].value
            }

        }).then(function(response) {
            console.log(response.data);
        }).catch(function(error) {
            console.log(error)
        });
    }

}

