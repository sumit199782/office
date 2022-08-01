// showing the week div
$("#me").on("click",function(){ // id selector by use # and id name;
     console.log("hi");
    $(".modal").css("display","block") // class selector by use . and class name;
 });
// Disable the week div

 $(".sub").on("click",function(){
     console.log("in");
    $(".modal").css("display","none")
 });


var sessions=document.getElementById("sessions");
console.log(sessions);


$(".sub").on("click",function(){
    console.log('i m in');
   var store=sessions.value;
   console.log(store);
    sessionStorage.clear();
    sessionStorage.setItem("store", store);
    let ss = sessionStorage.getItem("store");
    console.log("ss "+ss);

    url = 'https://zydf-004.sandbox.us01.dx.commercecloud.salesforce.com/on/demandware.store/Sites-sumit-Site/en_US/HelloV2-Show?store='+store;
                    $.ajax({
                        type: 'GET',
                    url: url,
                    success: function(data, xhr, status) {
                        console.log('ajax called');
                        console.log('ajax called2');
                    },
                    error: function(xhr, textStatus, error) {
                        console.log('2 ' + JSON.stringify(xhr));
                        console.log('3 ' + textStatus);
                        console.log('4 ' + error);
                        console.log('1 ' + textStatus.data);
                    }
                });
});

$(".close").on("click",function(){
     console.log("in");
    $(".modal").css("display","none")
 });