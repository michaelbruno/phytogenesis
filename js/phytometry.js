define(['chloroprint'], function (chloroprint) {
	

	var pixelRatio = window.devicePixelRatio;
  	//var w = 767;
  	var h = 600;
	
	var panelw = document.getElementById('canvas-control').clientWidth; 

  	var canvas = document.createElement('canvas');
  	var ctx = canvas.getContext('2d');

  	if (pixelRatio !== 1) {
    	// if retina screen, scale canvas
    	canvas.style.transform = 'scale(' + 1 / pixelRatio + ')';
    	canvas.style.transformOrigin = '0 0';
  	}
  	canvas.id = 'phytometry';

  	document.getElementById('canvas-container').appendChild(canvas);

  // set canvas size
  	canvas.width = document.getElementById('canvas-container').clientWidth; 
  	canvas.height = h;
	var position; //= {x:(canvas.width/2), y:475, z:0};  //xyz
	var direction; //= {ru:270, rl:0, rh:0};  //xyz
	var bio;
	var dstack; // = [];
	var pstack; // = [];
	var curpos;
	var curdir;
	var debugz;
	var frameNumber;

  	//reset();
  	//grow(bio.initiator, position, direction, 0);

  	//window.addEventListener('click', reset);


  	function reset() {
		//requestAnimationFrame();
		console.log("calling reset()");
		
		requestAnimationFrame(function(){
			ctx.clearRect(0, 0,canvas.width, canvas.height);
		//		console.log("cleared i tink");
		});
		debugz = 0;
		curpos = {x:(canvas.width/2), y:(h - 25), z:0};  //xyz
		curdir = {ru:270, rl:0, rh:0};
		dstack = [];
		pstack = [];
		frameNumber=0;
		
		
  	}

	function renderLine(x1, x2, y1, y2, fn){
		setTimeout(function() {
			
			//console.log("rendering frame " + frameNumber);
			
			requestAnimationFrame(function(){
				ctx.beginPath();
				ctx.strokeStyle = '#AAAAAA';
				ctx.moveTo(x1, y1);
				ctx.lineTo(x2, y2);
				ctx.stroke();
			});
		}, (fn));
	}
	
  	//function grow(cmd, localx, localy, curangle, depth) {
	//function grow(cmd, curpos, curdir, depth){
	function grow(cmd, depth){
		var k;
	//draw line, recurse
		for (k=0;k<cmd.length;k++) {
			
			//console.log('processing token:' + cmd[k]);
		
			if(cmd[k]==='-'){
				curdir.ru = curdir.ru + bio.delta;
			} else if (cmd[k]==='+'){
				curdir.ru = curdir.ru - bio.delta;
			} else if (cmd[k]==='&'){
				curdir.rl = curdir.rl + bio.delta;
			} else if (cmd[k]==='^'){
				curdir.rl = curdir.rl - bio.delta;
			} else if (cmd[k]==='?'){				// originally \
				curdir.rh = curdir.rl + bio.delta;
			} else if (cmd[k]==='~'){				// originally /
				curdir.rh = curdir.rl - bio.delta;
			} else if (cmd[k]==='|'){				
				curdir.rl = curdir.rl - 180;
			} else if (cmd[k]==='['){				
				pstack.push(Object.assign({}, curpos));
				dstack.push(Object.assign({}, curdir));
			} else if (cmd[k]===']'){				
				curpos = pstack.pop();
				curdir = dstack.pop();
			}else{
				
				if(!bio.gen.get(cmd[k])){
					console.log('ERROR');
					throw 'Invalid command encountered';
				}
				
				if((depth + 1)<=bio.maxdepth){

					//requestAnimationFrame(function(){
						var c = bio.gen.get(cmd[k]);
						var nd = depth + 1;
						//requestAnimationFrame(function(){
						grow(c, nd);
							//});
						//var st = grow(bio.gen.get(cmd[k]), curpos, curdir, (depth + 1));
						//curpos = st.p;
						//curdir = st.d;
						//});

				}else{
					//console.log('x.y: ' + curpos.x + ',' + curpos.y);
	        		
					//if(k===0){
					//	ctx.strokeStyle = '#DD0000'
						//}else{
	        		//	ctx.strokeStyle = '#AAAAAA';
					//}
					var x1 = curpos.x, y1 = curpos.y;
	        		
					//console.log('current angle:' + curangle);
					//console.log('x: ' + localx +' y: ' + localy);
				
					curpos.x = curpos.x + bio.dist * Math.cos(curdir.ru * (Math.PI / 180)) * Math.cos(curdir.rl * (Math.PI / 180));
					curpos.y = curpos.y + bio.dist * Math.sin(curdir.ru * (Math.PI / 180)) * Math.cos(curdir.rl * (Math.PI / 180));
					curpos.z = curpos.z + bio.dist * Math.sin(curdir.rl * (Math.PI / 180));
					
					var x2 = curpos.x, y2 = curpos.y;
					var zzz = debugz;
				
					renderLine(x1, x2, y1, y2, frameNumber);
					
					frameNumber++;

				}

			} 
			
		}
		/*
		var obj = {
			p: curpos,
			d: curdir,
		}
		
		
		return obj;
		*/
  	}
	
    return {
      render: function(seedFunction) {
        console.log("LAZER");
		bio = seedFunction;
		console.log(bio);
		reset();
		//grow(bio.initiator, position, direction, 0);
		grow(bio.initiator, 0);
        return true;
      }
    }

});