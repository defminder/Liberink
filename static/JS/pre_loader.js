window.onload = function(){
    if (document.getElementsByClassName('page-header').length){
        document.getElementsByClassName('page-header')[0].style.position = 'fixed';
    }
    document.getElementsByClassName('pre_loader_wrapper')[0].remove();
};