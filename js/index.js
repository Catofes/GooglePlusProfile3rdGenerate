addon=[
{
	'name'	:	"林",
	'url'	:	"https://lh4.googleusercontent.com/-p_bkIPqFZaM/U7EZoLuoHFI/AAAAAAAADz0/R10DngRzrDo/s0/gplus_3rd_ribbon_blue.png",
	'local_x'	:	0,
	'local_y'	:	0,
	'size_x'	:	512,
	'size_y'	:	512,
}
];

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
	can=$("#c_p")[0];
	can.width=512;
	can.height=512;
	$.getJSON('https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + params.access_token, function(json) {
				document.myPic=new Image();
				document.myPic.src=json.picture;
				document.myPic.setAttribute('crossOrigin','anonymous');
				document.myPic.onload = function(){
					document.ctx = can.getContext('2d');
					document.ctx.drawImage(document.myPic,0,0,512,512);
				};
				$("div#d_l").addClass("hidden");
				$("div#d_p").removeClass("hidden");
				for(i=0;i<addon.length;i++){
					newbutton=document.createElement("button");
					newbutton.className="btn btn-info";
					newbutton.innerHTML=addon[i].name;
					newbutton.addonnum=i;
					newbutton.onclick=function(){update(this.addonnum)};
					$("div#d_s")[0].appendChild(newbutton);
				}
				});
}

function update(i){
	_ctx=document.ctx;
	addonimg=new Image();
	addonimg.src=addon[i].url;
	addonimg.crossOrigin.setAttribute('crossOrigin','anonymous');
	addonimg.onload = function(){
		_ctx.clearRect(0,0,512,512);
		_ctx.drawImage(document.myPic,0,0,512,512);
		_ctx.drawImage(addonimg,addon[i].local_x,addon[i].local_y,addon[i].size_x,addon[i].size_y);
	};
}

function download(){
	window.location=$("#c_p")[0].toDataURL("image/png");
}

