var SceneUpdate = BaseScene.extend(/** @lends SceneUpdate# */{
    /** @type {ccui.LoadingBar}*/
    loadingBar: null,
    /** @type {ccui.Text}*/
    txtPercent: null,
    /** @type {ccui.LoadingBar}*/
    loadingBarTotal: null,
    /** @type {ccui.Text}*/
    txtPercentTotal: null,
    /** @type {UpdateResource}*/
    updateResource: null,

    /** @type {ccui.Text}*/
    txtStatus: null,

    ctor: function(){
        this._super(res.scene_update);
        this.updateResource = new UpdateResource();
        this.updateResource.addListenUI(this.updateCb.bind(this))
    },
    onEnter: function(){
        this._super();
        this.txtPercent.setString(".../...");
        this.loadingBar.setPercent(0);
        this.txtStatus.setString(langMgr.getStr(lang.UPDATE_PREDOWNLOAD_VERSION))
    },
    onEnterTransitionDidFinish: function(){
        this._super();
        this.updateResource.update();
    },
    /**
     *
     * @param event {jsb.EventAssetsManager}
     * @param state {AssetsManager.State}
     */
    updateCb: function(event, state){
        // return;
        var needRestart = false;
        var failed = false;
        switch(event.getEventCode()){
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                //can down lai file manifest hoac van chayj version cu
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                this.loadingBar.setPercent(event.getPercent());
                // this.loadingBarTotal.setPercent(event.getDownloadedBytes());
                this.txtPercent.setString(event.getPercentByFile() + "/100");
                // this.txtPercentTotal.setString(event.getDownloadedBytes() +" / " + event.getTotalFiles());
                cc.log("Byte progression:" + event.getPercent() / 100);
                cc.log("File progression:" + event.getPercentByFile() / 100);
                // this.panel.byteProgress.progress = event.getPercent();
                // this.panel.fileProgress.progress = event.getPercentByFile();
                //
                // this.panel.fileLabel.string = event.getDownloadedFiles() + ' / ' + event.getTotalFiles();
                // this.panel.byteLabel.string = event.getDownloadedBytes() + ' / ' + event.getTotalBytes();
                //
                // var msg = event.getMessage();
                // if (msg) {
                //     this.panel.info.string = 'Updated file: ' + msg;
                //     // cc.log(event.getPercent()/100 + '% : ' + msg);
                // }
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            //state bi loi
            //khong the tien hanh down load manifest, hoac bi loi download
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                Log.debug('Fail to download manifest file, hot update skipped.');
                failed = true;
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                cc.director.runScene(new HelloWorldScene());
                Log.debug('Already up to date with the latest remote version.');
                failed = true;
                cc.director.runScene(new SceneLoading());
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                Log.debug('Update finished. ' + event.getMessage());
                this.txtPercent.setString("100/100");
                this.txtPercentTotal.setString("100/100");
                this.loadingBarTotal.setPercent(100);
                this.loadingBar.setPercent(100);
                setTimeout(function(){
                    Log.debug("game restart");
                    cc.game.restart();
                }, 0);
                // cc.director.runScene(new SceneLoading());
                // _.delay(function(){
                //     Log.debug("game restart");
                //     cc.game.restart();
                // },1);
                needRestart = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                Log.debug('Update failed. ' + event.getMessage());
                this._updating = false;
                this._canRetry = true;
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                Log.debug('Asset update error: ' + event.getAssetId() + ', ' + event.getMessage());
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                Log.debug(event.getMessage());
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                // Log.debug(JSON.stringify(this._am.getRemoteManifest().getKey()));
                // Log.debug('new version found: ' + event.getAssetId() + ', ' + event.getMessage());
                // this._am.update();
                break;
            default:
                break;
        }
        if(failed){
            // this._am.setEventCallback(null);
            // this._updateListener = null;
            this._updating = false;
        }
        if(needRestart){
            // cc.eventManager.removeListener(this._listener);
            // this._am.setEventCallback(null);
            // this._updateListener = null;
            // Prepend the manifest's search path
            // var searchPaths = jsb.fileUtils.getSearchPaths();
            // var newPaths = this._am.getLocalManifest().getSearchPaths();
            // console.log(JSON.stringify(newPaths));
            // Array.prototype.unshift.apply(searchPaths, newPaths);
            // This value will be retrieved and appended to the default search path during game startup,
            // please refer to samples/js-tests/main.js for detailed usage.
            // !!! Re-add the search paths in main.js is very important, otherwise, new scripts won't take effect.
            // cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
            // jsb.fileUtils.setSearchPaths(searchPaths);
            // cc.audioEngine.stopAll();
            // cc.game.restart();
        }
    },
    onExit: function(){
        this._super();
        this.updateResource.clean();
    }
});