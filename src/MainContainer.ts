class MainContainer extends egret.DisplayObjectContainer {

  public constructor() {
    super();
    this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
  }

  private nineImgContainer: NineImgContainer

  private onAddToStage(event: egret.Event) {

    egret.lifecycle.addLifecycleListener((context) => {
      // custom lifecycle plugin

      context.onUpdate = () => {
        console.log('hello,world onUpdate')
      }
    })

    egret.lifecycle.onPause = () => {
      egret.ticker.pause();
    }

    egret.lifecycle.onResume = () => {
      egret.ticker.resume();
    }

    //初始化Resource资源加载库
    //initiate Resource loading library
    RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
    RES.loadConfig("resource/default.res.json", "resource/");
  }

  /**
   * 配置文件加载完成,开始预加载preload资源组。
   * configuration file loading is completed, start to pre-load the preload resource group
   */
  private onConfigComplete(event: RES.ResourceEvent): void {
    RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
    RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
    RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
    RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
    RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
    RES.loadGroup("preload");
  }

  /**
   * preload资源组加载完成
   * Preload resource group is loaded
   */
  private onResourceLoadComplete(event: RES.ResourceEvent) {
    if (event.groupName == "preload") {
      // this.stage.removeChild(this.loadingView);
      RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
      RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
      RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
      RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
      this.createGameScene();
    }
  }

  /**
   * 资源组加载出错
   *  The resource group loading failed
   */
  private onItemLoadError(event: RES.ResourceEvent) {
    console.warn("Url:" + event.resItem.url + " has failed to load");
  }

  /**
   * 资源组加载出错
   *  The resource group loading failed
   */
  private onResourceLoadError(event: RES.ResourceEvent) {
    //TODO
    console.warn("Group:" + event.groupName + " has failed to load");
    //忽略加载失败的项目
    //Ignore the loading failed projects
    this.onResourceLoadComplete(event);
  }

  /**
   * preload资源组加载进度
   * Loading process of preload resource group
   */
  private onResourceProgress(event: RES.ResourceEvent) {
    if (event.groupName == "preload") {
      // this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
    }
  }

  private textfield: egret.TextField;

  /**
   * 创建游戏场景
   * Create a game scene
   */
  private createGameScene() {
    this.nineImgContainer = new NineImgContainer();
    let stageW = this.stage.stageWidth;
    let stageH = this.stage.stageHeight;
    this.nineImgContainer.y = (stageH - stageW) / 2
    this.stage.addChild(this.nineImgContainer);
  }

  /**
   * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
   * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
   */
  private createBitmapByName(name: string) {
    let result = new egret.Bitmap();
    let texture: egret.Texture = RES.getRes(name);
    result.texture = texture;
    return result;
  }
}
