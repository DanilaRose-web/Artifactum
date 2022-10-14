import CropSettings from '../../api/dataSource/api/Tirscript/ImageResizer/Models/CropSettings';

export default class ModelSaveImageRequest {
    ImageBase64: string;
	OriginalFileName: string;
    CropSettings: CropSettings;
    
   private  getBase64(target:string):string{
        return target.substring(target.indexOf('base64')+7)
    }

    constructor(ImageBase64: string, OriginalFileName: string, CropSettings: CropSettings) {
        this.ImageBase64 = this.getBase64(ImageBase64);
        this.OriginalFileName = OriginalFileName;
        this.CropSettings = CropSettings
        
    }
}