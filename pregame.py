import json, soundcloud, copy

class Pregame(object):
	def __init__(self):

		json_file = "data.json"
		json_data = open(json_file)
		self.data = json.load(json_data)

		self.client = soundcloud.Client(client_id=self.data['soundcloud_client']['id'])

		#define model
		self.user = {
			'soundcloud': {
				'username': '',
				'ID': 0,
				'avatar_url': '',
				'city': '',
				'country': '',
				'description': '',
				'website': '',
				'track_count': 0,
				'playlist_count': 0,
				'followers_count': 0,
				'followings_count': 0,
				'tracks': []
				},
			'bc': {

			}

		}

		self.track = {
			'ID': 0,
			'title': '',
			'artwork_url': '',
			'streamable': False,
			'genre': '',
			'stream_url': '',
			'permalink_url': ''
		}

		self.users = []


# users should have always updated 1. username, 2. id, 3. track_count, 4. follower_count

	def refresh(self):
		i = 0
		for artist in self.data['artists']:
			u = self.client.get('/users', q=artist['username'])
			# print u[0].username
			u = u[0]

			# print u.username
			self.user['soundcloud']['username'] = u.username
			self.user['soundcloud']['ID'] = u.id
			self.user['soundcloud']['avatar_url'] = u.avatar_url
			self.user['soundcloud']['city'] = u.city
			self.user['soundcloud']['country'] = u.country
			self.user['soundcloud']['description'] = u.description
			self.user['soundcloud']['website'] = u.website
			self.user['soundcloud']['track_count'] = u.track_count
			self.user['soundcloud']['playlist_count'] = u.playlist_count
			self.user['soundcloud']['followers_count'] = u.followers_count
			self.user['soundcloud']['followings_count'] = u.followings_count

			tracks = self.client.get('/users/'+ str(self.user['soundcloud']['ID'])+ '/tracks')

			for t in tracks:
				self.track['ID'] = t.id
				self.track['title'] = t.title
				self.track['artwork_url'] = t.artwork_url
				self.track['genre'] = t.genre
				self.track['streamable'] = t.streamable

				if t.streamable:
					self.track['stream_url'] = t.stream_url

				self.track['permalink_url'] = t.permalink_url
				self.user['soundcloud']['tracks'].append(copy.deepcopy(self.track))

			# self.user['soundcloud']['tracks'] = tracks

			# then make up your own metrics here.






			self.users.append(copy.deepcopy(self.user))
			print "on number %d " % i
			i += 1

		newJson = {
			'users': self.users
		}

		with open('out.json', 'w') as fp:
			json.dump(newJson, fp)


		print self.users

Pregame().refresh()

		# self.testDict = {
		# 	'name': 'me',
		# 	'age': 24
		# }
		#
		# with open("out.json", "w") as outfile:
    	# 	json.dump({'numbers':n, 'strings':s, 'x':x, 'y':y}, outfile, indent=4)

		# json_file = "out.json"
		# json_data = open(json_file)
		# self.data = json.load(json_data)
