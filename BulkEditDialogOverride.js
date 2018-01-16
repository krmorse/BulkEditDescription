Ext.define('BulkEditDialogOverride', {
  override: 'Rally.ui.dialog.BulkEditDialog',

  _fieldIsBulkEditable: function (field) {
    var fieldDefAttr = field.attributeDefinition;
    return field.editor &&
      !field.readOnly &&
      !field.hidden &&
      !field.isMappedFromArtifact &&
      ((fieldDefAttr.AttributeType === 'OBJECT' && fieldDefAttr.Constrained) || !_.contains(['COLLECTION'], fieldDefAttr.AttributeType)) &&
      this._fieldCanBeEditedForAllRecords(field);
  }
});
