'use strict';


//Validation forms
function validateForm(selector) {
    Array.from(document.querySelectorAll(selector)).forEach(item => {
        item.addEventListener('input', (e) => {
            if(e.target.value === ''){
            item.dataset.touched = false;
            }
        });
        item.addEventListener('invalid', () => {
            item.dataset.touched = true;
        });
        item.addEventListener('blur', () => {
            if (item.value !== '') item.dataset.touched = true;
        });
    });
};

validateForm('.js-form .form-field');

var form = document.querySelector('.js-form');
var formName = '.js-form';

// form.addEventListener('submit', submitForm);
form.addEventListener('submit', function(e){
    submitForm(e, formName);
});
// async function handleSubmit(e, formName) {
//     e.preventDefault();
//     var status = document.getElementById('my-form-status');
//     var data = new FormData(e.target);
//     fetch(e.target.action, {
//       method: form.method,
//       body: data,
//       headers: {
//           'Accept': 'application/json'
//       }
//     }).then(response => {
//       status.innerHTML = "Thanks for your submission!";
//       form.reset()
//     }).catch(error => {
//       status.innerHTML = "Oops! There was a problem submitting your form"
//     });
// }
function submitForm(e, formName) {
    e.preventDefault();
    var status = document.getElementById('my-form-status');
    var name = $(formName + ' .js-field-name').val();
    var email = $(formName + ' .js-field-email').val();
    var message = $(formName + ' .js-field-message').val();

    var formData = {
        name: name,
            _replyto: email,
            email: email,
            message: message,
            _subject: 'Form Submission',
    };
    
    $.ajax({
        type: "POST",
        url: 'https://formspree.io/f/mjvjkdaa',
        data: formData,
        dataType: 'json',
        success: function () {
            console.log('success');
            status.innerHTML = "Thank you for your submission!";
            status.style.textAlign = "center";
            //...
        },
        error: function () {
            console.log('error');
            status.innerHTML = "There was a problem submitting your form...";
            status.style.textAlign = "center";
            //...
        }
    });
}