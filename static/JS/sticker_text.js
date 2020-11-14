function stiker_edit(event){
    

}
                var submit_listener = function(e) {
                    console.log(e.which);
                    if (event.target.value.length == 0) { return; } else if (e.which == 13) {
                        event.target.removeEventListener('keydown', submit_listener, false);
                        e.preventDefault();
                        board_titile_update(event.target, stiker_index);
                        event.target.classList.remove('show_edit');
                        event.target.setAttribute('readonly', '');
                    }

                }

                event.target.addEventListener('keydown', submit_listener, false);

    }
    async function stiker_text_update(element, index) {
        var url = 'api/' + document.URL.split('/')[4];
        await axios({
            method: 'PUT',
            url: url,
            data: {
                'title': element.value,
                'list_id': index
            }

        }).then(function(response) {
            console.log(response.data);
        }).catch(function(error) {
            console.log(error)
        });
    }
}
