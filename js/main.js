requirejs.config({
    baseUrl: 'js',
});

requirejs(['chloroprint', 'phytometry', 'phytocon'],
function   (chloroprint, phytometry, phytocon) {

	phytocon.init();
	
});
