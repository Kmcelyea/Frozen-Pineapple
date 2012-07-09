<cfparam name="FORM.username" type="string" default="commadelimited">

<cfset mustache = createObject('com.mustache.mustache').init()>
<cffile action="read" file="#ExpandPath('tmpl/tweet.txt')#" variable="template">
<cfhttp url="http://api.twitter.com/1/statuses/user_timeline.json?screen_name=#FORM.username#" result="feed"></cfhttp>
<cfset feedPrepped = DeserializeJSON(feed.filecontent.toString())>

<!doctype html>
<html>
<head>
	<title> Mustache Template Test </title>

	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<!-- jQuery Mobile CSS bits -->
	<link rel="stylesheet"  href="http://code.jquery.com/mobile/1.0.1/jquery.mobile-1.0.1.min.css" />

	<!-- Custom css -->
	<link rel="stylesheet" href="css/custom.css" />

	<!-- Javascript includes -->
	<script src="http://code.jquery.com/jquery-1.6.4.min.js"></script>
	<script src="js/ios-orientationchange-fix.min.js"></script>
	<script src="http://code.jquery.com/mobile/1.0.1/jquery.mobile-1.0.1.min.js"></script>
</head> 
<body> 
	<div data-role="page">

		<div data-role="header">
			<h1>Mustache Template Test</h1>
		</div>

		<div data-role="content">

			<div data-role="controlgroup" data-type="horizontal" style="width: 98%;">
				<a href="index.cfm" data-role="button" style="width: 50%;" class="ui-btn-active">Server Side</a>
				<a href="client.html" data-role="button" style="width: 49%;">Client Side</a>
			</div>

			<ul data-role="listview" data-inset="true" data-theme="c" data-dividertheme="b">
				<li data-role="list-divider">Last 20 Tweets</li>
				<cfoutput>
					<cfloop array="#feedPrepped#" index="tweet">
						<cfset item = {'image' = tweet.user.profile_image_url, 'username' = tweet.user.screen_name, 'tweet' = tweet.text}>
						#mustache.render(template,item)#
					</cfloop>
				</cfoutput>
			</ul>

		</div>
		
	</div>
</body>
</html>