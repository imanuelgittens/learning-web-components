(function($, Handlebars) {
	'use strict';

	$(document).ready(function(){
		var photoGallery = {
			photosURL: 'data/photos.json',
			init: function(){
				this.cacheDom();
				this.bindEvents();
				this.fetchPhotos();
			},
			cacheDom: function(){
				this.$el = $('#all-photos');
				this.$templateStr = $('#photo-template');
			},
			bindEvents: function(){
				this.$el.on('click', '#single-photo', this.handlePhotoClick.bind(this));
			},
			fetchPhotos: function(){
					var galleryObject = this;
					$.get(this.photosURL, function(response) {
						var twentyRandom = [];
						var i;
						var random = 0;
						for(i = 0; i < 20; i++){
							random = Math.floor(Math.random() * response.length) + 1;
							twentyRandom.push(response[random]);
							response.splice(random, 1);
						}
						galleryObject.setPhotos(twentyRandom);
					});
					
			},
			setPhotos: function(photos) {
				var templateStr = this.$templateStr.html();
				var photoTemplate = Handlebars.compile(templateStr);
				var html = photoTemplate({ photos: photos });
				this.$el.append(html);
			},
			handlePhotoClick: function(){
				console.log('photo clicked');
			}
		}

		photoGallery.init();
	});

})(jQuery, Handlebars);
