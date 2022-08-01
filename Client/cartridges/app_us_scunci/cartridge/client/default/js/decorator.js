$('.option-bars-icon').on('click' , function(){
    document.getElementsByClassName('t-options')[0].style.display = 'block';
})
$('.t-option-close-icon').on('click' , function(){
document.getElementsByClassName('t-options')[0].style.display = 'none';
})
$('.m-option-bars-icon').on('click' , function(){
document.getElementsByClassName('m-options')[0].style.display = 'block';
})
$('.m-option-close-icon').on('click' , function(){
document.getElementsByClassName('m-options')[0].style.display = 'none';
})
// $('.subscribe-button').on('click' , function(){
// document.getElementsByClassName('subscribe-model')[0].style.display = 'block';
// })
$('.close-model-icon').on('click' , function(){
document.getElementsByClassName('subscribe-model')[0].style.display = 'none';
})
var modal = document.getElementById("subscribe-model");
window.onclick = function(event) {
if (event.target == modal) {
    modal.style.display = "none";
}
}
$('.t-shop-option').on('click' , function(){
document.getElementsByClassName('t-options')[0].style.display = 'none';
document.getElementsByClassName('t-header-shop-options')[0].style.display = 'block';
})
$('.shop-back-link').on('click' , function(){
document.getElementsByClassName('t-options')[0].style.display = 'block';
document.getElementsByClassName('t-header-shop-options')[0].style.display = 'none';
})



$('.t-collabs-option').on('click' , function(){
document.getElementsByClassName('t-options')[0].style.display = 'none';
document.getElementsByClassName('t-header-collabs-options')[0].style.display = 'block';
})
$('.collabs-back-link').on('click' , function(){
document.getElementsByClassName('t-options')[0].style.display = 'block';
document.getElementsByClassName('t-header-collabs-options')[0].style.display = 'none';
})
$('.t-collections-option').on('click' , function(){
document.getElementsByClassName('t-options')[0].style.display = 'none';
document.getElementsByClassName('t-header-collections-options')[0].style.display = 'block';
})
$('.collections-back-link').on('click' , function(){
document.getElementsByClassName('t-options')[0].style.display = 'block';
document.getElementsByClassName('t-header-collections-options')[0].style.display = 'none';
})

$('.m-shop-option').on('click' , function(){
document.getElementsByClassName('m-options')[0].style.display = 'none';
document.getElementsByClassName('m-header-shop-options')[0].style.display = 'block';
})
$('.m-shop-back-link').on('click' , function(){
document.getElementsByClassName('m-options')[0].style.display = 'block';
document.getElementsByClassName('m-header-shop-options')[0].style.display = 'none';
})
$('.m-collabs-option').on('click' , function(){
document.getElementsByClassName('m-options')[0].style.display = 'none';
document.getElementsByClassName('m-header-collabs-options')[0].style.display = 'block';
})
$('.m-collabs-back-link').on('click' , function(){
document.getElementsByClassName('m-options')[0].style.display = 'block';
document.getElementsByClassName('m-header-collabs-options')[0].style.display = 'none';
})
$('.m-collections-option').on('click' , function(){
document.getElementsByClassName('m-options')[0].style.display = 'none';
document.getElementsByClassName('m-header-collections-options')[0].style.display = 'block';
})
$('.m-collections-back-link').on('click' , function(){
document.getElementsByClassName('m-options')[0].style.display = 'block';
document.getElementsByClassName('m-header-collections-options')[0].style.display = 'none';
})