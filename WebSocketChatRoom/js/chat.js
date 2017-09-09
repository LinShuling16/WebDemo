window.onload = onlaod;
function onlaod(){
	var signin = document.getElementsByClassName("signin")[0];
	var backrop =document.getElementsByClassName("modal_backrop")[0];
	var in_btn = document.getElementById("in");
	in_btn.onclick = function(){
		display_none();
	}
	backrop.onclick =function(){
		display_none();
	}
	function display_none(){
		signin.style.display = "none";
		backrop.style.display = "none";
	}
	var websocket = new WebSocket("ws://10.10.0.25:3000/");//IPv4
	function showMessage(str,type){
		var p = document.createElement("p");
		var chat_area = document.getElementById("chat_area");
		p.innerHTML = str;
		if(type == "enter"){
			p.style.color = "blue";
		}else if(type == "leave"){
			p.style.color = "red";
		}
		chat_area.appendChild(p);
		chat_area.scrollTop = chat_area.scrollHeight;//滚动条始终在底端
	}

	websocket.onopen = function(){
		console.log("WebSocket open.");
		document.getElementById("send_btn").onclick = function(){
			send();
		};
	}

	websocket.onclose = function(){
		console.log("websocket close.");
	}
	websocket.onmessage = function(e){
		console.log(e.data);
		var mes = JSON.parse(e.data);
		showMessage(mes.data,mes.type);
	}
	//Enter发送
	document.onkeydown = function(event){
		var e = event || window.event || arguments.callee.caller.arguments[0];
	   	if(e && e.keyCode==13){ 
	        send();
	        return false;//取消回车默认换行事件
	    }
	}
	function send(){
		var txt = document.getElementById("send_txt").value;
		if(txt){
			websocket.send(txt);
		}else{
			alert("发送内容不能为空...");
		}
	   document.getElementById("send_txt").value = ""; //发送后输入框清零
	}
}