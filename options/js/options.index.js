var $ = require('jquery');

function handleFormSubmissions() {
  function submitAccountSettings(firstName, lastName, email) {
    // AJAX
    console.log('submit account settings');
  }

  function activateWebsite(siteUrl, emailUsername, password) {
    // AJAX
    console.log('activate website');
  }

  $('.account-form').submit(function(e){
     e.preventDefault();
     var firstName = e.currentTarget['0'].value;
     var lastName = e.currentTarget['1'].value;
     var email = e.currentTarget['2'].value;

     submitAccountSettings(firstName, lastName, email);
  });

  $('.website-form').submit(function(e){
     e.preventDefault();
     var siteUrl = e.currentTarget['0'].value;
     var emailUsername = e.currentTarget['1'].value;
     var password = e.currentTarget['2'].value;

     activateWebsite(siteUrl, emailUsername, password);
  });
}

$(document).ready(function() {
  handleFormSubmissions();
});
