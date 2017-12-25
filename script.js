/*var util = require("util"),
    http = require("http");
var request = require("request")*/

ids=[]
var dict=[];
var bydate=[];
async function get_gameIds() {
	$('wishlist_items').childElements().each( function(e) {
		ids.push(e.id);
		dict[e.id]= getRecommendations(e.id.substr(5))
		bydate[e.id]=getByDate(e.id);
	} );

}

function EnableSave()
{
	$('save_action_disabled_1').hide();
	$('save_action_disabled_2').hide();
	$('save_action_enabled_1').show();
	$('save_action_enabled_2').show(); 
}
function UpdateWishlistOrdering( list ) {
	$('wishlist_items').childElements().each( function(e) { e.style.zIndex = ''; } );
	UpdateRanks();
}
function UpdateRanks()
{
	var rgRankInputs = $('wishlist_items').select('input.wishlist_rank');
	for ( var i = 0; i < rgRankInputs.length; i++ )
	{
		var input = $(rgRankInputs[i]); 
		if ( !input.hasClassName( 'userEdited' ) )
		{
			if ( input.value != i+1 )
				EnableSave(); 
			input.value = i+1;
		}
	}
}
function BlurRanks()
{
	// take focus away from the input fields so they fire their on change
	var rgRankInputs = $('wishlist_items').select('input.wishlist_rank');
	for ( var i = 0; i < rgRankInputs.length; i++ )
	{
		rgRankInputs[i].blur();
	}
}

function swapElements(obj1, obj2) {
	// create marker element and insert it where obj1 is
	var temp = document.createElement("div");
	obj1.parentNode.insertBefore(temp, obj1);

	// move obj1 to right before obj2
	obj2.parentNode.insertBefore(obj1, obj2);

	// move obj2 to right before where obj1 used to be
	temp.parentNode.insertBefore(obj2, temp);

	// remove temporary marker node
	temp.parentNode.removeChild(temp);

	UpdateWishlistOrdering();
}
//swapElements(document.getElementById("game_298110"), document.getElementById("game_296830"))

function getRating() {
	$.get("http://store.steampowered.com/app/298110/", function(data) {
	    //var meta = $(data).filter('meta[name="apple-itunes-app"]').attr("content");
	    console.log(data)
	});
}
/*var options = {
  host: 'store.steampowered.com',
  port: 80,
  path: '/api/appdetails?appids=298110'
};

http.get(options, function(res) {
  console.log("Got response: " + res.statusCode);
  console.log(res)
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});*/
 function getRecommendations(appId) {
	var url = "http://store.steampowered.com/api/appdetails?appids="+appId;
	request({
	    url: url,
	    json: true
	}, function (error, response, body) {

	    if (!error && response.statusCode === 200) {
	        return body[appId].data.recommendations.total // return the json response
	    }
	})	
}

// incomp. can't get date value yet
function getByDate(id) {
	var element=document.getElementById(id).getElementsByClassName("wishlist_added_on")[0];
	console.log(element)
}

//getRecommendations(298110) // problem in as browser can't get recommendations value
get_gameIds().then(()=>{
	console.log(bydate[ids[0]]);
	function sort() {
		for(let i=0;i<100;i++) {
			for(j=i+1;j<101;j++) {
				if(dict[id[i]]<dict[id[j]]) {
					swapElements(id[i], id[j]);
				}
			}
		}
	}
});
