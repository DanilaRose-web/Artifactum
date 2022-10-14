export default class ImagePreviewModel {
    Width: number;
    Height: number;
    Top: number;
    Left: number;
    ImageUrl: string;
    constructor(Width: number, Height: number, Top: number, Left: number, ImageUrl: string) {
        this.Width = this.Width,
        this.Height = this.Height,
        this.Top = Top,
        this.Left = Left,
        this.ImageUrl = ImageUrl
    }
}