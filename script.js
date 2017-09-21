  		    $(function () {
  		    	$("#accordion").accordion({
  		    		heightStyle : "fill"
  		    	});
  		    });

  		    $(function () {
  		    	$("#accordion").resizable({
  		    		minHeight : 140,
  		    		minWidth : 200,
  		    		resize : function () {
  		    			$("#accordion").accordion("refresh");
  		    		}
  		    	});
  		    });

  		    $(function () {
  		    	$("#sortable").sortable(
  		    		// placeholder: "ui-state-highlight"
  		    	);
  		    	$("#sortable").disableSelection();
  		    });

  		    var listLength = $("#sortable")[0].children.length;

  		    $("#sortable").on("sortupdate", function (event, ui) {
  		    	granicaLayer.setZIndex(listLength - $('#li1').index());
  		    	warstwiceLayer.setZIndex(listLength - $('#li8').index());
  		    	landuseLayer.setZIndex(listLength - $('#li6').index());
  		    	shadeLayer.setZIndex(listLength - $('#li7').index());
  		    	wodyLayer.setZIndex(listLength - $('#li4').index());
  		    	wodyLasyLayer.setZIndex(listLength - $('#li5').index());
  		    	roadsLayer.setZIndex(listLength - $('#li3').index());
  		    	buildingLayer.setZIndex(listLength - $('#li2').index());
  		    	demLayer.setZIndex(listLength - $('#li9').index());
  		    	slopeLayer.setZIndex(listLength - $('#li10').index());
				wig25k.setZIndex(listLength - $('#li11').index());

  		    });

  		   

  		    var crs = new L.Proj.CRS('EPSG:2180',
  		    		'+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs', {
  		    		resolutions : [
  		    			8192, 4096, 2048, 1024, 512, 256, 128,
  		    			64, 32, 16, 8, 4, 2, 1, 0.5
  		    		],
  		    		origin : [0, 0]
  		    	}),
  		    map = new L.Map('map', {
  		    		crs : crs,
  		    		continuousWorld : true,
  		    		worldCopyJump : false,
  		    		maxBounds : [[51.90509, 19.43993], [51.79205, 19.78813]],
					
				  contextmenu: true,
				  contextmenuWidth: 140,
				  contextmenuItems: [{
					  text: 'Współrzędne punktu',
					  callback: showCoordinates
				  }, {
					  text: 'Wycentruj mapę',
					  callback: centerMap
				  }, '-',
				  {
					  text: 'Ekwidystant',
					  icon: 'images/eq.png',
					  callback: addBuffer
				  }, {
					  text: 'Zresetuj mapę',
					  callback: mapReset
					  }]     
				  
  		    	});

  		    map.setView([51.83713, 19.59949], 10);
			
			
			
					
			  function showCoordinates (e) {
				  alert(e.latlng.lat +' '+ e.latlng.lng);
			  }

			  function centerMap (e) {
				  map.panTo(e.latlng);
			  }

			  function zoomIn (e) {
				  map.zoomIn();
			  }

			  function zoomOut (e) {
				  map.zoomOut();
			  };
			  
			  function addBuffer (e) {	
			  var radius = e.accuracy / 2;
	        
	       	  var b = document.getElementById("b").value; 
				

			  var lr = new   L.circle(e.latlng, b, {
					color: 'red',
					fillColor: 'red',
					fillOpacity: 0.3,
					stroke: false

				}).addTo(map);
			  var mr = new    L.circle(e.latlng, b*0.66, {
					color: 'yellow',
					fillColor: 'yellow',
					fillOpacity: 0.3,
					stroke: false
				}).addTo(map);
			 var sr = new     L.circle(e.latlng, b*0.33, {
					color: 'green',
					fillColor: 'green',
					fillOpacity: 0.3,
					stroke: false,
					zIndex: -2
				}).addTo(map);
				
		     var sr = new  L.circle(e.latlng, 1, {
					color: 'blue',
					fillColor: 'blue',
					fillOpacity: 0.5,
					stroke: false,
					zIndex: -2
				}).addTo(map);
					
			  }
			  
			  function  mapReset () {			
					location.reload()
			  }
			

/*   		    test1 = L.tileLayer.wms('http://92.63.57.131:8089/qgis/qgis_mapserv.fcgi.exe?map=c:/PKWL/pkwl.qgs', {
  		    		layers : 'Park Granica',
  		    		format : 'image/png',
  		    		transparent : true,
  		    		continuousWorld : true,
  		    	});

  		    var granicaLayer = new L.tileLayer.wms('http://92.63.57.131:8089/qgis/qgis_mapserv.fcgi.exe?map=c:/PKWL/pkwl.qgs', {
  		    		layers : 'Park Granica',
  		    		format : 'image/png',
  		    		maxZoom : 20,
  		    		minZoom : 10,
  		    		transparent : true,
  		    		continuousWorld : true,
  		    	}).addTo(map).setZIndex(listLength - $('#li1').index() + 2);

  		    var warstwiceLayer = new L.tileLayer.wms('http://92.63.57.131:8089/qgis/qgis_mapserv.fcgi.exe?map=c:/PKWL/pkwl.qgs', {
  		    		layers : 'warstwice_125',
  		    		format : 'image/png',
  		    		maxZoom : 20,
  		    		minZoom : 15,
  		    		transparent : true,
  		    		continuousWorld : true,
  		    	}).addTo(map).setZIndex(listLength - $('#li8').index() + 2);

  		    var landuseLayer = new L.tileLayer.wms('http://92.63.57.131:8089/qgis/qgis_mapserv.fcgi.exe?map=c:/PKWL/pkwl.qgs', {
  		    		layers : 'landuse',
  		    		format : 'image/png',
  		    		maxZoom : 20,
  		    		minZoom : 10,
  		    		transparent : true,
  		    		continuousWorld : true,
  		    	}).addTo(map).setZIndex(listLength - $('#li6').index() + 2);

  		    var shadeLayer = new L.tileLayer.wms('http://92.63.57.131:8089/qgis/qgis_mapserv.fcgi.exe?map=c:/PKWL/pkwl.qgs', {
  		    		layers : 'shade',
  		    		format : 'image/png',
  		    		maxZoom : 15,
  		    		minZoom : 10,
  		    		transparent : true,
  		    		continuousWorld : true,
  		    	}).addTo(map).setZIndex(listLength - $('#li7').index() + 2);

  		    var wodyLayer = new L.tileLayer.wms('http://92.63.57.131:8089/qgis/qgis_mapserv.fcgi.exe?map=c:/PKWL/pkwl.qgs', {
  		    		layers : 'wody',
  		    		format : 'image/png',
  		    		maxZoom : 20,
  		    		minZoom : 10,
  		    		transparent : true,
  		    		continuousWorld : true,
  		    	}).addTo(map).setZIndex(listLength - $('#li4').index() + 2);

  		    var wodyLasyLayer = new L.tileLayer.wms('http://92.63.57.131:8089/qgis/qgis_mapserv.fcgi.exe?map=c:/PKWL/pkwl.qgs', {
  		    		layers : 'wodalasy',
  		    		format : 'image/png',
  		    		maxZoom : 20,
  		    		minZoom : 10,
  		    		transparent : true,
  		    		continuousWorld : true,
  		    	}).addTo(map).setZIndex(listLength - $('#li5').index() + 2);

  		    var roadsLayer = new L.tileLayer.wms('http://92.63.57.131:8089/qgis/qgis_mapserv.fcgi.exe?map=c:/PKWL/pkwl.qgs', {
  		    		layers : 'roads',
  		    		format : 'image/png',
  		    		maxZoom : 20,
  		    		minZoom : 10,
  		    		transparent : true,
  		    		continuousWorld : true,
  		    	}).addTo(map).setZIndex(listLength - $('#li3').index() + 2);

  		    var buildingLayer = new L.tileLayer.wms('http://92.63.57.131:8089/qgis/qgis_mapserv.fcgi.exe?map=c:/PKWL/pkwl.qgs', {
  		    		layers : 'building',
  		    		format : 'image/png',
  		    		maxZoom : 20,
  		    		minZoom : 10,
  		    		transparent : true,
  		    		continuousWorld : true,
  		    	}).addTo(map).setZIndex(listLength - $('#li2').index() + 2);

  		    var demLayer = new L.tileLayer.wms('http://92.63.57.131:8089/qgis/qgis_mapserv.fcgi.exe?map=c:/PKWL/pkwl.qgs', {
  		    		layers : 'dem',
  		    		format : 'image/png',
  		    		maxZoom : 20,
  		    		minZoom : 10,
  		    		transparent : true,
  		    		continuousWorld : true,
  		    	}).addTo(map).setZIndex(listLength - $('#li9').index() + 2).setOpacity(0.5);

  		    var slopeLayer = new L.tileLayer.wms('http://92.63.57.131:8089/qgis/qgis_mapserv.fcgi.exe?map=c:/PKWL/pkwl.qgs', {
  		    		layers : 'nachylenie2',
  		    		format : 'image/png',
  		    		maxZoom : 20,
  		    		minZoom : 10,
  		    		transparent : true,
  		    		continuousWorld : true,
  		    	}).setZIndex(listLength - $('#li10').index() + 2).setOpacity(0.3); */
				
			
  		    var wig25k = new L.tileLayer.wms('http://wms.hgis.cartomatic.pl/topo/4326/m25k?service=WMS&request=GetCapabilities', {
  		    		layers : 'wig25k',
  		    		format : 'image/png',
  		    		maxZoom : 20,
  		    		minZoom : 10,
  		    	}).setZIndex(listLength - $('#li11').index() + 2).setOpacity(0.3);	
				
				

  		    L.Control.boxzoom({
  		    	position : 'topleft'
  		    }).addTo(map);

  		    L.Control.measureControl().addTo(map);

  		    var measureControl = new L.Control.Measure({
  		    		position : 'topleft',
  		    		primaryLengthUnit : 'kilometers',
  		    		secondaryLengthUnit : 'meters',
  		    		primaryAreaUnit : 'sqmeters',
  		    		secondaryAreaUnit : 'hectares',
  		    		activeColor : '#D66425',
  		    		completedColor : '#B65824'
  		    	}).addTo(map);

  		    L.control.scale({
  		    	maxWidth : 500,
  		    	position : "bottomleft",
  		    }).addTo(map);

  		    L.control.coordinates({
  		    	position : "bottomleft",
  		    	decimals : 10,
  		    	decimalSeperator : ",",
  		    	labelTemplateLat : ": {y}",
  		    	labelTemplateLng : "WGS 84: {x}"
  		    }).addTo(map);

  		    L.control.coordinates({
  		    	position : "bottomleft",
  		    	useDMS : true,
  		    	labelTemplateLat : "N {y}",
  		    	labelTemplateLng : "E {x}",
  		    	useLatLngOrder : true
  		    }).addTo(map);

  		    /* var loadingControl = new L.Control.loading({
  		    separate: true
  		    });
  		    map.addControl(loadingControl); */
/* 
  		    var miniMap2 = new L.Control.MiniMap(test1, {
  		    		crs : crs,
  		    		maxZoom : 14,
  		    		minZoom : 10,
  		    		position : "bottomleft",
  		    		toggleDisplay : true
  		    	}).addTo(map); */

  		    //dodawanie/usuwanie warstw

  		    $('#borderCheck').click(function () {
  		    	if (this.checked) {
  		    		granicaLayer.addTo(map);
  		    	} else {
  		    		map.removeLayer(granicaLayer);
  		    	}
  		    });

  		    $('#buildingsCheck').click(function () {
  		    	if (this.checked) {
  		    		buildingLayer.addTo(map);
  		    	} else {
  		    		map.removeLayer(buildingLayer);
  		    	}
  		    });

  		    $('#roadsCheck').click(function () {
  		    	if (this.checked) {
  		    		roadsLayer.addTo(map);
  		    	} else {
  		    		map.removeLayer(roadsLayer);
  		    	}
  		    });

  		    $('#riversCheck').click(function () {
  		    	if (this.checked) {
  		    		wodyLayer.addTo(map);
  		    	} else {
  		    		map.removeLayer(wodyLayer);
  		    	}
  		    });

  		    $('#landuseCheck').click(function () {
  		    	if (this.checked) {
  		    		landuseLayer.addTo(map);
  		    	} else {
  		    		map.removeLayer(landuseLayer);
  		    	}
  		    });

  		    $('#shadeCheck').click(function () {
  		    	if (this.checked) {
  		    		shadeLayer.addTo(map);
  		    	} else {
  		    		map.removeLayer(shadeLayer);
  		    	}
  		    });

  		    $('#izohipsoCheck').click(function () {
  		    	if (this.checked) {
  		    		warstwiceLayer.addTo(map);
  		    	} else {
  		    		map.removeLayer(warstwiceLayer);
  		    	}
  		    });

  		    $('#hipsoCheck').click(function () {
  		    	if (this.checked) {
  		    		demLayer.addTo(map);
  		    	} else {
  		    		map.removeLayer(demLayer);
  		    	}
  		    });

  		    $('#slopeCheck').click(function () {
  		    	if (this.checked) {
  		    		slopeLayer.addTo(map);
  		    	} else {
  		    		map.removeLayer(slopeLayer);
  		    	}
  		    });

  		    $('#coverCheck').click(function () {
  		    	if (this.checked) {
  		    		wodyLasyLayer.addTo(map);
  		    	} else {
  		    		map.removeLayer(wodyLasyLayer);
  		    	}
  		    });
			
			$('#wig25kCheck').click(function () {
  		    	if (this.checked) {
  		    		wig25k.addTo(map);
  		    	} else {
  		    		map.removeLayer(wig25k);
  		    	}
  		    });

  		    //dodawanie/usuwanie warstw
