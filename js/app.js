Ext.regApplication({
    name: 'arcc',
    icon: "images/icon.png",
    tabletStartupScreen: "tabletstartup.png",
    phoneStartupScreen: "images/Default.png",
    glossOnIcon: false,
    launch: function() {
        this.launched = true;
        this.mainLaunch();
    },
    mainLaunch: function() {
        if (!device || !this.launched) {return;}
        console.log('mainLaunch');
		
		//remove splash image
		var splash = Ext.get('splash-image');
		splash.remove();
		this.views.viewport = new arcc.views.Viewport();
    }
});

var pictureSource;   // picture source
var destinationType; // sets the format of returned value 

// Wait for PhoneGap to connect with the device
//
function onLoad() {
	document.addEventListener("deviceready",onDeviceReady,false);
	console.log("document loaded");
}


// PhoneGap is ready to be used!
//
function onDeviceReady() {
	console.log("PhoneGap says: device ready");
	pictureSource=navigator.camera.PictureSourceType;
	destinationType=navigator.camera.DestinationType;
}
