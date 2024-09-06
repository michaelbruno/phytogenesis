/*
 * Demo sort algorithms in JS
 * by Michael Bruno
 */

var max=20;
var k=0;
var tvar = null;
var tempArray = [];

function randomizeAll(){
		 
	var numSet = new Set();
		 
	for(i=0;i<max;i++){
		var notfound = true;
		while(notfound){
			var num = Math.floor((Math.random() * 20) + 1);
			if(!numSet.has(num)){
				numSet.add(num);
				document.getElementById("m"+i).innerHTML=num;
				notfound = false;
			}
		}
	}
}
	 
function resetAll(){
		 
		 for(i=0;i<max;i++){
			 document.getElementById("m"+i).innerHTML=(20 - i);
		 }
		 
}
	 
function bubbleSort(){
	
	for(i=0;i<max;i++){
		for(j=0;j<max;j++){
			var a = Number(document.getElementById("m"+i).innerHTML);
			var b = Number(document.getElementById("m"+j).innerHTML);
			if(b>a){
				document.getElementById("m"+i).innerHTML = b;
				document.getElementById("m"+j).innerHTML = a;
			}
		}
	}
}


function startTimer(element){
	tvar = setInterval(function () {glow(element)}, 2000);
}

function stopTimer(){
	clearTimeout(tvar);
}
	
function mergeSort(){

	var low = 0;
	var high = 19;
		//for(i=low;i<=high;i++){
		//	tempArray[i] = Number(document.getElementById("m"+i).innerHTML);
		//}
	tempArray = [];
	mergeCalc(low, high);
}
	
function mergeCalc(low, high){
		
	if(low<high){
		var middle = parseInt((low + high)/2);
		mergeCalc(low, middle);
		mergeCalc(middle+1,high);
		mergeArrays(low, middle, high);
	}
}
	
	
function mergeArrays(low, middle, high){
		
	for(i=low;i<=high;i++){
		tempArray[i] = Number(document.getElementById("m"+i).innerHTML);
	}
		
	var a = low;
	var b = middle + 1;
	var c = low;
		
	while(a <= middle && b <= high){
		
		if(tempArray[a] <= tempArray[b]){
			document.getElementById("m"+c).innerHTML = tempArray[a];
			a++;
		}else{
			document.getElementById("m"+c).innerHTML = tempArray[b];
			b++;
		}
		c++;
	}
		
	while (a <= middle) {
		document.getElementById("m"+c).innerHTML = tempArray[a];
		c++;
		a++;
	}
		
}
