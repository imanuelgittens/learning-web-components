(function($, Handlebars) {
	var $photosContainer = $('#all-photos');
	var photosURL = 'data/photos.json';
	//var context = {title: "My New Post", body: "This is my first post!"};

	var templateStr = $('#photo-template').html();
	//console.log(templateStr);
	var photoTemplate = Handlebars.compile(templateStr);

	var setPhotos = function(photos) {
		var html = photoTemplate({ photos: photos });
		console.log(html);
		$photosContainer.append(html);
	};

	$.get(photosURL, function(response) {
		var twentyRandom = [];
		var i;
		var random = 0;
		for(i = 0; i < 20; i++){
			random = Math.floor(Math.random() * response.length) + 1;
			twentyRandom.push(response[random]);
			response.splice(random, 1);
		}
		setPhotos(twentyRandom);
	});
})(Zepto, Handlebars);
