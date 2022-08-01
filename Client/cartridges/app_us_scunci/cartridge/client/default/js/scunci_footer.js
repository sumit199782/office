'use strict';
$('.subscribe-button').click(function () {
    $(".email-description")[0].style.display="none";
    var inp = document.getElementById('email').value;

    var flag = 0;
    console.log(inp);
    if(inp== null || inp == ''){
        $(".email-description")[0].innerHTML="This field can't be empty!";
        $(".email-description")[0].style.color="red";
        $(".email-description")[0].style.display="block";    
        flag=1;
        var emailnull=1;
    }

var regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;   // Change this regex based on requirement
    if (! inp.match(regexEmail) && emailnull!=1) {
        $(".email-description")[0].innerHTML="Please enter a valid Email Address!";
        $(".email-description")[0].style.color="red";
        $(".email-description")[0].style.display="block";
        flag=1; 
    }
    if (flag==0){
                buttonClicked();
                console.log('Success');
            }

    
 
});


function buttonClicked()
{
    console.log('button clicked Fun');
    var url = document.getElementById('call').value;
    console.log(call);
    var inp = document.getElementById('email').value;
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'text',
        data:  {
            'email':inp,
        },
        success: function (data, xhr, status) {
            
            console.log('url '+url);
            console.log('xhr '+xhr);
            console.log('xhr '+data);
            console.log('sts '+JSON. stringify(status));
            console.log('status code '+status.status);
            console.log('ajax called');

             if(status.status==201 || status.status==200)
             {
                // $(".message")[0].innerHTML="Unsubscribed Successfully!!!";
                // $(".message")[0].style.color="green";
                $(".subscribe-model")[0].style.display="block";
                $('.input-email').val('');
                console.log('status.status==201');
             }
             else{

                $(".email-description")[0].innerHTML="Email not found!!!";
                $(".email-description")[0].style.color="red";
                $(".email-description")[0].style.display="block";
             }
        },
        error: function (xhr, textStatus, error) {
            console.log('2 '+xhr.statusText);
            console.log('3 '+textStatus);
            console.log('4 '+error);
            console.log('1 '+textStatus.data);
        }
    });  
}