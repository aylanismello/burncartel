import soundcloud, json, copy, random

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
				'artwork_url': '',
				'permalink_url': ''
			}
		}

	# def everything()


	def get(self):
		client = soundcloud.Client(client_id=self.data['soundcloud_client']['id'])

		if client is None:
			print "Could not connect to client."
			return
		print "connected to client of %s " % client


		print "\n\n called!!! \n\n"
		numArtistsPerQuery = 6

		upperBound = len(self.data['artists'])
		print "artist num in json file is %d" % upperBound

		i = 0
		while i < numArtistsPerQuery:
			temp = i
			artistNum = random.randint(0, upperBound-1)
			print "go artist num %d" % artistNum
			artist = self.data['artists'][artistNum]


			u = client.get('/users', q=artist['username'])

			#print "got user data of %s" % u

			#set artist attributes, id, username, avatar_url
			self.artistInfo['ID'] = u[0].id
			self.artistInfo['username'] = u[0].username
			self.artistInfo['avatar_url'] = u[0].avatar_url
			# get latest track list by user id

			# what if we want favorites?
			# t = client.get('/users/'+ str(u[0].id)+ '/favorites')
			t = client.get('/users/'+ str(u[0].id)+ '/tracks')
			#get id of latest track, etc, etc

			trackCount = len(t)
			#print "artist %s has %d tracks " % (self.artistInfo['username'], trackCount)

			if trackCount != 0:
				trackNum = random.randint(0, trackCount - 1)
				print "selecting track %d" % trackNum
			else:
				print "\n\n\ntrack count is 0, you are fucked.\n\n\n"

			self.artistInfo['track']['ID'] = t[trackNum].id
			self.artistInfo['track']['title'] = t[trackNum].title
			self.artistInfo['track']['artwork_url'] = t[trackNum].artwork_url
			#get track streaming link based on id

			stringTrackID = str(t[trackNum].id)
			print "getting track url of track id: %s " % stringTrackID

			track = client.get('tracks/'+stringTrackID)

			#MUST CHECK IF TRACK IS STREAMABLE
			print("is track streamable? %s ") % track.streamable

			if not track.streamable:
				print("track not streamable, should get another track\n\n\n\n")
				i = temp #bug if i is 0
			else:


				if track is None:
					raise AttributeError('fucked up in getting track\n\n\n\n">')

				print "should deal with %s for getting stream_url of %s" % (track, track.stream_url)

				stream_url = client.get(track.stream_url, allow_redirects=False)
				permalink_url = track.permalink_url

				if stream_url is None:
					raise AttributeError('fucked up in getting stream_url\n\n\n\n">')

				self.artistInfo['track']['url'] = stream_url.location
				self.artistInfo['track']['permalink_url'] = permalink_url
				self.artistInfos.append(copy.deepcopy(self.artistInfo))
				i += 1


		return self.artistInfos
