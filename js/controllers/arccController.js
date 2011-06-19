arcc.controllers.arccController = new Ext.Controller({
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
		if (options.origin == 'detailForm') {
			arcc.views.detailForm.reset();
		}
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
		var errors = model.validate();
		
		if(errors.isValid()) {
			arcc.stores.requestStore.add(model);
			arcc.stores.requestStore.sync();

			uploadAndMail();
			arcc.controllers.arccController.resetForm();
			arcc.controllers.arccController.resetPhoto();
			arcc.views.viewport.setActiveItem(arcc.views.photoCard), {type:'slide', direction:'right'};
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


// HELPER FUNCTIONS BELOW
//

// Called when a photo is successfully retrieved
//
function onPhotoSuccess(imageData) {
	if (!Ext.get('largeImage')) {
		console.log('could not find image element');
		return;
	}
	Ext.get('largeImage').set({src : "data:image/jpeg;base64," + imageData});
	document.getElementById('largeImage').style.display = 'block';
	//console.log('Image data has been set!');
}

// Called if something bad happens. 
// 
function onPhotoFail(message) {
	console.log('Mislukt omdat: ' + message);
}


function uploadAndMail(){
	//console.log("attempting upload the whole shabang");
	arcc.stores.requestStore.each(function (record) {
								  sendRequest(record);
								  })
}

function sendRequest(record) {
	//console.log('sending request for ' + record.get('email'));
	
	imageEl = Ext.get('largeImage');
	//console.log('posting image ' + (imageEl ? imageEl.getAttribute('src') : ''));
	
	parameters = {
	naam: record.get('naam'),
	functie: record.get('functie'),
	bedrijf: record.get('bedrijf'),
	email: record.get('email'),
	Base: record.get('Base'),
	Belgacom: record.get('Belgacom'),
	Mobistar: record.get('Mobistar'),
	Andere: record.get('Andere'),
	aantal_gsm: record.get('aantal_gsms'),
	aantal_wagens: record.get('aantal_wagens'),
	commentaar: record.get('commentaar'),
	image: (imageEl ? imageEl.getAttribute('src') : '')
	}
	
	Ext.Ajax.request({
					 url: 'http://www.e-merce.be/proj/arc/pg/uploadAndMail.php',
					 method: "POST",
					 params: parameters,
					 success: function(response, options){
					 //console.log('successfully sent outstanding request for ' + record.get('email'));
					 arcc.stores.requestStore.remove(record);
					 arcc.stores.requestStore.sync();
					 //console.log('Cleared outstanding requests, queue now has ' + arcc.stores.requestStore.getCount() + ' items left');
					 console.log(response);
					 updateRefreshButton ();
					 },
					 failure: function(){
					 updateRefreshButton ();
					 }
					 });
	
}

function updateRefreshButton () {
	button = Ext.getCmp('refreshButton');
	if (!button) return;
	
	count = arcc.stores.requestStore.getCount();
	
	if (count>0) {
		button.show();
		button.setBadge(count);
	}
	else {
		button.hide();
	}
}  
