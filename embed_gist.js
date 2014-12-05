// Not required for GitHub blog.


// <!-- Add the css -->
// <link rel="stylesheet" href="https://gist.github.com/stylesheets/gist/embed.css">

// <!-- Add jQuery -->
// <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>

// <!-- Add gist-embed-->
// <script type="text/javascript">
// //author: Blair Vanderhoof
// //https://github.com/blairvanderhoof/gist-embed
$(function(){
    var gistMarkerId = "gist-";

    //find all code elements
    $("code").each(function(){
    	var $elem, id, url;
    	$elem = $(this);

    	//make block level so loading text shows properly
    	$elem.css("display","block");

    	id = $elem.attr("id");
    	id = id || "";
    	//get the numeric id from the id attribute of the element holder
    	id = id.substr(0,gistMarkerId.length) === gistMarkerId ? id.replace(gistMarkerId,"") : null;

    	//make sure result is a numeric id
    	if(!isNaN(parseInt(id,10))){
    		url = "https://gist.github.com/"+id+".json";
    		//loading
    		$elem.html("Loading gist "+url+" ...");
    		//request the json version of this gist
    		$.ajax({
    			url: "https://gist.github.com/"+id+".json",
    			dataType: "jsonp",
    			timeout:10000,
    			success: function(response){
    				//the html payload is in the div property
    				if(response && response.div){
    					//add the html to your element holder
    					$elem.html(response.div);
    				}
    			},
    			error: function(){
    				$elem.html("Failed loading gist "+url);
    			}
    		});
    	}else{
    		$elem.html("Failed loading gist with incorrect id format: "+$elem.attr("id"));
    	}
    });
});
        // </script>

        // https://gist.github.com/e561286cc226bccdaa3e.git
        // <script src="https://gist.github.com/Lyonsclay/e561286cc226bccdaa3e.js"></script>
