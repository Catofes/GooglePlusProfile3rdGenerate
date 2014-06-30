addon=[
{
	'name'	:	"林1",
	'url'	:	"https://lh3.googleusercontent.com/-gDmP7fgW0Z0/U7AkVYdxbmI/AAAAAAAADzg/xH6C_PxjR1E/s0/gplus_3rd_ribbon.png",
	'local_x'	:	0,
	'local_y'	:	0,
	'size_x'	:	512,
	'size_y'	:	512,
},
{
	'name'	:	"林2",
	'url'	:	"https://lh6.googleusercontent.com/-uI3-3ISOv6w/U7EXypdoP8I/AAAAAAAADzE/deyCNsNfm60/s0/gplus_3rd_ribbon.png",
	'local_x'	:	0,
	'local_y'	:	0,
	'size_x'	:	512,
	'size_y'	:	512,
},
{
	'name'	:	"林3",
	'url'	:	"https://lh4.googleusercontent.com/-p_bkIPqFZaM/U7EZoLuoHFI/AAAAAAAADz0/R10DngRzrDo/s0/gplus_3rd_ribbon_blue.png",
	'local_x'	:	0,
	'local_y'	:	0,
	'size_x'	:	512,
	'size_y'	:	512,
},
{
	'name'	:	"林4",
	'url'	:	"https://lh4.googleusercontent.com/-31oeV-S_eMg/U7EZoIlCjwI/AAAAAAAADz4/TetmxPux-Fc/s0/gplus_3rd_ribbon_cold.png",
	'local_x'	:	0,
	'local_y'	:	0,
	'size_x'	:	512,
	'size_y'	:	512,
},
{
	'name'	:	"林5",
	'url'	:	"https://lh3.googleusercontent.com/-APf_W00s6e0/U7EZoBIZuyI/AAAAAAAAD0A/XWHNUFHaxzA/s0/gplus_3rd_ribbon_green.png",
	'local_x'	:	0,
	'local_y'	:	0,
	'size_x'	:	512,
	'size_y'	:	512,
},
{
	'name'	:	"林6",
	'url'	:	"https://lh3.googleusercontent.com/-56vD8eP0ROA/U7EZoxu0PBI/AAAAAAAADz8/iPVGe86oYV0/s0/gplus_3rd_ribbon_warm.png",
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
				document.myPic.setAttribute('crossOrigin','anonymous');
				document.myPic.src=json.picture;
				document.myPic.onload = function(){
					document.ctx = can.getContext('2d');
					document.ctx.drawImage(document.myPic,0,0,512,512);
				};
				$("div#d_l").addClass("hidden");
				$("div#d_p").removeClass("hidden");
				for(i=0;i<addon.length;i++){
					newbutton=document.createElement("button");
					newbutton.className="btn btn-info mybutton";
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
	addonimg.setAttribute('crossOrigin','anonymous');
	addonimg.src=addon[i].url;
	addonimg.onload = function(){
		_ctx.clearRect(0,0,512,512);
		_ctx.drawImage(document.myPic,0,0,512,512);
		_ctx.drawImage(addonimg,addon[i].local_x,addon[i].local_y,addon[i].size_x,addon[i].size_y);
	};
}

function download(){
	$("#a_d").attr("href",$("#c_p")[0].toDataURL("image/png")).attr("download","photo.png");
	$("#a_d")[0].click();	
}

