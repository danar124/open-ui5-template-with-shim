sap.ui.define(
  [
    "sap/ui/demo/basicTemplate/controller/BaseController"
  ],
  function (BaseController) {
    "use strict";
    return BaseController.extend(
      "sap.ui.demo.basicTemplate.controller.Detail", {
        onInit: function () {
          let oRouter = this.getRouter();
          oRouter.getRoute("detail").attachMatched(this._onRouteMatched, this);
        },
        _onRouteMatched: function (oEvent) {
          let oArgs, oView;
          oArgs = oEvent.getParameter("arguments");
          oView = this.getView();
          let oModel = this.getModel();

          const path = oModel.createKey("/TestSet", {
            Bukrs: oArgs.Bukrs,
            Belnr: oArgs.Belnr,
            Gjahr: oArgs.Gjahr,
          });

          oView.bindElement({
            path: path,
            events: {
              change: this._onBindingChange.bind(this),
              dataRequested: function (oEvent) {
                oView.setBusy(true);
              },
              dataReceived: function (oEvent) {
                oView.setBusy(false);
              },
            },
          });

          console.log(moment().format('MMM Do YY'))
        },
        _onBindingChange: function (oEvent) {
          // No data for the binding
          if (!this.getView().getBindingContext()) {
            this.getRouter().getTargets().display("notFound");
          }
        },
      }
    );
  }
);