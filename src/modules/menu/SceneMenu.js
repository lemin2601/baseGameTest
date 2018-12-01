var SceneMenu = BaseScene.extend({
    btnFacebook:null,
    btnUpdate:null,
    btnPlay:null,

    ctor: function(){
        this._super(res.scene_menu);
    },
    onEnterTransitionDidFinish: function(){
        this._super();
        Log.debug("enter scene Menu");
        popups.showMessage(lang.UPDATE_PREDOWNLOAD_VERSION);
        popups.showMessage(lang.UPDATE_DOWNLOADING_MANIFEST);
        popups.showMessage(lang.UPDATE_FAIL_TO_UPDATE);
    },

    onTouchBegan:function(sender){
        Log.debug("touch" + sender.getName());
        switch(sender){
            case this.btnUpdate:
                popups.showMessage(lang.UPDATE_PREDOWNLOAD_VERSION);
                break;
            case this.btnPlay:
                cc.game.exit();
        }
    }
});