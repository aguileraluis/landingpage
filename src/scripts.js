var $ = require('jquery'); 

$('form').submit(function(event) {
    var userEmail = $('#email').val(); 
    var userFname = $('#fname').val(); 
    var userLname = $('#lname').val(); 
    var userAnswer = $('#answer').val(); 
    event.preventDefault();
    $.ajax({
        url: '/',
        type: 'POST',
        data: {
            email: userEmail,
            fname: userFname,
            lname: userLname,
            answer: userAnswer
        },
        success: function(response) {
            console.log(response);
        }
    });
   
}); 




