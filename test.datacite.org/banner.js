var banner_jquery = $.noConflict(true);

(function($) {
	var base_host = "test.datacite.org"
	var datacite_services = [ {
		"host" : "mds." + base_host,
		"name" : "Metadata Store",
		"github" : "datacite/mds",
		"jenkins" : "mds",
		"links" : [ {
			"name" : "Translation Status",
			"url" : "http://dev.datacite.org/jenkins/job/mds-check/Translation_Report/?"
		} ]
	}, {
		"host" : "search." + base_host,
		"name" : "Search",
		"github" : "datacite/search",
		"jenkins" : "search"
	}, {
		"host" : "schema." + base_host,
		"name" : "Schema",
		"github" : "datacite/schema",
		"jenkins" : "schema"
	}, {
		"host" : "oai." + base_host,
		"name" : "OAI-PMH",
		"github" : "datacite/OAIP",
		"jenkins" : "oaip"
	}, {
		"host" : "data." + base_host,
		"name" : "Content Resolver",
		"github" : "datacite/content-resolver"
	}, {
		"host" : "stats." + base_host,
		"name" : "Stats",
		"github" : "datacite/stats-portal"
	}, {
		"host" : "handle." + base_host,
		"name" : "Handle Server"
	} ];
	
	function init() {
		var banner = $("<div>").attr("id", "banner");
		$("body").prepend(banner);
		
		addToolbar();
		addToolbar2();
		if ($(location).attr('hostname') != base_host)
			addTestinfo();

		$("body").css("margin-top", banner.outerHeight(true));
	}
	
	function addToolbar() {
		var toolbar = createToolBar("toolbar");
		var menu = addMenu(toolbar);
		$(datacite_services).each(function(idx, service) {
			var entry = addToMenu(menu, service.name, "//" + service.host);
			if ($(location).attr('hostname') == service.host) 
				$("a", entry).addClass("highlight");
		});
	}

	function addToolbar2() {
		var toolbar = createToolBar("toolbar2");
		var menu = addMenu(toolbar);
		var service = getCurrentService();
		if (service == undefined)
			return;
		if (service.github) {
			var url = "https://github.com/" + service.github;
			addToMenu(menu, "Code", url);
			addToMenu(menu, "Tickets", url + "/issues");
		}
		if (service.jenkins) {
			var url = "http://dev.datacite.org/jenkins/job/" + service.jenkins;
			addToMenu(menu, "Jenkins", url);
		}
		if (service.links) {
			$(service.links).each(function(idx, link) {
				addToMenu(menu, link.name, link.url);
			})
		}
	}
	
	function createToolBar(id) {
		var div = $("<div>").attr("id", id);
		div.append($("<br>"));
		$("#banner").append(div);
		return div;
	}
	
	function addMenu(toolbar) {
		var ul = $("<ul>");
		toolbar.prepend(ul);
		return ul;
	}
	
	function addToMenu(menu, text, url) {
		var a = $("<a>").text(text).attr("href", url);
		var li = $("<li>").append(a);
		menu.append(li);
		return li;
	}
	
	function getCurrentService() {
		var services = $.grep(datacite_services, function(service) {
			return $(location).attr('hostname') == service.host;
		});
		
		return (services == undefined)?undefined:services[0];
	}
	
	function addTestinfo() {
		var toolbar = createToolBar("testinfo");
		toolbar.text("This service is for testing only.");
	}

	$(document).ready(init);
})(banner_jquery);
