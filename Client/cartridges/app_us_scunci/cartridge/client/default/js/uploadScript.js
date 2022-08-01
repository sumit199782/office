var formData = new FormData();

// function validate_input()
$(function () {
    $("#btnsub").click(function ()
        { 
            buttonClicked();
        });
});

function buttonClicked()
{  
    console.log('button clicked');
        var upload_file,base64_encoded;

        upload_file = $('#upload')[0].files[0];
        
        var filename=upload_file.name;
        
        var reader = new FileReader();
        reader.readAsDataURL(upload_file);
        reader.onload = function () {
        console.log('upload file',upload_file);
            console.log(reader.result);
        base64_encoded=reader.result;
        base64_encoded=base64_encoded.split(",");
            console.log(base64_encoded);
        formData.append('filetype',base64_encoded[0]);
        formData.append('filename',filename);
        formData.append('upload_file',base64_encoded[1]);

            fun2();

        };
        reader.onerror = function (error) {
        // console.log('Error: ', error);
        };
    
}

function fun2() {
    var url =  $('#send_mail')[0].value;
     

    $.ajax({
        type: 'POST',
        method:'POST',
        url: url,
        data: formData,
        contentType: false,
        processData: false,
        cache: false,
        success: function (data, xhr, status) {
            console.log('url '+url);
            console.log('xhr '+xhr);
            console.log('xhr '+data);
            console.log('sts '+JSON. stringify(status));
            console.log('status code '+status.status);
        },
        error: function (xhr, textStatus, error) {
            // console.log('2 '+xhr.statusText);
            // console.log('3 '+textStatus);
            // console.log('4 '+error);
            // console.log('1 '+textStatus.data);
        }
    });
}

