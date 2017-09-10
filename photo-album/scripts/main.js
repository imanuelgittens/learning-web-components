(function($, Handlebars) {
	'use strict';

	$(document).ready(function(){
		var photoGallery = {
			twentyRandomPhotos: [],
			photoAlbums: [],
			photosURL: 'data/photos.json',
			albumsURL: 'data/albums.json',
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
					$.get(galleryObject.photosURL, function(response) {
						var i;
						var random = 0;
						for(i = 0; i < 20; i++){
							random = Math.floor(Math.random() * (response.length - 1)) + 1;
							galleryObject.twentyRandomPhotos.push(response[random]);
							response.splice(random, 1);
						}
						//after fetching photos, we fetch the albums
						galleryObject.fetchAlbums();
					});
					
			},
			fetchAlbums: function(){
					var galleryObject = this;
					$.get(galleryObject.albumsURL, function(response){
						var i, temp;
						for(i = 0; i < galleryObject.twentyRandomPhotos.length; i++){
							temp = response.find(function(album){
								return galleryObject.twentyRandomPhotos[i].albumId === album.id;
							});
							if(galleryObject.photoAlbums.indexOf(temp) < 0){
								galleryObject.photoAlbums.push(temp);
							}
							
						}

						//after fetching albums we display photos on the page
						galleryObject.displayPhotosByAlbum();
					})
			},
			displayPhotosByAlbum: function(){
				var galleryObject = this;
				var tempAlbum = [];
				var temp;
				var i;
				var currAlbum;
				var context = {};
				for(i = 0; i < galleryObject.photoAlbums.length; i++){
					currAlbum = galleryObject.photoAlbums[i];
					temp = galleryObject.twentyRandomPhotos.filter(function(photo){
						return photo.albumId === currAlbum.id;
					});
					context[currAlbum.id] = [];
					context[currAlbum.id].push(...temp);
				}
				galleryObject.setPhotos(context);

			},
			setPhotos: function(photos) {
				var templateStr = this.$templateStr.html();
				var photoTemplate = Handlebars.compile(templateStr);
				var html = photoTemplate(photos);
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
				var photoURL = photoObject.url;
				var win = window.open(photoURL, '_blank');
				if (win) {
				    //Browser has allowed it to be opened
				    win.focus();
				} else {
				    //Browser has blocked it
				    alert('Please allow popups for this website');
				}
			}
		}

		photoGallery.init();
	});

})(jQuery, Handlebars);
