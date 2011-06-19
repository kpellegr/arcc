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
				Ext.dispatch({
					controller: arcc.controllers.arccController,
					action: 'findPicture',
					origin: 'photocard'
				});	
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
				Ext.dispatch({
					controller: arcc.controllers.arccController,
					action: 'makePicture',
					origin: 'photocard'
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
				Ext.dispatch({
					controller: arcc.controllers.arccController,
					action: 'resetPhoto',
					origin: 'photocard'
				});	
			}
		},{
			html: '<div style="margin:0 auto 12px; width:320px; text-align=center;"><img id="largeImage" style="margin:0 auto; width:300px;" src="images/fotoholder.png"></div>'
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
					Ext.dispatch({
						controller: arcc.controllers.arccController,
						action: 'reload',
						origin: 'photocard'
					});
				}
			},
			{
				xtype: 'spacer'
			},
			{
				xtype: 'button',
				text: 'Volgende',
				ui: 'forward',
				handler: function() {
					Ext.dispatch({
						controller: arcc.controllers.arccController,
						action: 'forward',
						origin: 'photocard'
					});
				}
			}		
		] // end toolbaritems
	}],	// end dockeditems
	listeners: {
		'activate': function () {
			updateRefreshButton();
		}
	}
})