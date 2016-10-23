var $ = require('jquery');
var API = 'http://35.160.215.28';

// content script runs at the end of every page load

function checkIfSiteIsEchoLocked(callback) {
  // lil wacky hacky
  var parser = document.createElement('a');
  parser.href = window.location.href;
  
  if (parser.pathname.includes('login')) {
    var siteName = parser.hostname.replace('.com', '');

    var addSiteData = {
      // api_key: localStorage.echoLockAPIKey,
      api_key: 'C9YQZ91S000DUMR3VS69GCAFV0GRBL', // hard-coded for now
      site_name: siteName,
    }

    $.ajax({
      method: 'POST',
      url: API + '/harambe/initiate_login',
      contentType: 'application/json',
      data: JSON.stringify(addSiteData),
      success: function(data) {
        console.log(data);
        callback(true);
      },
      error: function(data) {
        // console.error(data);
        callback(false);
      },
      dataType: 'json'
    });

  } else {
    callback(false);
  }
}

function fillOutLogin(email, password) {
  $('input#email').val(email);
  $('input#password').val(password);
  $('button.submit.left').trigger("click");
}

function getCredentials(siteName, callback) {
  var credentialData = {
    // api_key: localStorage.echoLockAPIKey,
    api_key: 'C9YQZ91S000DUMR3VS69GCAFV0GRBL', // hard-coded for now
    site_name: siteName,
  }

  setInterval(function() {
    $.ajax({
      method: 'POST',
      url: API + '/harambe/receive_credentials',
      contentType: 'application/json',
      data: JSON.stringify(credentialData),
      success: function(data) {
        console.log(data);
        callback();
      },
      error: function(data) {
        console.log('Awaiting response...');
        callback();
      },
      dataType: 'json'
    });
  }.bind(this), 2000);
}

$(document).ready(function() {
  checkIfSiteIsEchoLocked(function(isEchoLocked) {
    if (isEchoLocked) {
      console.log('EchoLocked confirmed.');
      
      var parser = document.createElement('a');
      parser.href = window.location.href;
      var siteName = parser.hostname.replace('.com', '');

      getCredentials(siteName, function() {
        setTimeout(function() {
          fillOutLogin('jackrzhang@college.harvard.edu', 'password');
        }, 3000);
      });
    } else {
      console.log('Site is not EchoLocked.');
    }
  });
});

