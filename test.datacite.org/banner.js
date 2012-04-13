var banner_jquery = $.noConflict(true);

(function($) {
	var datacite_services = [ {
		"path" : "/mds",
		"name" : "Metadata Store"
	}, {
		"path" : "/search",
		"name" : "Search"
	}, {
		"path" : "/schema",
		"name" : "Schema"
	}, {
		"path" : "/oaip",
		"name" : "OAI-PMH"
	}, {
		"path" : "/data",
		"name" : "Content Resolver"
	}, {
		"path" : "/handle",
		"name" : "Handle Server"
	} ];
	
	function init() {
		var banner = $("<div>").attr("id", "banner");
		$("body").prepend(banner);
		
		addToolbar();
		addTestinfo();
	}
	
	function addToolbar() {
		var span = $("<span>").text("DataCite Test Services");
		var ul = $("<ul>");
		$(datacite_services).each(function(idx, service) {
			var li = $("<li>");
			var a = $("<a>").text(service.name).attr("href", service.path);
			li.append(a);
			ul.append(li);
		});

		$("#banner").append(span, ul);
	}
	
	function addTestinfo() {
		
	}

	$(document).ready(init);
})(banner_jquery);