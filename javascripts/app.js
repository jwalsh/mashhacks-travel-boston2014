console.log('app.js');
window.fbAsyncInit = function() {
  FB.init({
    appId: '293516784146500',
    status: true, // check login status
    cookie: true, // enable cookies to allow the server to access the session
    xfbml: true  // parse XFBML
  });

  FB.Event.subscribe('auth.authResponseChange', function(response) {

    if (response.status === 'connected') {

      // Mocked response
      testAPI();
    } else if (response.status === 'not_authorized') {
            FB.login(function(response) {
                // handle the response
            }, {scope: 'email,user_checkins,friends_checkins'});

    } else {
            FB.login(function(response) {
                // handle the response
            }, {scope: 'email,user_checkins,friends_checkins'});


    }
  });


  // Inititialize the application
  var init = function() {
    renderInitialGraph();


  }();

    renderInitialGraph();
};


// Utilities
function testAPI() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
    console.log('Good to see you, ' + response.name + '.');
      renderInitialGraph();
  });
}

var renderInitialGraph = function() {
  FB.api(
      '/me',
      function(response) {
        if (response && !response.error) {

            var query = 'SELECT app_id, timestamp, coords FROM checkin WHERE author_uid in(SELECT uid2 FROM friend WHERE uid1= ' + response.id + ')';

            FB.api(
                "/fql?q=" + encodeURIComponent(query),
                function(data) {
                    console.log(data);
                });

           FB.api({
                method: 'fql.query',
                query: query
            },
            function(response){
                console.log(response);
            }
            );

        }
      }
  );
};

// Load the SDK asynchronously
(function(d) {
  var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement('script'); js.id = id; js.async = true;
  js.src = '//connect.facebook.net/en_US/all.js';
  ref.parentNode.insertBefore(js, ref);
}(document));
