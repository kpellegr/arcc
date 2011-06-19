arcc.views.PhotoCard = Ext.extend(Ext.Panel, {
	title: 'Foto',
	id: 'Foto',
    layout: 'vbox',
	align: 'stretch',
	scroll: 'vertical',
	componentCls: 'white',	
	monitorOrientation: true,
	items: [
		{
			html: '<div class="photocard"><img width="320" height="200" src="images/background.png"></div>'
		},
		{
			// Button to pick up a photo from the gallery
			xtype: "button",
			iconMask: true,
			iconCls: 'photos2',
			margin: 10,
			cls:'btn_blue',
			width:300,
			ui: "round",
			text: "Kies een bestaande foto",
			handler: function(){
				//console.log('bestaande foto');
				navigator.camera.getPicture(onPhotoSuccess, onPhotoFail, {quality: 25, sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY})
			}
		},
		{
			xtype: 'button',
			iconMask: true,
			iconCls: 'photo1',
			margin: 10,
			width:300,
			cls:'btn_red',
			ui: "round",
			text: 'Maak een nieuwe foto',
			handler: function(){
				//console.log('maak een nieuwe foto!')
				navigator.camera.getPicture(onPhotoSuccess, onPhotoFail, { 
					quality: 25
				});
			}
		},
		{
			xtype: 'button',
			iconMask: true,
			iconCls: 'delete',
			margin: 10,
			width:300,
			cls:'btn_yellow',
			ui: "round",
			text: 'Wis deze foto',
			handler: function(){
				imageEl = document.getElementById('largeImage');
				if (imageEl){
					//imageEl.style.display = 'none';
					imageEl.src = 'images/foto_holder.png';
				}
				
			}
		},{
			html: '<div style="margin:0 auto 12px; width:320px; text-align=center;"><img id="largeImage" style="display:none; margin:0 auto; width:300px;" src=""></div>'
		}
							

	],
	dockedItems: [{
		xtype: "toolbar",
		dock: "bottom",
		items: [
			{
				xtype: 'button',
				text: '&nbsp;&nbsp;&nbsp;',
				id: 'refreshButton',
				badgeText: '0',
				iconMask: true,
				iconCls: 'cloud_black_upload2',
				handler: function() {
					uploadAndMail();
				}
			},
		] // end toolbaritems
	}],	// end dockeditems
	listeners: {
		'activate': function () {
			updateRefreshButton();
		}
	}
})