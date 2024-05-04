// @ts-nocheck
sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "./model/models",
    "./controller/ErrorHandler",
  ],
  function (UIComponent, Device, models, ErrorHandler) {
    "use strict";

    return UIComponent.extend("sap.ui.demo.basicTemplate.Component", {
      metadata: {
        manifest: "json",
      },

      /**
       * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
       * @public
       * @override
       */
      init: function () {
        // call the base component's init function
        UIComponent.prototype.init.apply(this, arguments);
        // initialize the error handler with the component
        this._oErrorHandler = new ErrorHandler(this);
        // set the device model
        this.setModel(models.createDeviceModel(), "device");
        // set the FLP model
        this.setModel(models.createFLPModel(), "FLP");
        // create the views based on the url/hash
        this.getRouter().initialize();
        // set message model
        this.setModel(
          sap.ui.getCore().getMessageManager().getMessageModel(),
          "message"
        );
      },

      /**
       * The component is destroyed by UI5 automatically.
       * In this method, the ErrorHandler is destroyed.
       * @public
       * @override
       */
      destroy: function () {
        this._oErrorHandler.destroy();
        // call the base component's destroy function
        UIComponent.prototype.destroy.apply(this, arguments);
      },

      getContentDensityClass: function () {
        if (this._sContentDensityClass === undefined) {
          // check whether FLP has already set the content density class; do nothing in this case
          // @ts-ignore
          if (
            jQuery(document.body).hasClass("sapUiSizeCozy") ||
            jQuery(document.body).hasClass("sapUiSizeCompact")
          ) {
            this._sContentDensityClass = "";
          } else if (!Device.support.touch) {
            // apply "compact" mode if touch is not supported
            this._sContentDensityClass = "sapUiSizeCompact";
          } else {
            // "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
            this._sContentDensityClass = "sapUiSizeCozy";
          }
        }
        return this._sContentDensityClass;
      },
    });
  }
);
