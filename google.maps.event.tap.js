/*
 * Tap and Longpress support for the Google Maps API
 *
 * Licensed under The MIT License (MIT)
 * Copyright (c) 2014 Marco Träger <marco.traeger at googlemail.com>
 *
 */
var maps_enable_longtapevent;
new function() { /* private scope */
  var LongPress = function(map, min_downtime) {
    var self = this;
    
    self.min_downtime = min_downtime;
    self.isDragging = false;
    self.map = map;
    google.maps.event.addListener(map, 'touchstart', function(e) {
      self.__onMouseDown(e);
    });
    google.maps.event.addListener(map, 'touchend', function(e) {
      self.__onMouseUp(e);
    });
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
    var now = +new Date;
    if (!this.isDragging && now - this.downTime > this.min_downtime) {
      google.maps.event.trigger(this.map, 'longtap', e);
    }
  }
  LongPress.prototype.__onMouseDown = function() {
    this.downTime = +new Date;
    this.isDragging = false;
  }
  LongPress.prototype.__onMapDrag = function(e) {
    this.isDragging = true;
  };
  
  /* outer scope access */
  maps_enable_longtapevent = function(map, min_downtime) {
    new LongPress(map, min_downtime); /* register the handler for the map */
  }
}