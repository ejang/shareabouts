L.LabelOverlay = L.Class.extend({
  initialize: function( latLng, label, options) {
    this._latlng = latLng;
    this._label = label;
    L.Util.setOptions(this, options);
  },
  options: {
    offset: new L.Point(0, 44)
  },
  onAdd: function(map) {
    this._map = map;
    if (!this._container) {
        this._initLayout();
    }
    map.getPanes().popupPane.appendChild(this._container);
    this._contentNode.innerHTML = this._label;
    map.on('viewreset', this._reset, this);
    this._opened = true;
    this._reset();
  },
  onRemove: function(map) {
    map.getPanes().popupPane.removeChild(this._container);
    map.off('viewreset', this._reset, this);
    this._opened = false;
  },
  _reset: function() {
    var pos = this._map.latLngToLayerPoint(this._latlng);
    var op = new L.Point(pos.x + this.options.offset.x, pos.y - this.options.offset.y);
    L.DomUtil.setPosition(this._container, op);
  },
  _initLayout: function() {
    this._container = L.DomUtil.create('div', 'shareabouts-label-overlay');
    
    this._tipContainer = L.DomUtil.create('div', 'shareabouts-label-overlay-tip-container', this._container);
		this._tip = L.DomUtil.create('div', 'shareabouts-label-overlay-tip', this._tipContainer);
		
		this._contentNode = L.DomUtil.create('div', 'shareabouts-label-overlay-content', this._container);
  }
});