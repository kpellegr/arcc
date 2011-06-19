arcc.views.Viewport = Ext.extend(Ext.Carousel, {
	fullscreen: true,
	layout: {type:'panel'},
	indicator: false,
	scroll:'vertical',
	
    initComponent: function() {
        //put instances of cards into arcc.views namespace
        Ext.apply(arcc.views, {
            photoCard: new arcc.views.PhotoCard(),
            detailForm: new arcc.views.DetailForm()
        });
		arcc.views.photoCard.cls = 'card card1';
		arcc.views.detailForm.cls = 'card card2';

	    //put instances of cards into viewport
        Ext.apply(this, {
            items: [
				arcc.views.photoCard,
				arcc.views.detailForm
            ]
        });

		arcc.views.Viewport.superclass.initComponent.apply(this, arguments);
	}
});