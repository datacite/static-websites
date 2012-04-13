var banner_jquery = $.noConflict(true);

if (typeof String.prototype.startsWith != 'function') {
	  String.prototype.startsWith = function (str){
	    return this.indexOf(str) == 0;
	  };
	}

(function($) {
	var datacite_services = [ {
		"path" : "/mds",
		"name" : "Metadata Store",
		"github" : "datacite/mds",
		"jenkins" : "mds"
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
		addToolbar2();
		if ($(location).attr('pathname') != "/")
			addTestinfo();

		$("body").css("margin-top", banner.outerHeight(true));
	}
	
	function addToolbar() {
		var ul = $("<ul>");
		$(datacite_services).each(function(idx, service) {
			var li = $("<li>");
			var a = $("<a>").text(service.name).attr("href", service.path);
			if ($(location).attr('pathname').startsWith(service.path)) 
				a.addClass("highlight");
			li.append(a);
			ul.append(li);
		});

		var div = $("<div>").attr("id", "toolbar");
		div.append(ul);
		$("#banner").append(div);
	}

	function addToolbar2() {
		var ul = $("<ul>");
		var service = datacite_services[0];
		if (service.github) {
			var url = "https://github.com/" + service.github;
			var a = $("<a>").text("Code").attr("href", url);
			ul.append($("<li>").append(a));
			var a = $("<a>").text("Tickets").attr("href", url + "/issues");
			ul.append($("<li>").append(a));
		}
		if (service.jenkins) {
			var url = "http://dev.datacite.org/jenkins/job/" + service.jenkins;
			var a = $("<a>").text("Jenkins").attr("href", url);
			ul.append($("<li>").append(a));
		}
		var div = $("<div>").attr("id", "toolbar2");
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