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
				xtype: "numberfield",
				labelAlign: "left",
				labelWidth: "35%",
				useClearIcon: true,
				value: 0,
				minValue: 0
			},
			items: [ 
				{
					name: "aantal_gsms",
					label: "GSM's",
					id: "aantal_gsms",
					required: true,
				},
				{
					name: "aantal_wagens",
					label: "Wagens",
					id: "aantal_wagens",
					required: true,
				},
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
	dockedItems: [{
		xtype: 'toolbar',
		dock: 'bottom',
		items: [
			{
				xtype: 'button',
				text: 'Wissen',
				ui: 'light',
				handler: function() {
					Ext.dispatch({
						controller: arcc.controllers.arccController,
						action: 'resetForm',
						origin: 'detailForm'
					});
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
					Ext.dispatch({
						controller: arcc.controllers.arccController,
						action: 'submit',
						origin: 'detailForm'
					});
				}
			}		
		] // end toolbaritems
	}]	// end dockeditems
}); // end detailsform	