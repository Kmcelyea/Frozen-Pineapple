$('div[data-role=page]').live('pageinit', function(event){

	// begin ajax call for tweets
	var url = 'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=commadelimited&callback=?';
	$.getJSON(url,function(data){
		// load the template
		$.get('tmpl/tweet.txt', function(tmpl){
			var s = '';
			$(data).each(function(index,tweet){
				var data = {'image': tweet.user.profile_image_url, 'username':tweet.user.screen_name, 'tweet':tweet.text};
				s += Mustache.to_html(tmpl, data);
			});
			$('ul').append(s).listview('refresh');
		})
	})

});