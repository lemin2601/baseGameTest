var SceneLoading = BaseScene.extend({
    ctor: function(){
        this._super(res.scene_loading);
    },
    onEnterTransitionDidFinish: function(){
        Log.debug("sceneLoading enter");
        cc.director.runScene(new SceneMenu());
    }
});