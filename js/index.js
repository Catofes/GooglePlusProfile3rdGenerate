addon=[
{
	'name'	:	"简单g+4图标",
	'url'	:	"https://lh4.googleusercontent.com/-NouNZznmUoA/VZPSOhQ-DDI/AAAAAAAAEEI/4Wf9GJ8hGfw/s865-no/g%252B4th-t.png",
	'local_x'	:	128,
	'local_y'	:	128,
	'size_x'	:	256,
	'size_y'	:	256,
	'angle'		:	0,
	'allowmove'	:	1,
},
{
	'name'	:	"极简+4图标",
	'url'	:	"https://lh3.googleusercontent.com/-8ReUv-_TTmA/VZPuztzkiEI/AAAAAAAAEEw/Tq2qbf4I22w/s189-no/4th-glow.png",
	'local_x'	:	128,
	'local_y'	:	128,
	'size_x'	:	256,
	'size_y'	:	256,
	'angle'		:	0,
	'allowmove'	:	1,
},
{
	'name'	:	"极简+4图标（无发光）",
	'url'	:	"https://lh3.googleusercontent.com/-b78XjaLpIEA/VZPPUHAd8lI/AAAAAAAAEDM/BOPiH2zj1hE/s189-no/4th.png",
	'local_x'	:	128,
	'local_y'	:	128,
	'size_x'	:	256,
	'size_y'	:	256,
	'angle'		:	0,
	'allowmove'	:	1,
},
{
	'name'	:	"红色挂坠",
	'url'	:	"https://lh3.googleusercontent.com/-sMXKqAnFwT4/VZPqtIE4KTI/AAAAAAAAEEY/val7GC4uDXg/w258-h280-no/g%252B4th-pendant.png",
	'local_x'	:	128,
	'local_y'	:	128,
	'size_x'	:	256,
	'size_y'	:	256,
	'angle'		:	0,
	'allowmove'	:	1,
},
{
	'name'	:	"红色按钮图标",
	'url'	:	"https://lh5.googleusercontent.com/-hOANWMnGBMM/VZPHcXSteJI/AAAAAAAAEBE/mKoDXn59x3Y/s224-no/g%252B4th.png",
	'local_x'	:	128,
	'local_y'	:	128,
	'size_x'	:	256,
	'size_y'	:	256,
	'angle'		:	0,
	'allowmove'	:	1,
},
{
	'name'	:	"白色按钮图标",
	'url'	:	"https://lh5.googleusercontent.com/-e89rLPZT5jg/VZPHcXDJykI/AAAAAAAAEBI/tw6uotRUBjk/s189-no/g%252B4th-w.png",
	'local_x'	:	128,
	'local_y'	:	128,
	'size_x'	:	256,
	'size_y'	:	256,
	'angle'		:	0,
	'allowmove'	:	1,
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
					document.pan=new Pan(can);
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

function rotateAndPaintImage ( context, image, angleInRad , positionX, positionY, axisX, axisY ) {
	context.translate( positionX, positionY );
	context.rotate( angleInRad );
	context.drawImage( image, -axisX, -axisY );
	context.rotate( -angleInRad );
	context.translate( -positionX, -positionY );
}

function update(i){
	_ctx=document.ctx;
	addonimg=new Image();
	addonimg.setAttribute('crossOrigin','anonymous');
	addonimg.src=addon[i].url;
	document.addonimg=addonimg;
	document.activeaddon=i;
	addonimg.onload = function(){
		_ctx.clearRect(0,0,512,512);
		_ctx.drawImage(document.myPic,0,0,512,512);
		//_ctx.drawImage(addonimg,addon[i].local_x,addon[i].local_y,addon[i].size_x,addon[i].size_y);
		rotateAndPaintImage(_ctx, addonimg, addon[i].angle, addon[i].local_x,addon[i].local_y,addon[i].size_x,addon[i].size_y);
	};
}

function redraw(){
	_ctx=document.ctx;
	_i=document.activeaddon;
	_ctx.clearRect(0,0,512,512);
	_ctx.drawImage(document.myPic,0,0,512,512);
	//_ctx.drawImage(document.addonimg,addon[_i].local_x,addon[_i].local_y,addon[_i].size_x,addon[_i].size_y);
	rotateAndPaintImage(_ctx, addonimg, addon[i].angle, addon[i].local_x,addon[i].local_y,addon[i].size_x,addon[i].size_y);
}

function download(){
	$("#a_d").attr("href",$("#c_p")[0].toDataURL("image/png")).attr("download","photo.png");
	$("#a_d")[0].click();	
}


$("#c_p")[0].div=$("#c_p")[0].parentNode;
$("#c_p")[0].stopEventBubble = function(e) {
	if (e.preventDefault) {
		e.preventDefault();
	} else {
		e.returnValue = false;
	}

	if (e && e.stopPropagation)
	  e.stopPropagation();
	else
	  window.event.cancelBubble=true;
}

function Pan(layer) {
	this.layer = layer;
	this.div = layer.div;
	this.active();
	this.dragging = false;
	this.mouse = 'left';
}

Pan.prototype.startPan = function(e) {
	this.dragging = true;
	this.lastX = (e.offsetX || e.layerX || e.pageX);
	this.lastY = (e.offsetY || e.layerY || e.pageY);
	this.div.style.cursor = "move";
	if(e.button==2||e.button==3){
		this.mouse = "right";
	}else{
		this.mouse = "left";
	}
	$("#c_p")[0].stopEventBubble(e);
}

Pan.prototype.pan = function(e) {
	if(this.dragging) {
		if(this.mouse === "left"){
			var layer = this.layer;
			var dx = (e.offsetX || e.layerX || e.pageX) - this.lastX;
			var dy = (e.offsetY || e.layerY || e.pageY) - this.lastY;
			this.lastX = (e.offsetX || e.layerX || e.pageX);
			this.lastY = (e.offsetY || e.layerY || e.pageY);
			if(!isNaN(document.activeaddon)){
				if(addon[document.activeaddon].allowmove==1){
					addon[document.activeaddon].local_x+=dx;
					addon[document.activeaddon].local_y+=dy;
					redraw();
				}
			}
		}else{
			var layer = this.layer;
			var dx = (e.offsetX || e.layerX || e.pageX) - this.lastX;
			var dy = (e.offsetY || e.layerY || e.pageY) - this.lastY;
			this.lastX = (e.offsetX || e.layerX || e.pageX);
			this.lastY = (e.offsetY || e.layerY || e.pageY);
			if(!isNaN(document.activeaddon)){
				if(addon[document.activeaddon].allowmove==1){
					addon[document.activeaddon].angle+=dx/Math.abs(dx)*Math.sqrt(dx*dx+dy*dy)/100;
					redraw();
				}   
			}  
		}
	}
	$("#c_p")[0].stopEventBubble(e);
}

Pan.prototype.endPan = function(e) {
	this.div.style.cursor = "default";
	this.dragging = false;
	$("#c_p")[0].stopEventBubble(e);
}

Pan.prototype.wheelChange = function(e) {
	var layer = this.layer;
	var delta = ((e.wheelDelta||e.originalEvent.wheelDelta) / 120) * 0.1;
	if(!isNaN(document.activeaddon)){
		if(addon[document.activeaddon].allowmove==1){
			addon[document.activeaddon].size_x*=(1+delta);
			addon[document.activeaddon].size_y*=(1+delta);
			redraw();
		}
	}
	$("#c_p")[0].stopEventBubble(e);
}

Pan.prototype.DOMScroll = function(e) {
	if(navigator.userAgent.toLowerCase().match(/firefox\/([\d.]+)/)){
		var layer = this.layer;
		var delta = ((e.detail||e.originalEvent.detail) / 3) * 0.1;
		if(!isNaN(document.activeaddon)){
			if(addon[document.activeaddon].allowmove==1){
				addon[document.activeaddon].size_x*=(1+delta);
				addon[document.activeaddon].size_y*=(1+delta);
				redraw();
			}
		}
	}
	$("#c_p")[0].stopEventBubble(e);
}

Pan.prototype.Events = [["mousedown", Pan.prototype.startPan],
	["mousemove", Pan.prototype.pan],
	["mouseup", Pan.prototype.endPan],
	["mousewheel", Pan.prototype.wheelChange],
	["DOMMouseScroll", Pan.prototype.DOMScroll]];

Pan.prototype.active = function () {
	for(var i = 0, len = this.Events.length; i < len; i++) {
		var type = this.Events[i][0];
		var listener = this.Events[i][1];
		$("#c_p").bind(type,this,listener);
	}
}                
