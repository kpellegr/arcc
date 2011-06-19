arcc.views.DetailForm = Ext.extend(Ext.form.FormPanel, {
	id: 'sendForm',
	scroll: 'vertical',
	standardSubmit : false,
	//componentCls: 'white_form',
	items: [
		{
			// Fieldset to get company information
			xtype: "fieldset",
			title: "Bedrijfsinfo",
			defaults: {
				required: true,
				labelAlign: "left",
				labelWidth: "35%",
				useClearIcon: true
			},
			items: [
				{
					xtype: "textfield",
					name : "naam",
					label: "Naam",
					id: "naam",      
					autoCapitalize : true
				}, {
					xtype: "textfield",
					name : "functie",
					label: "Functie",
					id: "functie",                     
					autoCapitalize : true
				}, {
					xtype: "textfield",
					name : "bedrijf",
					label: "Bedrijf",
					id: "bedrijf", 
					autoCapitalize : true
				}, {
					xtype: "emailfield",
					name : "email",
					label: "Email",
					id: "email", 
				}
			]
		},
		{
			// Fieldset for operator selection
			xtype: "fieldset",
			title: "Mobiele operator",
			defaults: { 
				xtype: "checkboxfield",
				labelWidth: "35%", 
			},
			items: [
				{name : "Base", label: "Base", id: "Base", value: true},
				{name : "Belgacom",	label: "Belgacom", id: "Belgacom", value: true},
				{name : "Mobistar",	label: "Mobistar", id: "Mobistar", value: true},
				{name : "Andere", label: "Andere", id: "Andere", value: true}
			]
		},
		{
			// Fieldset to get fleet information
			xtype: "fieldset",
			title: "Bedrijfspark",
			defaults:{
				labelAlign: "left",
				labelWidth: "35%",
				useClearIcon: true
			},
			items: [
				new Ext.form.Spinner({
					value: 0,
					minValue: 0,
					name: "aantal_gsms",
					label: "GSM's",
					id: "aantal_gsms"
				}),
				new Ext.form.Spinner({
					value: 0,
					minValue: 0,
					name: "aantal_wagens",
					label: "Wagens",
					id: "aantal_wagens",
					required: true,
				}),
				{
				   xtype : "textareafield",
				   name  : "commentaar",
				   label : "Opmerkingen",
				   id: "commentaar",
				   maxLength : 150,
				   maxRows : 10
				}
			]
		}
	],
	listeners : {
		submit : function(form, result){
			console.log("success", Ext.toArray(arguments));
		},
		exception : function(form, result){
		}
	},
	dockedItems: [{
		xtype: "toolbar",
		dock: "bottom",
		items: [
			{
				xtype: 'button',
				text: 'Wissen',
				ui: 'light',
				handler: function() {
					arcc.views.detailForm.reset();
				}
			},
			{
				xtype: 'spacer'
			},
			{
				xtype: 'button',
				text: "Verzenden",
				ui: "confirm",
				handler: function() {
					console.log(arcc.views.detailForm.getValues());
					var model = Ext.ModelMgr.create(arcc.views.detailForm.getValues(),'arcc.models.Request');
					var errors = model.validate(), message = "";
					
					if(errors.isValid()) {
						arcc.stores.requestStore.add(model);
						arcc.stores.requestStore.sync();

						uploadAndMail();
						arcc.views.detailForm.reset();
						arcc.views.viewport.setActiveItem(arcc.views.photoCard), {type:'slide', direction:'right'};
					}
					else {
						Ext.each(errors.items,function(rec,i){
							message += rec.message+"<br>";
						});
						Ext.Msg.alert("Controleer even:", message, function(){});
						return false;						
					}
				}
			}		
		] // end toolbaritems
	}]	// end dockeditems
}); // end detailsform	