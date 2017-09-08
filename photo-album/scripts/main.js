(function($, Handlebars) {
	'use strict';

	$(document).ready(function(){
		var photoGallery = {
			twentyRandomPhotos: [],
			photosURL: 'data/photos.json',
			init: function(){
				this.cacheDom();
				this.bindEvents();
				this.fetchPhotos();
			},
			cacheDom: function(){
				this.$el = $('#all-photos');
				this.$templateStr = $('#photo-template');
				this.$galleryModal = $('#gallery-modal');
			},
			bindEvents: function(){
				this.$el.on('click', '.photo', this.handlePhotoClick.bind(this));
			},
			fetchPhotos: function(){
					var galleryObject = this;
					$.get(this.photosURL, function(response) {
						var i;
						var random = 0;
						for(i = 0; i < 20; i++){
							random = Math.floor(Math.random() * (response.length - 1)) + 1;
							galleryObject.twentyRandomPhotos.push(response[random]);
							response.splice(random, 1);
						}
						galleryObject.setPhotos(galleryObject.twentyRandomPhotos);
					});
					
			},
			setPhotos: function(photos) {
				var templateStr = this.$templateStr.html();
				var photoTemplate = Handlebars.compile(templateStr);
				var html = photoTemplate({ photos: photos });
				this.$el.append(html);
			},
			handlePhotoClick: function(event){
				var galleryObject = this;
				var target = event.target;
				var photoContainer = target.closest('div');
				var photoId = $(photoContainer).data('photoid');
				var photoObject = galleryObject.twentyRandomPhotos.find(function(photo){
					return photo.id === photoId;
				});
				console.log(photoObject);
				var photoURL = photoObject.url;
				$(photoContainer).avgrund({
					showClose: true,
					showCloseText: 'close',
					width: 350,
					height: 350,
					template: '<img height=350 id="#gallery-modal__img" src="'+photoURL+'"/>'
				});
				//activating the modal code doesn't make it appear so we must trigger a click
				$(photoContainer).trigger('click'); 		
			}
		}

		photoGallery.init();
	});

})(jQuery, Handlebars);
