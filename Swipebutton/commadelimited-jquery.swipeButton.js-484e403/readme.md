# swipeButton.js

SwipeButton is a jQuery Mobile plugin which allows developers to add iPhone style buttons to listview rows by attaching to the swipe event. This project contains everything you need to get started.

## jQuery Mobile 1.1 compatible
jQuery Mobile made a slight change in version 1.1 with the way they create buttons inside list views. swipeButton has been updated to account for that change and offers a test case for your perusal.

## Example
View a simple [demo of swipeButton](http://andymatthews.net/code/swipebutton/)

## Quick start

Clone the git repo - `git clone git@github.com:commadelimited/jquery.swipeButton.js.git` - or [download it](https://github.com/commadelimited/jquery.swipeButton.js/zipball/master)

## Usage & Documentation
Minimum usage requires that you override the default click event. All other arguments are optional.

	$('#swipeMe li').swipeDelete({
		click: function(e){
			e.preventDefault();
			$(this).parents('li').remove();
		}
	});

	$('#swipeMe li').swipeDelete({
		direction: 'swiperight', // standard jquery mobile event name
		btnLabel: 'Delete',
		btnTheme: 'b',
		btnClass: 'aSwipeBtn',
		click: function(e){
			e.preventDefault();
			var url = $(e.target).attr('href');
			$(this).parents('li').remove();
			$.post(url, function(data) {
				console.log(data);
			});
		}
	});

## Unit Tests

You can now run unit tests on swipeButton by loading `tests/jquery.swipeButton.js.html` in the browser of your choice.

## Contributing

You are invited to contribute code and suggestions to this project. The more contributors the merrier.

## Project Info

* Source: http://github.com/commadelimited/jquery.swipeButton.js
* Twitter: [http://twitter.com/commadelimited](http://twitter.com/commadelimited)

### 3rd party libraries required:

* jQuery: MIT/GPL license
* jQuery Mobile: MIT/GPL license

### Custom bits:

Public domain