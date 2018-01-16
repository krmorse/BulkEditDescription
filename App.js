Ext.define('CustomApp', {
  extend: 'Rally.app.App',
  componentCls: 'app',
  requires: [
    'BulkEditDialogOverride'
  ],

  modelNames: ['hierarchicalrequirement'],

  launch: function () {
    Ext.create('Rally.data.wsapi.TreeStoreBuilder').build({
      models: this.modelNames,
      autoLoad: false,
      enableHierarchy: true
    }).then({
      success: this._onStoreBuilt,
      scope: this
    });
  },

  _onStoreBuilt: function (store) {
    var context = this.getContext();
    this.add({
      xtype: 'rallygridboard',
      context: context,
      modelNames: this.modelNames,
      toggleState: 'grid',
      stateful: false,
      plugins: [
        {
          ptype: 'rallygridboardinlinefiltercontrol',
          inlineFilterButtonConfig: {
            stateful: true,
            stateId: context.getScopedStateId('filters'),
            modelNames: this.modelNames,
            inlineFilterPanelConfig: {
              quickFilterPanelConfig: {
                defaultFields: [
                  'ArtifactSearch',
                  'Owner',
                  'ModelType'
                ]
              }
            }
          }
        }
      ],
      gridConfig: {
        store: store,
        columnCfgs: [
          'Name',
          'ScheduleState',
          'Owner'
        ]
      },
      height: this.getHeight()
    });
  }
});
