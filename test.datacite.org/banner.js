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
		"name" : "Search",
		"github" : "datacite/search",
		"jenkins" : "search"
	}, {
		"path" : "/schema",
		"name" : "Schema",
		"github" : "datacite/schema",
		"jenkins" : "schema"
	}, {
		"path" : "/oaip",
		"name" : "OAI-PMH",
		"github" : "datacite/OAIP",
		"jenkins" : "oaip"
	}, {
		"path" : "/data",
		"name" : "Content Resolver",
		"github" : "edzuk/content-resolver"
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
			var entry = addToToolbarMenu(ul, service.name, service.path);
			if ($(location).attr('pathname').startsWith(service.path)) 
				$("a", entry).addClass("highlight");
		});

		var div = $("<div>").attr("id", "toolbar");
		div.append(ul);
		div.append($("<br>"));
		$("#banner").append(div);
	}

	function addToolbar2() {
		var ul = $("<ul>");
		var service = getCurrentService();
		if (service == undefined)
			return;
		if (service.github) {
			var url = "https://github.com/" + service.github;
			addToToolbarMenu(ul, "Code", url);
			addToToolbarMenu(ul, "Tickets", url + "/issues");
		}
		if (service.jenkins) {
			var url = "http://dev.datacite.org/jenkins/job/" + service.jenkins;
			addToToolbarMenu(ul, "Jenkins", url);
		}
		var div = $("<div>").attr("id", "toolbar2");
		div.append(ul);
		div.append($("<br>"));
		$("#banner").append(div);
	}
	
	function addToToolbarMenu(ul, text, url) {
		var a = $("<a>").text(text).attr("href", url);
		var li = $("<li>").append(a);
		ul.append(li);
		return li;
	}
	
	function getCurrentService() {
		var services = $.grep(datacite_services, function(service) {
			return $(location).attr('pathname').startsWith(service.path);
		});
		
		return (services == undefined)?undefined:services[0];
	}
	
	function addTestinfo() {
		var div = $("<div>").attr("id", "testinfo");
		div.text("This is only a test instance of our service.");
		$("#banner").append(div);
	}

	$(document).ready(init);
})(banner_jquery);