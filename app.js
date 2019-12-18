function getForcasting(){
document.getElementById("day").innerHTML =	"";
var element = document.getElementById("cities");
var city = element.options[element.selectedIndex].value;
var url = 'https://weather-ydn-yql.media.yahoo.com/forecastrss';
var method = 'GET';
var app_id = 'j5eR2436';
var consumer_key = 'dj0yJmk9NjdaZ2diUm02ZjREJmQ9WVdrOWFqVmxVakkwTXpZbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWMy';
var consumer_secret = '730d8a9402c59f68468b013dbe62ef9bc9abb354';
var concat = '&';
var query = {'location': city+',ca', 'format': 'json'};
var oauth = {
    'oauth_consumer_key': consumer_key,
    'oauth_nonce': Math.random().toString(36).substring(2),
    'oauth_signature_method': 'HMAC-SHA1',
    'oauth_timestamp': parseInt(new Date().getTime() / 1000).toString(),
    'oauth_version': '1.0'
};

var merged = {}; 
$.extend(merged, query, oauth);

var merged_arr = Object.keys(merged).sort().map(function(k) {
  return [k + '=' + encodeURIComponent(merged[k])];
});
var signature_base_str = method
  + concat + encodeURIComponent(url)
  + concat + encodeURIComponent(merged_arr.join(concat));

var composite_key = encodeURIComponent(consumer_secret) + concat;
var hash = CryptoJS.HmacSHA1(signature_base_str, composite_key);
var signature = hash.toString(CryptoJS.enc.Base64);

oauth['oauth_signature'] = signature;
var auth_header = 'OAuth ' + Object.keys(oauth).map(function(k) {
  return [k + '="' + oauth[k] + '"'];
}).join(',');

$.ajax({
  url: url + '?' + $.param(query),
  headers: {
    'Authorization': auth_header,
    'X-Yahoo-App-Id': app_id 
  },
  method: 'GET',
  success: function(data){
   // console.log(data.forecasts);
	
	 for ($i = 0; $i < data.forecasts.length; $i++) {
	
	$('#day').append(' <tr><th scope="row">'+data.forecasts[$i].day+'</th><td>'+data.forecasts[$i].low+'</td><td>'+data.forecasts[$i].high+'</td><td>'+data.forecasts[$i].text+'</td></tr>'); 
	 
	 }
  }
});

}
