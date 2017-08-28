class ImgBlock extends egret.Sprite {

  public constructor(imgName: string, size: number, pos: number, correctPos: number) {
    super();
    this.img = this.createBitmapByName(imgName);
    this.img.width = size;
    this.img.height = size;
    this.pos = pos
    this.correctPos = correctPos
    this.size = size
    this.createView();
  }

  set pos(pos: number){
    this._pos = pos
    this.posChanged()
  }

  get pos() {
    return this._pos
  }

  get isCorrect(): boolean {
    return this.pos === this.correctPos
  }

  private img: egret.Bitmap

  private size: number

  private _pos: number

  private correctPos: number

  private createView(): void {
    this.addChild(this.img)
    this.posChanged()
  }

  private posChanged() {
    switch (this._pos) {
      case 1: 
        this.x = 0
        this.y = 0
      break;
      case 2: 
        this.x = this.size
        this.y = 0
      break;
      case 3: 
        this.x = this.size * 2
        this.y = 0
      break;
      case 4: 
        this.x = 0
        this.y = this.size
      break;
      case 5: 
        this.x = this.size
        this.y = this.size
      break;
      case 6: 
        this.x = this.size * 2
        this.y = this.size
      break;
      case 7: 
        this.x = 0
        this.y = this.size * 2
      break;
      case 8: 
        this.x = this.size
        this.y = this.size * 2
      break;
      case 9: 
        this.x = this.size * 2
        this.y = this.size * 2
      break;
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
}
