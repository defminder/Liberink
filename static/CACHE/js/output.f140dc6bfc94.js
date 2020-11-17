function dropdown(event){dropdown_target=event.target.parentNode.parentNode.getElementsByClassName("dropdown-content");for(let i=0;i<dropdown_target.length;i++){console.log(dropdown_target[i]);console.log(dropdown_target[i].classList.contains('show'));if(dropdown_target[i].classList.contains('show')){dropdown_target[i].classList.remove('show');}
else{dropdown_target[i].classList.add('show');}}}
function hide_dropdown(event){window.onclick=function(event){if(!event.target.matches('.logo')){if(dropdown_target.length==1){if(dropdown_target[0].classList.contains('show')){dropdown_target[0].classList.remove('show');}}}}};var modal=document.getElementById("board_add_modal");var btn=document.getElementById("board_add");var close=document.getElementsByClassName("close")[0];var text=document.getElementById('description_textarea');btn.onclick=function(){modal.style.display="block";document.body.style.overflow='hidden';document.body.style.background='rgba(0, 0, 0, 0.4);';}
close.onclick=function(){modal.style.display="none";document.body.style.overflow='visible';}
text.oninput=function OnInput(event){this.style.height='auto';this.style.height=(this.scrollHeight)+'px';};(function(){'use strict'
window.addEventListener('load',function(){var forms=document.getElementsByClassName('needs-validation')
Array.prototype.filter.call(forms,function(form){form.addEventListener('submit',function(event){if(form.checkValidity()===false){event.preventDefault()
event.stopPropagation()}
form.classList.add('was-validated')},false)})},false)})();