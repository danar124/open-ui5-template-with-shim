sap.ui.define(
  [
    "./BaseController",
    "../model/formatter",
    "sap/m/library",
    "sap/ui/core/ValueState",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "thirdparty/moment/moment",
    "sap/ui/core/ws/WebSocket",
  ],
  /**
   * @param {typeof sap.ui.core.ValueState} ValueState
   * @param {typeof sap.ui.model.json.JSONModel} JSONModel
   */

  function (
    BaseController,
    formatter,
    mobileLibrary,
    ValueState,
    JSONModel,
    MessageToast,
    momentjs,
    WebSocket
  ) {
    "use strict";

    let bGlobalVar = true;
    let that = this;
    let oModel = {};
    let oTestModel = {};
    const PopinLayout = mobileLibrary.PopinLayout;

    return BaseController.extend("sap.ui.demo.basicTemplate.controller.Home", {
      formatter: formatter,
      onInit: function () {
        that = this;
        oModel = that.getModel();

        let aInput = [1, 2, 3, 4, 5];
        console.log(map(addValue1(), aInput));

        const ui5socket = new WebSocket("/sap/bc/apc/sap/yapc_demo");

        ui5socket.attachOpen(function (e) {
          MessageToast.show("Websocket connection openedd");
        });

        oModel.read("/TestSet", {
          success: function (oRetrievedResult) {
            oTestModel = new JSONModel(oRetrievedResult.results);
            that.setModel(oTestModel, "TestModel");
          },
          error: function (oError) {},
        });

        // Test Async
        async function myFunction() {
          return that.testFunction();
        }

        // @ts-ignore
        console.log(moment().format("MMM Do YY"));

        myFunction().then(
          function (value) {
            console.log("success");
          },
          function (error) {
            console.log("error");
          }
        );
      },

      map: function (a, b) {
        let aArray = [];
        b.forEach((item) => {
          aArray.push(a(item));
        });
      },

      addValue1: function (a) {
        return a + 1;
      },

      testFunction: function () {
        console.log(bGlobalVar);
      },

      onListItemPressed: function (oEvent) {
        var oItem, oCtx;
        oItem = oEvent.getSource();
        oCtx = oItem.getBindingContext("TestModel");
        this.getRouter().navTo("detail", {
          Bukrs: oCtx.getProperty("Bukrs"),
          Belnr: oCtx.getProperty("Belnr"),
          Gjahr: oCtx.getProperty("Gjahr"),
        });
      },

      onPopinLayoutChanged: function () {
        var oTable = this.byId("idDocumentList");
        var oComboBox = this.byId("idPopinLayout");
        var sPopinLayout = oComboBox.getSelectedKey();
        switch (sPopinLayout) {
          case "Block":
            oTable.setPopinLayout(PopinLayout.Block);
            break;
          case "GridLarge":
            oTable.setPopinLayout(PopinLayout.GridLarge);
            break;
          case "GridSmall":
            oTable.setPopinLayout(PopinLayout.GridSmall);
            break;
          default:
            oTable.setPopinLayout(PopinLayout.Block);
            break;
        }
      },
    });
  }
);
