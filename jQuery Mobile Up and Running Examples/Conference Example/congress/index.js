var data;

$(document).bind("mobileinit", function() {
	
	if (navigator.platform=="iPhone" || navigator.platform=="iPad" ||
		navigator.platform=="iPod" || navigator.platform=="iPad" ||
		navigator.platform=="iPhone Simulator" ) {
			
		// It's an iOS device, we check if we are in chrome-less mode
		if (!navigator.standalone) {
			showIOSInvitation();
		}
	}
	
	/* We capture the sessions page load to check dynamic session data */
	$("#sessions").live("pageshow", function() {
		
		if (window.localStorage!=undefined) {
			// HTML5 Local Storage is available
			if (window.localStorage.getItem("data")!=undefined &&
				       window.localStorage.getItem("data")!=null) {
				// We first load the offline stored session information while checking updates
				showSessions(window.localStorage.getItem("data"));	
				$("#console").html("Checking data update");
			} else {
				// There is no local storage cache
				$("#console").html("Downloading session data...");
			}
		} else {
			// No HTML5 Local Storage, downloading JSON every time
			$("#console").html("Downloading session data...");
		}		
				
		loadSessionsAjax();	
	});
	
});

function showIOSInvitation() {
	setTimeout(function() {
		// We hide the saving information until the whole webapp is downloaded
		$("#install").hide();
		// We open the iOS instructions for adding to the homepage
		$.mobile.changePage($("#ios"), {transition: "slideup", changeHash: false});
	}, 100);
	
	setTimeout(function() {
		$("#consoleInstall").html("Application downloaded");
			$("#install").show();
	}, 1000)
	
	// We capture HTML5 Application Cache events to provide useful information
	if (window.applicationCache!=undefined) {
		window.applicationCache.addEventListener('checking', function() {
			$("#consoleInstall").html("Checking version");
		});

		window.applicationCache.addEventListener('downloading', function() {
			$("#consoleInstall").html("Downloading applicaiton. Please wait...");
		});
		
		window.applicationCache.addEventListener('cached', function() {
			$("#consoleInstall").html("Application downloaded");
			$("#install").show();
		});

		window.applicationCache.addEventListener('updateready', function() {
			$("#consoleInstall").html("Application downloaded");
			$("#install").show();
		});
		window.applicationCache.addEventListener('noupdate', function() {
			$("#consoleInstall").html("Application downloaded");
			$("#install").show();
		});
		window.applicationCache.addEventListener('error', function(e) {
			$("#consoleInstall").html("There was an error downloading this app");														
		});	
		window.applicationCache.addEventListener('obsolete', function(e) {
			$("#consoleInstall").html("There was an error downloading this app");														
		});					
	} 
				
}

function loadSessionsAjax() {
	// We bring the JSON as text so it's easy to store in Local Storage
	$.ajax(/*"http://www.mobilexweb.com/congress/*/"sessions.json", {
		complete: function(xhr) {
			if (window.localStorage!=undefined) {
				if (window.localStorage.getItem("data")!=undefined && window.localStorage.getItem("data")!=null) {
					if (xhr.responseText==window.localStorage.getItem("data")) {
						// The new session downloaded is the same as the one in screen
						$("#console").html("Schedule is updated");						
					} else {
						// There is an update on the session data
						if (confirm("There is an update in the schedule available, do you want to load it now?")) {
							$("#console").html("Schedule is updated");	
							showSessions(xhr.responseText);	
						} else {
							$("#console").html("Schedule will be updated later");										
						}
					}
				} else {
					// Local Storage is available but no previous cache found
					$("#console").html("Schedule is updated");	
					showSessions(xhr.responseText);	
				}
			} else {
				// No Local Storage, show the info without saving
				$("#console").html("Schedule is updated");	
				showSessions(xhr.responseText);							
			}
		},
		dataType: 'text',
		error: function() {
			$("#console").html("Schedule update could not be downloaded");	
		}
	});
}


var isFirstLoad = true;

function showSessions(string) {
	if (window.JSON!=undefined) {
		data = JSON.parse(string);	
	} else {
	    data = eval("(" + string + ")");	
	}	
	if (window.localStorage!=undefined) {
		// Save the new data as string
		window.localStorage.setItem("data", string);
	}
	
	$("#slots").html("");
	
	var html = "";
	for (var i=0; i<data.slots.length; i++) {
		
		if (data.slots[i].message!=null) {
			// This is an special slot, so we create a divider
			html += "<li data-role='list-divider' data-groupingtheme='e'>" + data.slots[i].time + ": " + data.slots[i].message  + "</li>";					
		} else {
			// This is a normal slot with sessions
			html += "<li><a href='javascript:showDetails(" + i + ")'>Sessions of " + data.slots[i].time + "</a></li>";
		}
	}
	
	$("#slots").html(html);
	
	if (isFirstLoad) {
		$("#slots").listview();
		isFirstLoad = false;
	} else {
		$("#slots").listview('refresh');				
	}
	
}

function showDetails(index) {			
	$("#details h1").html("Sessions of " + data.slots[index].time);
	var html = ""
	for (var i=0; i<data.sessions.length; i++) {
		if (data.sessions[i].timeId==data.slots[index].id) {
			// We create one collapsible component per session
			html += "<div data-role='collapsible'>";
			html += "<h3>" + data.sessions[i].title + "</h3>";
			html +=" <h3>" + data.sessions[i].room + "</h3>";
			html += "<h4>Speaker/s: " + data.sessions[i].speaker;
			html += "</h4>";
			html += "<p>" + data.sessions[i].description + "</p>";	
			html += "</div>";
		}
	}
	// We provide the information to the details page
	$("#sessionInfo").html(html);
	$("#sessionInfo div").collapsible();
	
	// We change to the details page
	$.mobile.changePage($("#details"));
}

function refresh() {
	$("#console").html("Verifying...");
	loadSessionsAjax();
}

function openWithoutInstallation() {
	// We remove the dialog-like iOS installation page
	$.mobile.changePage($("#home"), {transition:"slideup", reverse:true});	
}
