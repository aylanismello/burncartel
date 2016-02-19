console.log("HELLO");


var url1 = "https://cf-media.sndcdn.com/gxLcn01eQFJm.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vZ3hMY24wMWVRRkptLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE0NTU4Njc0MDd9fX1dfQ__&Signature=yIVjvd6oU5FthRr9rVD~iiJQhL7uCvfs~uDQydiiAKcc6CVOU~PqzFXXX0GW0PyZxIYWIfb6vRWm5YZ9i3qK0xRR-JeFIT9124BO1-U6AgPScqBWyLwIscRJQWDsERzkkzjnh2P0kOsykT5-fW9o5kx3bNtCNxW1XKPM6sPmSw5Dm4eHK-Ljx1fY5qEC2V8DHcaqAiIyPKg4He49UQvyYlHMWOkQFXNLNMeTPY62XysXy2T173WA9KfycOognUoHaBVizqMJ9~vvaqXgxoi1e8IwxEpRPYSLyj4P6VTg0FUTJTsV21VOSpSkblgSelD61yeplFY~AQzoXsWWfHDeIw__&Key-Pair-Id=APKAJAGZ7VMH2PFPW6UQ";


var stream_urls = ["https://cf-media.sndcdn.com/gxLcn01eQFJm.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vZ3hMY24wMWVRRkptLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE0NTU4Njc0MDd9fX1dfQ__&Signature=yIVjvd6oU5FthRr9rVD~iiJQhL7uCvfs~uDQydiiAKcc6CVOU~PqzFXXX0GW0PyZxIYWIfb6vRWm5YZ9i3qK0xRR-JeFIT9124BO1-U6AgPScqBWyLwIscRJQWDsERzkkzjnh2P0kOsykT5-fW9o5kx3bNtCNxW1XKPM6sPmSw5Dm4eHK-Ljx1fY5qEC2V8DHcaqAiIyPKg4He49UQvyYlHMWOkQFXNLNMeTPY62XysXy2T173WA9KfycOognUoHaBVizqMJ9~vvaqXgxoi1e8IwxEpRPYSLyj4P6VTg0FUTJTsV21VOSpSkblgSelD61yeplFY~AQzoXsWWfHDeIw__&Key-Pair-Id=APKAJAGZ7VMH2PFPW6UQ",
"https://cf-media.sndcdn.com/gxLcn01eQFJm.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vZ3hMY24wMWVRRkptLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE0NTU4Njc0MDd9fX1dfQ__&Signature=yIVjvd6oU5FthRr9rVD~iiJQhL7uCvfs~uDQydiiAKcc6CVOU~PqzFXXX0GW0PyZxIYWIfb6vRWm5YZ9i3qK0xRR-JeFIT9124BO1-U6AgPScqBWyLwIscRJQWDsERzkkzjnh2P0kOsykT5-fW9o5kx3bNtCNxW1XKPM6sPmSw5Dm4eHK-Ljx1fY5qEC2V8DHcaqAiIyPKg4He49UQvyYlHMWOkQFXNLNMeTPY62XysXy2T173WA9KfycOognUoHaBVizqMJ9~vvaqXgxoi1e8IwxEpRPYSLyj4P6VTg0FUTJTsV21VOSpSkblgSelD61yeplFY~AQzoXsWWfHDeIw__&Key-Pair-Id=APKAJAGZ7VMH2PFPW6UQ",
"https://cf-media.sndcdn.com/gxLcn01eQFJm.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vZ3hMY24wMWVRRkptLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE0NTU4Njc0MDd9fX1dfQ__&Signature=yIVjvd6oU5FthRr9rVD~iiJQhL7uCvfs~uDQydiiAKcc6CVOU~PqzFXXX0GW0PyZxIYWIfb6vRWm5YZ9i3qK0xRR-JeFIT9124BO1-U6AgPScqBWyLwIscRJQWDsERzkkzjnh2P0kOsykT5-fW9o5kx3bNtCNxW1XKPM6sPmSw5Dm4eHK-Ljx1fY5qEC2V8DHcaqAiIyPKg4He49UQvyYlHMWOkQFXNLNMeTPY62XysXy2T173WA9KfycOognUoHaBVizqMJ9~vvaqXgxoi1e8IwxEpRPYSLyj4P6VTg0FUTJTsV21VOSpSkblgSelD61yeplFY~AQzoXsWWfHDeIw__&Key-Pair-Id=APKAJAGZ7VMH2PFPW6UQ"]



var songs = [
	{
		'url': 'https://cf-media.sndcdn.com/gxLcn01eQFJm.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vZ3hMY24wMWVRRkptLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE0NTU4Njg2MjZ9fX1dfQ__&Signature=yuxNCrlrZs4l1LNtDb0cCttAiCvQ794Okdud9XkNlHE4BvUztNKTpRztogW9suLbdsuLAo-CojqTjr8AmtfugwShyzsJRmG4DjHO00cbZpeqdHbu53eikZ2tlDpfpUH0qAWlDYs9oVg1EBS0C8I32xT-v9npxog3s2g3FD0c3l3SQS2ugHui1ylfq3jFD2r-rRDGXwlQKaeWUyRUd0f0sh8rJ8zSYSp47pjxphxPs2gvYXSYOZgB5h3pQQtbOdcU2w80Y7kXA4DrAwVHf9KRFw2Wukf7PtfVhTBzBCBkEQZyAS7XLfsBugBWaHpxo0G-xTS4Kr5Oqu~iCy1fc4Xagg__&Key-Pair-Id=APKAJAGZ7VMH2PFPW6UQ',
		'title': 'Johann Sebastian Bass - \"Computer Lovin\u00b4\" (Tr\u00fcestyle Remix)'
	},
	{
		'url': 'https://cf-media.sndcdn.com/gxLcn01eQFJm.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vZ3hMY24wMWVRRkptLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE0NTU4Njg2MjZ9fX1dfQ__&Signature=yuxNCrlrZs4l1LNtDb0cCttAiCvQ794Okdud9XkNlHE4BvUztNKTpRztogW9suLbdsuLAo-CojqTjr8AmtfugwShyzsJRmG4DjHO00cbZpeqdHbu53eikZ2tlDpfpUH0qAWlDYs9oVg1EBS0C8I32xT-v9npxog3s2g3FD0c3l3SQS2ugHui1ylfq3jFD2r-rRDGXwlQKaeWUyRUd0f0sh8rJ8zSYSp47pjxphxPs2gvYXSYOZgB5h3pQQtbOdcU2w80Y7kXA4DrAwVHf9KRFw2Wukf7PtfVhTBzBCBkEQZyAS7XLfsBugBWaHpxo0G-xTS4Kr5Oqu~iCy1fc4Xagg__&Key-Pair-Id=APKAJAGZ7VMH2PFPW6UQ',
		'title': 'Johann Sebastian Bass - \"Computer Lovin\u00b4\" (Tr\u00fcestyle Remix)'
	},
	{
		'url': 'https://cf-media.sndcdn.com/gxLcn01eQFJm.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vZ3hMY24wMWVRRkptLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE0NTU4Njg2MjZ9fX1dfQ__&Signature=yuxNCrlrZs4l1LNtDb0cCttAiCvQ794Okdud9XkNlHE4BvUztNKTpRztogW9suLbdsuLAo-CojqTjr8AmtfugwShyzsJRmG4DjHO00cbZpeqdHbu53eikZ2tlDpfpUH0qAWlDYs9oVg1EBS0C8I32xT-v9npxog3s2g3FD0c3l3SQS2ugHui1ylfq3jFD2r-rRDGXwlQKaeWUyRUd0f0sh8rJ8zSYSp47pjxphxPs2gvYXSYOZgB5h3pQQtbOdcU2w80Y7kXA4DrAwVHf9KRFw2Wukf7PtfVhTBzBCBkEQZyAS7XLfsBugBWaHpxo0G-xTS4Kr5Oqu~iCy1fc4Xagg__&Key-Pair-Id=APKAJAGZ7VMH2PFPW6UQ',
		'title': 'Johann Sebastian Bass - \"Computer Lovin\u00b4\" (Tr\u00fcestyle Remix)'

	}

]








var howls = [];


var initHowl = function(title, url, i){
	howls.push(
	
		new Howl({
			urls: [url],
			onload:function(){
				console.log(title + " was loaded!");
			},
			onplay: function(){
				console.log(title + " was played!");
			},
			onend: function(){
				howls[i + 1].play();
			}
		})

	);

};


for(i = 0; i < songs.length; i++){
	console.log(i);
	console.log("initalizing " + songs[i].title);
	initHowl(songs[i].title, songs[i].url, i)
}
