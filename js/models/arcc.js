Ext.regModel("arcc.models.Request", {
	fields: [
		{name: "id",			type: "int"},
		{name: "naam",          type: "string"},
		{name: "functie",       type: "string"},
		{name: "bedrijf",       type: "string"},
		{name: "email",         type: "string"},
		{name: "Base",          type: "boolean"},
		{name: "Belgacom",      type: "boolean"},
		{name: "Mobistar",      type: "boolean"},
		{name: "Andere",        type: "boolean"},
		{name: "aantal_gsms",   type: "int"},
		{name: "aantal_wagens", type: "int"},
		{name: "commentaar",    type: "string"},
		{name: "image",         type: "binary"}
	], validations: [
		{type: 'presence', name: 'naam', message:"Gelieve een naam op te geven"},
		{type: 'presence', name: 'functie', message : "Gelieve een functie in te geven"},
		{type: 'presence', name: 'bedrijf', message : "Gelieve een bedrijf in te geven"},
		{type: 'presence', name: 'aantal_gsms', message : "Gelieve het aantal gsms in te geven"},
		{type: 'presence', name: 'aantal_wagens', message : "Gelieve het aantal wagens te geven"},
		{type: 'format',   name: 'email', matcher: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message:"Verkeerd emailadres"},
	]
});
 
arcc.stores.requestStore = new Ext.data.Store({
	autoLoad: true,
	model: 'arcc.models.Request',
	proxy: {
		type: 'localstorage',
		id  : 'arccrequest'
	}
});
