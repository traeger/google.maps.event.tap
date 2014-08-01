LongTap and LongPress Events
=====================
Adds LongTap and LongPress Events for the Google Maps API.

```
maps_enable_longtapevent(map, 300);  // longtab will be triggered after 300ms
google.maps.event.addListener(map, "longtap", function(event) {
  // do things on longtab
});
```
