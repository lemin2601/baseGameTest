var BaseScene = cc.Scene.extend(/** @lends BaseScene# */{
    /**
     * example: "res/ui/Scene.json"
     * @param pathJson
     * @param deepChildren => do sau cua node de matching variable defined
     */
    ctor: function(pathJson, deepChildren){
        this._super();
        if(pathJson === undefined){
            Log.error("miss path json ui to load scene");
            return;
        }
        BaseCocosStudio.Instance.sync(this, pathJson, deepChildren);
    },
    onTouchBegan:function(sender){

    },
    onTouchMoved:function(sender){

    },
    onTouchEnded:function(sender){

    },
    onTouchCancelled:function(sender){

    }
});