define({
	
	/*
	foo : 'whatever',

	basic :  {
		title: 'Test Shape',
		delta : 90,
		dist : 10,
		maxdepth : 2,
		initiator : 'F - F - F - F'.split(' '),
		gen: (new Map()).set('F','F - F + F + F F - F - F + F'.split(' '))
	},
*/
	simpleAxial :  {
		title: 'Simple Axial Tree',
		delta : 25.7,
		dist : 20,
		maxdepth : 3,
		initiator : 'F'.split(' '),
		gen: (new Map()).set('F','F [ + F ] [ - F [ - F ] F ] F [ + F ] [ - F ]'.split(' '))
	},
	
	skinnyGrass : {
		title : 'Skinny Grass',
		delta : 25.7,
		dist : 2,
		maxdepth : 5,
		initiator : 'F'.split(' '),
		gen : (new Map()).set('F','F [ + F ] F [ - F ] F'.split(' '))  // F ->
	},
	
	symmetricTree : {
		title : 'Symmetric Tree',
		delta : 25.7,
		dist : 2,
		maxdepth : 7,
		initiator : 'X'.split(' '),
		gen : (new Map()).set('X','F [ + X ] [ - X ] F X'.split(' ')).set('F','F F'.split(' ')) 
		
	},

	denseTree : {
		title : 'Dense Tree',
		delta : 22.5,
		dist : 8,
		maxdepth : 4,
		initiator : 'F'.split(' '),
		gen : (new Map()).set('F','F F - [ - F + F + F ] + [ + F - F - F ]'.split(' '))
		
	}
});