arcc.views.Viewport = Ext.extend(Ext.Panel, {
	fullscreen: true,
	layout: 'card',
	indicator: false,
	scroll:'vertical',
	
    initComponent: function() {
        //put instances of cards into arcc.views namespace
        Ext.apply(arcc.views, {
            photoCard: new arcc.views.PhotoCard(),
            detailForm: new arcc.views.DetailForm()
/*            detailForm1: new arcc.views.DetailForm1(),
            detailForm2: new arcc.views.DetailForm2()*/
        });

	    //put instances of cards into viewport
        Ext.apply(this, {
            items: [
				arcc.views.photoCard,
				arcc.views.detailForm,
/*				arcc.views.detailForm1,
				arcc.views.detailForm2*/
            ]
        });

		arcc.views.Viewport.superclass.initComponent.apply(this, arguments);
	}
});