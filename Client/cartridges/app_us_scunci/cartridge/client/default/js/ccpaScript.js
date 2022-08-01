$("#sendBtn").on('click', function (event) {
    $(".e-fname")[0].style.display  = "none";
    $(".e-lname")[0].style.display  = "none";
    $(".e-address")[0].style.display  = "none";
    $(".e-city")[0].style.display  = "none";
    $(".e-zip")[0].style.display  = "none";
    $(".e-email")[0].style.display  = "none";
    $(".e-selector")[0].style.display  = "none";

    $(".alert")[0].style.display  = "none";
    
    var state   =       $('#dwfrm_infodelete_state').val();
    var fname   =       $('#dwfrm_infodelete_firstName').val();
    var lname   =       $('#dwfrm_infodelete_lastName').val();
    var address1   =    $('#dwfrm_infodelete_address1').val();
    var city   =       $('#dwfrm_infodelete_city').val();
    var email   =       $('#dwfrm_infodelete_emailAddress').val();    
    var zip = $('#dwfrm_infodelete_postal').val();

    var flag = 0;

    // required validation
    if(fname== null || fname == ''){
        $(".e-fname")[0].innerHTML="This field can't be empty!";
        $(".e-fname")[0].style.display  = "block"; 
        flag=1;
    }
    if(lname== null || lname == ''){
        $(".e-lname")[0].innerHTML="This field can't be empty!";
        $(".e-lname")[0].style.display  = "block"; 
        flag=1;
    }
    if(address1  == null || address1 == ''){
        $(".e-address")[0].innerHTML="This field can't be empty!";
        $(".e-address")[0].style.display  = "block"; 
        flag=1;
    }
    if(city == null || city == '' ){
        $(".e-city")[0].innerHTML="This field can't be empty!";
        $(".e-city")[0].style.display  = "block"; 
        flag=1;
    }
    
    if(zip  == null || zip == ''){
        $(".e-zip")[0].innerHTML="This field can't be empty!";
        $(".e-zip")[0].style.display  = "block"; 
        flag=1;
        var zipnull=1;
    }
    if(email== null || email == ''){
        $(".e-email")[0].innerHTML="This field can't be empty!";
        $(".e-email")[0].style.display  = "block"; 
        flag=1;
        var emailnull=1;
    }
    if(state== null || state == ''){
        $(".e-selector")[0].innerHTML="This field can't be empty!";
        $(".e-selector")[0].style.display  = "block"; 
        flag=1;
    }


    // value validations

    var zipRegex = /^[0-9]*$/;  // Change this regex based on requirement
    if (! zip.match(zipRegex) && zipnull!=1) {
        $(".e-zip")[0].innerHTML="Please enter a valid zip code!";
        $(".e-zip")[0].style.display  = "block"; 
        flag=1; 
    }
    
    var regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;   // Change this regex based on requirement
    if (! email.match(regexEmail) && emailnull!=1) {
        $(".e-email")[0].innerHTML="Please enter a valid Email Address!";
        $(".e-email")[0].style.display  = "block"; 
        flag=1; 
    }
        
    

    if(flag == 0){
        buttonClicked();
    }

});

function buttonClicked()
{
    var labelValue1;
    var labelValue2;
    var inputValue1;
    var inputValue2;
    var selector;
    var selector2;
    var list = document.getElementsByClassName('myRadioButton');
    for(var i=0;i<list.length;i++){
    if(list[i].checked){
        inputValue1=list[i].value;
        selector = 'label[for=' + list[i].id + ']';
        break;
    }
    }


    var list2 = document.getElementsByClassName('myRadioButton2');
    for(var i=0;i<list2.length;i++){
    if(list2[i].checked){
        inputValue2=list2[i].value;
        selector2 = 'label[for=' + list2[i].id + ']';
        break;
    }
    }

    var label1 = document.querySelector(selector);
    var label2 = document.querySelector(selector2);
    labelValue1 = label1.innerHTML;
    labelValue2 = label2.innerHTML;


    var state   =       $('#dwfrm_infodelete_state').val();
    var fname   =       $('#dwfrm_infodelete_firstName').val();
    var lname   =       $('#dwfrm_infodelete_lastName').val();
    var address1   =    $('#dwfrm_infodelete_address1').val();
    var city   =       $('#dwfrm_infodelete_city').val();
    var email   =       $('#dwfrm_infodelete_emailAddress').val();    
    var postal   =       $('#dwfrm_infodelete_postal').val();
    var zip = $('#dwfrm_infodelete_postal').val();
    // var phone   =       $('#dwfrm_contactus_phone')[0].value;
    // var order_number =  $('#dwfrm_contactus_ordernumber')[0].value;
    // var my_question    =       $('#dwfrm_contactus_myquestion')[0].value;
    // var comment = $('#dwfrm_contactus_comment')[0].value;

    var dataa={

        'state':state,
        'fname':fname,
        'lname':lname,
        'address1':address1,
        'city':city,
        'postal':postal,
        'email':email,
        'zip': zip,
        'label1': labelValue1,
        'label2': labelValue2

    };


    var url =   document.getElementById('send_mail').value;
    
    $.spinner().start();
    $.ajax({
        type: 'GET',
        url: url,
        data: dataa,
        dataType: 'text',
        success: function (xhr, data, status) {
            $.spinner().stop();
            $('input').val('');
            $("#is-customer").click();            
            $("#dwfrm_infodelete_request-all").click();
            $(".input-select").val([""]);
            $(".alert")[0].innerHTML="Thank you " +fname+" "+lname +" your message was sent successfully";
            $(".alert").addClass('alert-success');

            $(".alert")[0].style.display  = "block"; 

            },
            error: function (xhr, textStatus, error) {
                $.spinner().stop();
                $("#is-customer").click();            
                $("#dwfrm_infodelete_request-all").click();
    
                $('input').val('');
                $("input:radio:checked")[0].checked = false;
                $("input:radio:checked")[0].checked = false;
                $(".input-select").val([""]);
                $(".alert").addClass('alert-danger');
                $(".alert")[0].innerHTML="Something went wrong!";
                $(".alert")[0].style.display  = "block"; 
                
            }
        });
}

$('.button-fancy-large').on('submit', function(e) {
    {
        e.preventDefault();
        return false;
    }
    });
       