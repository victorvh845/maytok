//Actualizar clase activa
//http://stackoverflow.com/questions/15082316/how-to-set-active-class-to-nav-menu-from-twitter-bootstrap
$('a[href="' + this.location.pathname + '"]').parents('li,ul').addClass('current-menu-item');

//Update the title on tab change
var title = document.title;
document.addEventListener("visibilitychange", function() {
    if (document.visibilityState == 'hidden') {
        document.title = 'I miss you ' + '\u2665 \x7C ' + document.title;
    } else {
        document.title = title;
    }
});

//Traer el JSON del blog
// Fuente: http://stackoverflow.com/questions/8264446/jquery-ajax-tumblr-api-v2
myJsonpCallback = function(data)
{
    var posts = data.response.posts;
    var text = '';
    for (var i = 0; i < 2; i++) {
        var link = '/blog/post/' + posts[i].id + '/' + posts[i].slug + '/';
        text += '<article><h5><a href="' + link + '">' + posts[i].title + '</a></h5></article>';
    }
    document.getElementById('blogParser').innerHTML = text;
}

$.ajax({
    type: "GET",
    url : "https://api.tumblr.com/v2/blog/khanmaytok.tumblr.com/posts/text?limit=2&tags=maytok&api_key=fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4",
    dataType: "jsonp",
    data: {
        jsonp : "myJsonpCallback"
    }
});
