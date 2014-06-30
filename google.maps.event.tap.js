/*
 * Tap and Longpress support for the Google Maps API
 *
 * Licensed under The MIT License (MIT)
 * https://github.com/traeger/google.maps.event.tap
 * Copyright (c) 2014 Marco Träger <marco.traeger at googlemail.com>
 *
 */
var maps_enable_longtapevent;
new function() { /* private scope */
  var LongPress = function(map, min_downtime) {
    this.min_downtime = min_downtime
    this.isDragging = false
    this.map = map
    this.timer = false
    
    var self = this
    google.maps.event.addListener(map, 'mousedown', function(e) {
      self.__onMouseDown(e);
    });
    google.maps.event.addListener(map, 'mouseup', function(e) {
      self.__onMouseUp(e);
    });
    google.maps.event.addListener(map, 'drag', function(e) {
      self.__onMapDrag(e);
    });
  }
  LongPress.prototype.__onMouseUp = function(e) {
    this.__cleartime()
  }
  LongPress.prototype.__onMouseDown = function(e) {
    this.latLng = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng())
    this.__cleartime()
    var self = this
    this.timer = setTimeout(function() {
      var event = new function() {}
      event.latLng = self.latLng
      self.__onLongPress(event)
    }, this.min_downtime);
  }
  LongPress.prototype.__onMapDrag = function(e) {
    this.__cleartime()
  }
  LongPress.prototype.__onLongPress = function(e) {
    this.__cleartime()
    google.maps.event.trigger(this.map, 'longtap', e);
  }
  LongPress.prototype.__cleartime = function() {
    if(!!this.timer) {
      window.clearTimeout(this.timer)
      this.timer = false
    }
  }
  
  /* outer scope access */
  maps_enable_longtapevent = function(map, min_downtime) {
    if(!!min_downtime) min_downtime = 500
    new LongPress(map, min_downtime); /* register the handler for the map */
  }
}