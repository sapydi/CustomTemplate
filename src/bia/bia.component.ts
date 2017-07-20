/// <reference path="../index.ts" />

class PnBiaSDKViewerSampleController {

   private floorInfo: BiaSdk.api.IPnBiaFloor = BiaSdk.api.BiaContext.getBiaFloor(12, 1235, false);
   private biaCommunicationService: string = 'UtilizationCommunicationService';
   private biaConfig : BiaSdk.api.IPnBiaCanvasConfig;

   public $onInit(){
       this.biaConfig = BiaSdk.api.BiaContext.getBiaCanvasConfig();
       this.biaConfig.container = {
          width: '100%',
          height: '85%'
       }
   }

   public loadDrawing(): void {
      this.floorInfo = BiaSdk.api.BiaContext.getBiaFloor(12, 1235, false);
   }
}

class PnBiaSDKViewerSampleComponent implements ng.IComponentOptions {

   public controller = PnBiaSDKViewerSampleController;
   public controllerAs = 'biaSdkViwerCtrl';

   template: string = '<biaviewer bia-config="biaSdkViwerCtrl.biaConfig" floor-info = "biaSdkViwerCtrl.floorInfo" communication-service-name="biaSdkViwerCtrl.biaCommunicationService"></biaviewer>';

}

angular.module('unileverUSApp').component('biaSdkViwer', new PnBiaSDKViewerSampleComponent());
