const tx = document.getElementsByTagName('textarea');
for (let i = 0; i < tx.length; i++) {
	if (tx[i].classList.contains('sticker')){
		if (tx[i].readOnly){
			tx[i].parentNode.style.height = (tx[i].scrollHeight) + 'px';
			
	    }
		tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;');
	}
}

function OnInput(event) {
    event.target.style.height = 'auto';
    if (event.target.readOnly){
		event.target.parentNode.style.height = (event.target.scrollHeight) + 'px';
    }
    else{
    	event.target.parentNode.parentNode.parentNode.style.height = (event.target.scrollHeight) + 'px';
    }
    event.target.parentNode.parentNode.parentNode.children[0].style.height = (event.target.scrollHeight) + 'px';
    event.target.style.height = (event.target.scrollHeight) + 'px';
}