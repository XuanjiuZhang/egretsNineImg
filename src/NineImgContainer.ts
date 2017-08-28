class NineImgContainer extends egret.DisplayObjectContainer {

  public constructor() {
    super();
    this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
  }

  private onAddToStage(event: egret.Event) {
    this.createGameScene();
  }

  /**
   * 创建图片九宫格
   * Create a game scene
   */
  private createGameScene() {
    let stageW = this.stage.stageWidth;
    let size = stageW / 3

    this.posGroup = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    // const shuffledPos = _.shuffle(this.posGroup)

    this.blocksGroup = []

    for (let i = 0; i < 8; i++) {
      let posNumber = i + 1
      let block = new ImgBlock(`scene_${posNumber}_jpg`, size, this.posGroup[i], posNumber)
      this.addChild(block)
      block.touchEnabled = true
      //注册事件
      block.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTouch, this )
      this.blocksGroup.push(block)
    } 

    for (let i = 0; i < 100; i++) {
      this.shuffleBlocks()
    }

  }

  private blocksGroup: Array<ImgBlock>

  private posGroup: Array<number>

  private activePosMapping(emptyPos: number): Array<number> {
    switch (emptyPos) {
      case 1:
        return [2, 4]
      case 2: 
        return [1, 3, 5]
      case 3: 
        return [2, 6]
      case 4: 
        return [1, 7, 5]
      case 5: 
        return [2, 4, 6, 8]
      case 6: 
        return [3, 5, 9]
      case 7: 
        return [4, 8]
      case 8: 
        return [5, 7, 9]
      case 9: 
        return [6, 8]
    }
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

  private isComplete(): boolean {
    return this.blocksGroup.every(block => block.isCorrect)
  }

  private getEmptyPos(): number {
    const posArr = this.blocksGroup.map(block => block.pos)
    const emptyPos = this.posGroup.filter(pos => {
      return posArr.every(exist => exist !== pos)
    })
    return emptyPos[0]
  }

  private onTouch(evt: egret.TouchEvent) {
    console.log(evt.target.pos)
    const currentClick = evt.target.pos
    const emptyPos = this.getEmptyPos()
    const activePos = this.activePosMapping(emptyPos)
    if (activePos.some(active => active === currentClick)) {
      evt.target.pos = emptyPos
      if (this.isComplete()) {
        console.log('you win!')
      }
    }
  }

  private shuffleBlocks(): void {
    const emptyPos = this.getEmptyPos()
    const activePos = this.activePosMapping(emptyPos)
    const movedPos = _.shuffle(activePos)[0]
    const movedBlock = _.find(this.blocksGroup, function(block) {
      return block.pos === movedPos
    })
    movedBlock.pos = emptyPos
    console.log(movedBlock.pos)
  }
}
