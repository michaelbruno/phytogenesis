"use strict";

define(['chloroprint', 'phytometry'], function (chloroprint, phytometry) {

	
	function setFormValues(bio){
		console.log("WHATEVER");
		document.getElementById('delta-input').value = bio.delta;
		document.getElementById('dist-input').value = bio.dist;
		document.getElementById('maxdepth-input').value = bio.maxdepth;
	}

	return{
		
		init: function(){
		
			console.log("phytocon init");
		
		// "seed-function"
			var seedDrop = document.getElementById('seed-function');
			var bio;
		
			for (var property in chloroprint) {
		    	if (chloroprint.hasOwnProperty(property)) {

					if(chloroprint[property].title){
						
						if(!bio){
							bio = chloroprint[property];
						}
						
						var option = document.createElement('option');;
						option.text = chloroprint[property].title;
						option.value = property;
						seedDrop.add(option);
					}
		    	}
			}
		
			setFormValues(bio);
			
			// add button handler
			
			document.getElementById('render-button').addEventListener('click', function(){
				event.preventDefault();
				var delta = parseFloat(document.getElementById('delta-input').value);
				var dist = parseInt(document.getElementById('dist-input').value);
				var maxdepth = parseInt(document.getElementById('maxdepth-input').value);
				var seedFunction = document.getElementById('seed-function').value;
				
				console.log('seedFunction:'  + seedFunction);
		
				var bio = Object.assign({}, chloroprint[seedFunction]);
				console.log("******");
				console.log(bio);
				bio.delta = delta;
				bio.dist = dist;
				bio.maxdepth = maxdepth;
				window.scrollTo(0,document.body.scrollHeight);
		
				phytometry.render(bio);
			}, false);
			
			
			document.getElementById('seed-function').addEventListener('change', function(){

				var seedFunction = document.getElementById('seed-function').value;
				var bio = Object.assign({}, chloroprint[seedFunction]);
				setFormValues(bio);
				
			}, false);
		}
	}


});