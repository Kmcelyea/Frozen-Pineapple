chapter: Extending the Framework
==================
(function($){
     // We wrap all the code inside this function to be sure that $ is
     // linked to the jQuery global object

     // Widget definition
     $.widget("mobile.ourWidgetName", $.mobile.widget, {
            options: {
            // Here we can create default options of our widget
            },
            // Private methods
            _create: function() {
                // The constructor function
            },


            // Public methods

            enable: function() {
                // Enable the widget
            },
            disable: function() {
                // Disable the widget
            },
            refresh: function() {
                // Refresh the widget
            }
    });
    // End of widget definition

    // Auto-initialization code
    $(document).bind("pagecreate", function(event) {
        // We find data-role's and apply our widget constructor
        $(event.target).find(":jqmData(role='ourWidgetName')").ourWidgetName();

    });

}(jQuery));
    
    
====================================
$.widget("mobile.dynamicimage", $.mobile.widget, {
    options: {
        width: "100%",
        margin: 0
    }
});
    
    
====================================
$.widget("mobile.dynamicimage", $.mobile.widget, {
    options: {
        width: 100,
        margin: 0
    },
    _create: function() {
        // We call a private function
        this._loadURL();
    }
});
    
    
====================================
$.widget("mobile.dynamicimage", $.mobile.widget, {
    options: {
        width: 100,
        margin: 0
    },
    _create: function() {
        // We call a private function
        this._loadURL();
    },
    // Public methods
    enable: function() {
        // Enable the widget
          $(this.element).attr('disabled', '');
    },
    disable: function() {
        // Disable the widget
          $(this.element).removeAttr('disabled');
    },
    refresh: function() {
        // Refresh the widget
          this._loadURL();
    }
});
    
    
====================================
_loadURL: function() {
        // this.element will be our +img+ element

        var url; // we create the service URL
        url = "http://src.sencha.io/";

        var parameters = "";
        if (!isNaN(this.options.width)) {
                parameters += "x" + this.options.width;
        }
        if ((!isNaN(this.options.margin)) && this.options.margin>0) {
                parameters += "-" + this.options.margin;
        }
        if (parameters.length>0) {
                url += parameters + "/";
        }

        // Sencha IO needs an absolute URL
        var originalUrl = $(this.element).jqmData("src");
        if (originalUrl.length>1) {
                var newUrl = "";
                if ($.mobile.path.isAbsoluteUrl(originalUrl)) {
                        // The image URL is already absolute
                        newUrl = originalUrl;
                } else {
                        // The image URL is relative, we create an absolute one
                        var baseUrl = $.mobile.path.parseUrl(location.href);
                        var baseUrlWithoutScript = baseUrl.protocol + "//" + 
                            baseUrl.host + baseUrl.directory;
                        newUrl = $.mobile.path.makeUrlAbsolute(originalUrl, 
                            baseUrlWithoutScript);
                }

                url += newUrl;

                $(this.element).attr("src", url);
        }
    
    
====================================
$(document).bind("pagecreate", function(event) {
    // We find data-role's and apply our widget constructor
    $(event.target).find("img:jqmData(role='dynamic-image')").dynamicimage();
});
    
    
====================================
<script src="jquery.mobile-dynamicimage-1.0.js"></script>
    
    
====================================
<-- Image taking the device's 100% width -->
<img data-src="images/photo.png" data-role="dynamic-image">

<-- Image taking the device's 40% width -->
<img data-src="images/photo.png" data-role="dynamic-image" data-width="40">

<-- Image taking the device's 100% width with 20 pixels of margin -->
<img data-src="images/photo.png" data-role="dynamic-image" data-margin="50">
    
    
====================================
(function($){
     // Widget definition
     $.widget( "mobile.dynamicimage", $.mobile.widget, {
            options: {
                   margin: 0, width: 100
            },
            _create: function() {
                   this._loadURL();
            },

                // Private methods
                _loadURL: function() {
                     // this.element will be our +img+ element

                      var url; // we create the service URL
                      url = "http://src.sencha.io/";

                      var parameters = "";
                      if (!isNaN(this.options.width)) {
                              parameters += "x" + this.options.width;
                      }
                      if ((!isNaN(this.options.margin)) && this.options.margin>0) {
                              parameters += "-" + this.options.margin;
                      }
                      if (parameters.length>0) {
                              url += parameters + "/";
                      }

                      // Sencha IO needs an absolute URL
                      var originalUrl = $(this.element).jqmData("src");
                      if (originalUrl.length>1) {
                          var newUrl = "";
                          if ($.mobile.path.isAbsoluteUrl(originalUrl)) {
                                  // The image URL is already absolute
                                  newUrl = originalUrl;
                          } else {
                                  // The image URL is relative, we create an 
                                  // absolute one
                                  var baseUrl = $.mobile.path.parseUrl(location.href);
                                  var baseUrlWithoutScript = baseUrl.protocol + "//" 
                                      + baseUrl.host + baseUrl.directory;
                                  newUrl = $.mobile.path.makeUrlAbsolute(originalUrl, 
                                      baseUrlWithoutScript);
                          }

                          url += newUrl;

                          $(this.element).attr("src", url);
                      }
                },

                // Public methods
            enable: function() {
                // Enable the widget
                        $(this.element).attr('disabled', '');
            },
            disable: function() {
                // Disable the widget
                        $(this.element).removeAttr('disabled');
            },
            refresh: function() {
                // Refresh the widget
                        this._loadURL();
            }
    });
    // End of widget definition

    // Auto-initialization code
    $(document).bind("pagecreate", function(event) {
        // We find data-role's and apply our widget constructor
        $(event.target).find("img:jqmData(role='dynamic-image')").dynamicimage();

    });

}(jQuery));
    
    
====================================
<ul data-role="pagination">
   <li class="ui-pagination-prev"><a href="1.html">Prev</a></li>
   <li class="ui-pagination-next"><a href="3.html">Next</a></li>
</ul>
    
    
====================================
<div data-role="navbar" data-grid="d">
   <ul class="apple-navbar-ui comboSprite">
      <-- elements -->
   </ul>
</div>
    
    
====================================
<input type="date" data-role="datebox">
    
    
====================================
<script src="http://dev.jtsage.com/cdn/simpledialog/latest/
    jquery.mobile.simpledialog.min.js"></script>
    
    
====================================
$("#button").click(function() {
    $(this).simpledialog({
        mode: 'bool',  // For normal alert or confirm
        prompt: "We could not open the file",
        useModal: true,
        buttons: [
            'Ok':  {
               theme: "c", icon: "check"
            }
        ]
    });
});
    
    
====================================
$("#button").click(function() {
    $(this).simpledialog({
        mode: 'bool',
        prompt: "Do you want to delete this file?",
        useModal: true,
        buttons: [
            'Yes':  {
               theme: "c", icon: "delete",
               click: function() { // Delete }
            },
            'No':  {
               theme: "a", icon: "cancel"
            },
        ]
    });
});
    
    
====================================
$("#button").click(function() {
    $(this).simpledialog({
        mode: 'string',
        prompt: "What is your name?",
        useModal: true,
        buttons: [
            'No':  {
               theme: "c", icon: "delete",
               click: function() {
                   alert("Your name is " + $("#button").jqmData("string");
               }
            }
        ]
    });
});
    
    
====================================
<a data-role="actionsheet" data-sheet="share" data-icon="plus">Share</a>

<div id="share">
   <a href="facebook.html" data-role="button">Share in Facebook</a>
   <a href="twitter.html" data-role="button">Share in Twitter</a>
   <a href="google.html" data-role="button">Share in Google+</a>
   <a data-rel="close" data-role="button">Cancel</a>
</div>
    
    
====================================
<body>
  <div data-role="panel" data-id="menu">
    <div data-role="page">

    </div>
  </div>
  <div data-role="panel" data-id="main">
    <div data-role="page">

    </div>
  </div>
</body>
    
    
====================================
<a href="demo.html" data-panel="main">Demos</a>
    
    
==================