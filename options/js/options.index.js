var $ = require('jquery');
var API = 'http://35.160.215.28';

function logIn(email, password) {
  var logInData = {
    login_username: email,
    login_password: password
  };

  $.ajax({
    method: 'POST',
    url: API + '/harambe/login',
    contentType: 'application/json',
    data: JSON.stringify(logInData),
    success: function(data) {
      console.log(data);

      localStorage.setItem('echoLockLoggedIn', true);
      localStorage.setItem('echoLockFirstName', 'Jack');
      localStorage.setItem('echoLockLastName', 'Zhang');
      localStorage.setItem('echoLockEmail', email);
      localStorage.setItem('echoLockAPIKey', data.api_key);

      localStorage.getItem('echoLockLoggedIn');

      location.reload();
    },
    error: function(data) {
      console.error(data);
    },
    dataType: 'json'
  });
}

function logOut() {
  localStorage.clear();
  location.reload();
}

function submitAccountSettings(firstName, lastName, email) {
  console.log('submit account settings');

  localStorage.setItem('echoLockFirstName', firstName);
  localStorage.setItem('echoLockLastName', lastName);
  localStorage.setItem('echoLockEmail', email);
}

function activateWebsite(siteUrl, emailUsername, password) {
  // hack out the site name
  var parser = document.createElement('a');
  parser.href = siteUrl;
  
  var siteName = parser.hostname.replace('.com', '');
  console.log(siteName);

  var addSiteData = {
    api_key: localStorage.echoLockAPIKey,
    site_name: siteName,
    site_username: emailUsername,
    site_password: password
  }

  $.ajax({
    method: 'POST',
    url: API + '/harambe/add_site',
    contentType: 'application/json',
    data: JSON.stringify(addSiteData),
    success: function(data) {
      console.log(data);
    },
    error: function(data) {
      console.error(data);
    },
    dataType: 'json'
  });
  
  location.reload();
}

function handleFormSubmissions() {
  $('.login-form').submit(function(e){
     e.preventDefault();
     var email = e.currentTarget['0'].value;
     var password = e.currentTarget['1'].value;

     logIn(email, password);
  });

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

function checkUser() {
  if (localStorage.echoLockLoggedIn) {
    $('.logged-in-user').text(localStorage.echoLockEmail);
    $('.logged-in-user').text(localStorage.echoLockEmail);
    $('.login-container').hide();
  } else {
    $('.logged-in-as').hide();
    $('.user-forms').hide();
  }
}

function handleLogout() {
  $('.logged-in-user').click(function() {
    delete localStorage.echoLockLoggedIn;
    delete localStorage.echoLockEmail;
    delete localStorage.echoLockAPIKey;

    location.reload();
  })
}

$(document).ready(function() {
  checkUser();
  handleFormSubmissions();
  handleLogout();
});
