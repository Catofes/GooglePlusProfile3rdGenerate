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
	can=document.createElement("canvas");
	can.width=500;
	can.height=500;
	$("div#d_p").appendChild(can);
	$.getJSON('https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + params.access_token, function(json) {
				document.myPic=new Image();
				document.myPic.src=json.picture;
				document.myPic.onload = function(){
					ctx = can.getContext('2d');
					ctx.drawImage(document.myPic,0,0,500,500);
				}
				});
}

