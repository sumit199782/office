$("#sendBtn").on('click', function (event) {    
    console.log("button clicked");
    $(".alert")[0].style.display  = "none";
    var flag = 0;
    var wrongEMAIL=0;

    var fname   =       $('#dwfrm_contactus_firstname')[0].value;
    var lname   =       $('#dwfrm_contactus_lastname')[0].value;
    var email   =       $('#dwfrm_contactus_email')[0].value;
    
    if(fname== null || fname == ''){
        $(".e_fname")[0].innerHTML="This field is required.";
        $(".e_fname").addClass('error');
        $(".e_fname")[0].style.visibility  = "visible"; 
        flag=1;
    }
    else{
        $(".e_fname")[0].innerHTML="";
        $(".e_fname").removeClass('error');

        $(".e_fname")[0].style.visibility  = "hidden"; 
    }


    if(lname== null || lname == ''){
        $(".e_lname")[0].innerHTML="This field is required.";
        $(".e_lname").addClass('error');

        $(".e_lname")[0].style.visibility  = "visible"; 
        flag=1;
    }
    else{
        $(".e_lname")[0].innerHTML="";
        $(".e_lname").removeClass('error');

        $(".e_lname")[0].style.visibility  = "hidden"; 
    }


    if(email== null || email == ''){
        $(".e_email")[0].innerHTML="This field is required.";
        $(".e_email").addClass('error');

        $(".e_email")[0].style.visibility  = "visible"; 
        flag=1;
        var emailnull=1;
        wrongEMAIL=1;
    }

        var regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;   // Change this regex based on requirement
    if (! email.match(regexEmail) && emailnull!=1) {
       $(".e_email")[0].innerHTML="Please enter a valid Email Address!";
               
       $(".e_email").addClass('error');
       $(".e_email")[0].style.visibility  = "visible"; 
       flag=1; 
       wrongEMAIL=1;
       emailnull=0;
    }

    else if((email!= null || email != '' )&& (wrongEMAIL==0)){
        $(".e_email")[0].innerHTML="";
        $(".e_email").removeClass('error');

        $(".e_email")[0].style.visibility  = "hidden"; 
    }

   if (flag==0)
   {
       buttonClicked();
   }

});

function buttonClicked()
{  

    // $(".e_fname")[0].style.visibility  = "hidden"; 
    // $(".e_lname")[0].style.visibility  = "hidden"; 
    // $(".e_email")[0].style.visibility  = "hidden"; 

    var fname   =       $('#dwfrm_contactus_firstname')[0].value;
    var lname   =       $('#dwfrm_contactus_lastname')[0].value;
    var email   =       $('#dwfrm_contactus_email')[0].value;
    
    var phone   =       $('#dwfrm_contactus_phone')[0].value;
    var order_number =  $('#dwfrm_contactus_ordernumber')[0].value;
    var my_question    =       $('#dwfrm_contactus_myquestion')[0].value;
    var comment = $('#dwfrm_contactus_comment')[0].value;

    var dataa={
        'fname':fname,
        'lname':lname,
        'email':email
    };
    if(phone)
    {
        dataa['phone']=phone;
    }
    if(order_number)
    {
        dataa['order_number']=order_number;
    }
    if(my_question)
    {
        dataa['my_question']=my_question;
    }
    if(comment)
    {
        dataa['comment']=comment;
    }


    
    var url =   $('#send_mail')[0].value;
    console.log(dataa);
    console.log('url '+url);
    
    
    $.ajax({
        type: 'GET',
        url: url,
        data: dataa,
        dataType: 'text',
        success: function (data, xhr, status) {
            
            // console.log('xhr '+xhr);
            // console.log('xhr '+data);
            // console.log('sts '+JSON. stringify(status));
            // console.log('status code '+status.status);
            console.log('ajax called');
            $('.form-horizontal')[0].reset();

            $(".alert")[0].innerHTML="Thank you " +fname+" "+lname +" your message was sent successfully";
            $(".alert").removeClass('alert-danger');
            $(".alert").addClass('alert-success');

            $(".alert")[0].style.display  = "block"; 
            },
            error: function (xhr, textStatus, error) {
                // console.log('2 '+xhr.statusText);
                // console.log('3 '+textStatus);
                // console.log('4 '+error);
                // console.log('1 '+textStatus.data);
                $('.form-horizontal')[0].reset();

                $(".alert").removeClass('alert-success');
                $(".alert").addClass('alert-danger');
                $(".alert")[0].innerHTML="Something went wrong!";
                $(".alert")[0].style.display  = "block"; 
            }
        });

}

$('#RegistrationForm').on('submit', function(e) {
    { 
        e.preventDefault();
        return false;
    }
    });
       