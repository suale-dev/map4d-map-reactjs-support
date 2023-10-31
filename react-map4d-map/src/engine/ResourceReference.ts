export abstract class ResourceReference {

  private _reference : number

  protected constructor(){
    this._reference = 0
  }

  protected abstract destroy(): void

  retain() : void {
    ++this._reference
  }

  release(): void {
    --this._reference
    if (this._reference <= 0) {
      this.destroy()
    }
  }

  get reference(): number {
    return this._reference
  }
}
