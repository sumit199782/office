'use strict';
$(window).resize(function(){
    var screen_width = window.screen.width;
    console.log('screen size = '+screen_width);
    if(screen_width <= 768 || screen_width >= 544){
        var grids = document.getElementsByClassName("col-sm-3");
        console.log(grids);
        console.log(grids.length);
        for(var i = 0 ; i < grids.length ; i++){
            console.log(i);
            var j=i;
        //     grids[i].classList.remove("col-sm-3");
        //     i=j;
        //     grids[i].classList.add("col-sm-4");
        // i=j;
        }
    }
});

