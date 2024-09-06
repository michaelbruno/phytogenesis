var k=0;
var clrs=["330000","550000","770000","990000","aa0000","cc0000","e80000","ff0000"]
var tvar = null;


function startTimer(element){

	console.log("start timer!");
		tvar = setInterval(function () {glow(element)}, 2000);
}

function glow(element){
    /*for(i=0;i<13;i++){*/
		var rad=Math.floor((Math.random() * 15)+5);
		var clr=clrs[Math.floor(Math.random() * 8)];
		var fc=Math.floor(Math.random()*2);
		/*var element=document.getElementById("m"+i);*/
		var sa="0 0 "+rad+"px #"+clr;
    	element.style.textShadow=sa;
		if(fc===0){
			element.style.color="#110000";
		}else if(fc===1){
			element.style.color="#550000";
		}	
/*	}*/
	k=k+1;
}

function stopTimer(){
	console.log("stop timer!");
	clearTimeout(tvar);
}

$(".glyph").hover(
  function(){
	  console.log("hovering start!");
	  glow(this);
	  startTimer(this);
  }, 
  function(){
	  console.log("hovering stop!");
	  stopTimer();
  }
);
 