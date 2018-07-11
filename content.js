var elements = document.getElementsByClassName('ptools-popover');

if(window.location.href.indexOf("coursebook.utdallas.edu") > -1)
{
	for (var i = 3; i < elements.length; i++)
	{
		if (elements[i].innerHTML != "")
		{
			
			var firstName = elements[i].innerHTML.substring(0, elements[i].innerHTML.indexOf(' '));
			var lastName = elements[i].innerHTML.substring((elements[i].innerHTML.lastIndexOf(' ')+1));

			// flaggedUrl was used to replace the actual URL because of complaint from website regarding illegal web scraping 
			var urlSearch = flaggedUrl +firstName + "+" + lastName;

			if (urlSearch != flaggedUrl)
			{
				googleSearch = JSON.stringify(googleSearch);
				console.log(googleSearch);
				$.ajax({	
					url: "https://afternoon-headland-40472.herokuapp.com"+ "/getData",
					data: {
						"urlSearch": urlSearch,
						"i" : i
					},
					method: "GET",
					//use data type json
					dataType: "json",
					success: function(result) {
						console.log("data fetched Successfully");
						//result is the data the server returned.
						console.log(result);
						object = JSON.parse(result);
						elements[object.i].innerHTML = elements[object.i].innerHTML + " " + "Rating: ".fontcolor('red') + object.quality.fontcolor('blue') + " " + "Difficulty: ".fontcolor('red') + object.difficult.fontcolor('blue');
					},
					error: function() {
						console.log("Something went wrong, data could not be fetched");
					}		
				});
			}
		}
	}
}
