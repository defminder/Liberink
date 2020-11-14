function edit_list_title(event) {
    event.target.style.cursor = 'text';
    var lists = document.getElementsByClassName("list_title");
    for (var i = 0; i < lists.length; i++) {
        var openlist = lists[i];
        if (openlist == event.target) {
            event.target.removeAttribute('readonly');
            var list_index = i;
            var submit_listener = function(e) {
                if (event.target.value.length == 0) { return; } else if (e.which == 13) {
                    event.target.removeEventListener('keydown', submit_listener, false);
                    e.preventDefault();
                    list_titile_update(event.target, list_index);
                    event.target.classList.remove('show_edit');
                    event.target.setAttribute('readonly', '');
                    event.target.style.cursor = 'pointer';
                }

            }

            event.target.addEventListener('keydown', submit_listener, false);

            if (!openlist.classList.contains('show_edit')) {
                event.target.select();
                openlist.classList.add('show_edit');

            }
        } else {
            openlist.classList.remove('show_edit');
        }

    }
    async function list_titile_update(element, index) {
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