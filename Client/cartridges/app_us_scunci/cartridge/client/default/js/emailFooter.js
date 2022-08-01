'use strict';

function displayMessage(data, button) {
    $.spinner().stop();
    var status;
    if (data.success) {
        var email   =       $('#email').val();

        var regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;   // Change this regex based on requirement
        if (! email.match(regexEmail) && emailnull!=1 && email== null || email == '') {

        }
        else {
        document.getElementById('popUpDisplay').style='display: block; ';
        }
        status = 'alert-success';
    } else {
        status = 'alert-danger';
    }

    // if ($('.email-signup-message').length === 0) {
    //     $('body').append(
    //        '<div class="email-signup-message"></div>'
    //     );
    // }
    // $('.email-signup-message')
    //     .append('<div class="email-signup-alert text-center ' + status + '">' + data.msg + '</div>');

    setTimeout(function () {
        $('.email-signup-message').remove();
        button.removeAttr('disabled');
    }, 1000);
}

    $('.back-to-top').click(function () {
        scrollAnimate();
    });

    $('.subscribe-email').on('click', function (e) {
        e.preventDefault();
        var url = $(this).data('href');
        var button = $(this);
        var emailId = $('input[name=hpEmailSignUp]').val();
        $.spinner().start();
        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: {
                emailId: emailId
            },
            success: function (data) {
                displayMessage(data, button);
            },
            error: function (err) {
                displayMessage(err, button);
            }
        });
    });
