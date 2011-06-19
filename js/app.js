// Wait for PhoneGap to connect with the device
//
function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
	console.log("document loaded");
}


// PhoneGap is ready to be used!
//
function onDeviceReady() {
	console.log("PhoneGap says: device ready");
	pictureSource = navigator.camera.PictureSourceType;
	destinationType = navigator.camera.DestinationType;
}

Ext.regApplication({
    name: 'arcc',
    icon: "images/icon.png",
    tabletStartupScreen: "tabletstartup.png",
    phoneStartupScreen: "images/Default.png",
    glossOnIcon: false,
    launch: function() {
        this.launched = true;
		console.log("app launched");
        this.mainLaunch();
    },
    mainLaunch: function() {
        if (!device || !this.launched) {return;}
        console.log('mainLaunch');
		
		this.views.viewport = new arcc.views.Viewport();
    }
});

var pictureSource;   // picture source
var destinationType; // sets the format of returned value 

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
	console.log("attempting upload the whole shabang");
	arcc.stores.requestStore.each(function (record) { sendRequest(record); })
}

function sendRequest(record) {
	console.log('sending request for ' + record.get('email'));
	
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
	image: record.get('image')
	}
	
	Ext.Ajax.request({
					 url: 'http://www.e-merce.be/proj/arc/pg/uploadAndMail.php',
					 method: "POST",
					 params: parameters,
					 success: function(response, options){
					 
					 console.log('successfully sent outstanding request for ' + record.get('email'));
					 arcc.stores.requestStore.remove(record);
					 arcc.stores.requestStore.sync();
					 
					 console.log('Cleared outstanding requests, queue now has ' + arcc.stores.requestStore.getCount() + ' items left');
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
