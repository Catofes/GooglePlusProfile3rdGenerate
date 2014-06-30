function login() {
	var params = {
		'clientid' : '618544633148-49ig7t4g8v32of46en9lab4bneusc1ib.apps.googleusercontent.com',
		'cookiepolicy' : 'single_host_origin',
		'callback' : 'getprofilepic',
		'approvalprompt':'force',
		'scope' : 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
	};
	gapi.auth.signIn(params);
}

function getprofilepic(params) {
	console.log(params);
	$.getJSON('https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + params.access_token, function(json) {
				console.log(json);
				});
}

