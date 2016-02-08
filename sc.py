import soundcloud, json, copy

class SC(object):

	def __init__(self):
		# load json with artists to populate feed
		json_file = "data.json"
		json_data = open(json_file)
		self.data = json.load(json_data)

		#my model
		self.artistInfos = []
		self.artistInfo = {
			'ID': '',
			'username': '',
			'avatar_url': '',
			'track': {
				'ID': '',
				'title': '',
				'url': '',
				'artwork_url': ''
			}
		}

	# def everything()


	def get(self):
		client = soundcloud.Client(client_id=self.data['soundcloud_client']['id'])

		if client is None:
			print "Could not connect to client."
			return
		print("connected to client.")


		print "\n\n called!!! \n\n"
		for artist in self.data['artists']:
			# get artist access
			u = client.get('/users', q=artist['username'])
			#set artist attributes, id, username, avatar_url
			self.artistInfo['ID'] = u[0].id
			self.artistInfo['username'] = u[0].username
			# print "new username is %s" % self.artistInfo['username']
			self.artistInfo['avatar_url'] = u[0].avatar_url
			# get latest track list by user id
			t = client.get('/users/'+ str(u[0].id)+ '/tracks')
			#get id of latest track, etc, etc
			self.artistInfo['track']['ID'] = t[0].id
			self.artistInfo['track']['title'] = t[0].title
			self.artistInfo['track']['artwork_url'] = t[0].artwork_url
			#get track streaming link based on id
			track = client.get('tracks/'+str(t[0].id))
			stream_url = client.get(track.stream_url, allow_redirects=False)
			self.artistInfo['track']['url'] = stream_url.location

			print "\n\n appending %s" % self.artistInfo
			self.artistInfos.append(copy.deepcopy(self.artistInfo))
			# print "appending %s" % self.artistInfo
			# artistInfos.append(self.artistInfo)
			# print "the list of dicts so far: %s" % artistInfos



		return self.artistInfos
