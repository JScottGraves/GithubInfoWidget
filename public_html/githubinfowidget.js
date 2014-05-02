/* 
 * The MIT License
 *
 * Copyright 2014 gravesfamily.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


(function ( $ ) {
 
    $.fn.githubinfowidget = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            iconurl: "",
            username: ""
        }, options );

        
       this.addClass("githubinfowidget");
       $('<div class="githubinfowidget-logodiv"><a id="giw_logo" class="githubinfowidget-logo"></a></div>').appendTo(this);
       $("#giw_logo").css("background-image","url('github-widgetlogo.png')");
       $('<span class="githubinfowidget-title">GitHub</span>').appendTo(this);
       $('<div style="width:100%;">&nbsp<div>').appendTo(this);
       $('<hr>').appendTo(this);

       $('<div id="giw_container" class="githubinfowidget-container"></div>').appendTo(this);

       //so I can access "this" in the .get closure
       var targetelement = this;
       
        $.get("https://api.github.com/users/" + settings.username,function(data){
           $('<div class="githubinfowidget-avatar"><img src="' + data.avatar_url + '" height="32" width="32"/></div>').appendTo("#giw_container");
           $('<p class="githubinfowidget-username">' + data.login + '</p>').appendTo("#giw_container");
           $('<p class="githubinfowidget-basicstats">repos: ' + data.public_repos + ' | followers: ' + data.followers + '</p>').appendTo("#giw_container");
           $('<hr>').appendTo("#giw_container");
           $("#giw_logo").attr("href",data.html_url);
           $.get(data.repos_url,function(repos){
              for(i = 0;i < repos.length;i++){
                    $('<p class="githubinfowidget-reponame"><a class="githubinfowidget-reponame" href="' + repos[i].html_url + '">' + repos[i].name + '</a></p>').appendTo("#giw_container");
                    $('<p class="githubinfowidget-repodescription">' + repos[i].description + '</p>').appendTo("#giw_container");
                    $('<hr>').appendTo("#giw_container");                  
               }
           });
        });
       
        
        return this;
 
    };
 
}( jQuery ));