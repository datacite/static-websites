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
		if ($(location).attr('pathname') != "/")
			addTestinfo();

		$("body").css("margin-top", banner.outerHeight(true));
	}
	
	function addToolbar() {
		var ul = $("<ul>");
		$(datacite_services).each(function(idx, service) {
			var li = $("<li>");
			var a = $("<a>").text(service.name).attr("href", service.path);
			li.append(a);
			ul.append(li);
		});

		var div = $("<div>").attr("id", "toolbar");
		div.append(ul);
		$("#banner").append(div);
	}
	
	function addTestinfo() {
		var div = $("<div>").attr("id", "testinfo");
		div.text("This is only a test instance of our service.");
		$("#banner").append(div);
	}

	$(document).ready(init);
})(banner_jquery);