arcc.controllers.arccController = new Ext.Controller({
	home: function () {
		arcc.views.viewport.setActiveItem(arcc.views.photocard, {type:'slide', direction:'right'});
	},
    forward: function (options) {
		if (options.origin == 'photocard') {
			arcc.views.viewport.setActiveItem(arcc.views.detailForm, {type:'slide', direction:'left'});
		}
    },
    backward: function (options) {
		if (options.origin == 'detailForm') {
			arcc.views.viewport.setActiveItem(arcc.views.photocard, {type:'slide', direction:'right'});
		}
    },
	resetForm: function (options) {
		arcc.views.detailForm.reset();
	},
	resetPhoto: function (options) {
		imageEl = document.getElementById('largeImage');
		if (imageEl){
			imageEl.src = 'images/fotoholder.png';
		}
	},
	makePicture: function (options) {
		console.log('maak een nieuwe foto!')
		if (!navigator) { alert('could not access camera'); return; }
		navigator.camera.getPicture(onPhotoSuccess, onPhotoFail, { 
			quality: 25
		});
	},
	findPicture: function (options) {
		console.log('bestaande foto');
		if (!navigator) { alert('could not access picture library'); return; }
		navigator.camera.getPicture(onPhotoSuccess, onPhotoFail, 
			{quality: 25, sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY})
	},
	submit: function (options) {
		console.log(arcc.views.detailForm.getValues());
		var model = Ext.ModelMgr.create(arcc.views.detailForm.getValues(),'arcc.models.Request');
		imageEl = Ext.get('largeImage');
		console.log('posting image ' + (imageEl ? imageEl.getAttribute('src') : ''));
		model.set('image', (imageEl ? imageEl.getAttribute('src') : ''));

		var errors = model.validate();
		
		if(errors.isValid()) {
			console.log('submitting form');
			arcc.stores.requestStore.add(model);
			arcc.stores.requestStore.sync();

			arcc.controllers.arccController.resetForm();
			arcc.controllers.arccController.resetPhoto();
			arcc.views.viewport.setActiveItem(arcc.views.photoCard), {type:'slide', direction:'right'};

			uploadAndMail();
		}
		else {
			console.log(errors.length + " errors detected");
			var message = "";
			Ext.each(errors.items, function(rec,i) {
				console.log(rec.message);
				message += (rec.message+ "\n");
			});
			alert(message);
		}
	},
	'reload': function (options) {
		uploadAndMail();
	}
});


