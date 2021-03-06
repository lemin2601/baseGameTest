var BaseCocosStudio = cc.Class.extend({
    ctor: function(){
    },
    sync: function(node, res, deepChild){
        //create file

        var sceneRes = ccs.load(res, "res/"); // "res/" is base path, because when cocosstudio publish resource need that to convert right path
        node.addChild(sceneRes.node);
        sceneRes.node.runAction(sceneRes.action);
        sceneRes.action.gotoFrameAndPlay(0, true);
        //sync child
        this._syncChildren(node, sceneRes.node, 0, deepChild);
        //add event
    },
    _syncChildren: function(target, node, curDeep, maxDeep){
        if(curDeep >= maxDeep) return;
        var childs = node.getChildren();
        for(var i in childs){
            var child = childs[i];
            target[child.getName()] = child;
            this._handleListener(target, child);
            this._syncChildren(target, child, curDeep + 1, maxDeep);
        }
    },
    _touchEvent: function(sender, type){
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                this.onTouchBegan(sender);
                break;
            case ccui.Widget.TOUCH_MOVED:
                this.onTouchMoved(sender);
                break;
            case ccui.Widget.TOUCH_ENDED:
                this.onTouchEnded(sender);
                break;
            case ccui.Widget.TOUCH_CANCELED:
                this.onTouchCancelled(sender);
                break;
            default:
                break;
        }
    },
    _handleListener: function(target, child){
        if(child instanceof ccui.Button){
            child.addTouchEventListener(this._touchEvent, target)
        }
    }
});
/** @type {BaseCocosStudio}*/
BaseCocosStudio.Instance = new BaseCocosStudio();
