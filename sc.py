import soundcloud, json, copy, random, time

class SC(object):

	def __init__(self):
		# load json with artists to populate feed
		starttime = time.time()

		json_file = "data.json"
		json_data = open(json_file)
		self.api_data = json.load(json_data)


		json_file = "out.json"
		json_data = open(json_file)
		self.data = json.load(json_data)

		elapsedtime = time.time() - starttime
		print ("took %d seconds to load json" % elapsedtime)



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
		client = soundcloud.Client(client_id=self.api_data['soundcloud_client']['id'])

		if client is None:
			print "Could not connect to client."
			return
		print "connected to client of %s " % client

		numArtistsPerQuery = 6

		upperBound = len(self.data['users'])

		print "artist num in json file is %d" % upperBound
		getRequests = 0 # soundcloud api queries
		startTime = time.time() # start time
		i = 0

		while i < numArtistsPerQuery:

			temp = i
			userNum = random.randint(0, upperBound-1)
			# userNum = 0
			user = self.data['users'][userNum]

			print ("user of %s " % user)

			self.artistInfo['avatar_url'] = user['soundcloud']['avatar_url']
			self.artistInfo['ID'] = user['soundcloud']['ID']
			self.artistInfo['username'] = user['soundcloud']['username']

			print ("added %s" % user['soundcloud']['username'])

			#TRACKLIST
			tracklist = user['soundcloud']['tracks']

			trackCount = len(tracklist)
			#print "artist %s has %d tracks " % (self.artistInfo['username'], trackCount)

			if trackCount != 0:
				trackNum = random.randint(0, trackCount - 1)
				print "selecting track %d" % trackNum
			else:
				print "\n\n\ntrack count is 0, you are fucked.\n\n\n"

			# trackNum = 0

			self.artistInfo['track']['ID'] = tracklist[trackNum]['ID']
			self.artistInfo['track']['title'] = tracklist[trackNum]['title']
			self.artistInfo['track']['artwork_url'] = tracklist[trackNum]['artwork_url']


			print ("added track %s " % tracklist[trackNum]['title'])

			track = tracklist[trackNum]



			#MUST CHECK IF TRACK IS STREAMABLE

			if not track['streamable']:
				print("track not streamable, should get another track\n\n\n\n")
				i = temp #bug if i is 0
			else:
				stream_url = 'balls'

				stream_url = client.get(track['stream_url'], allow_redirects=False)

				if stream_url is None:
					raise AttributeError('fucked up in getting stream_url\n\n\n\n">')

				self.artistInfo['track']['url'] = stream_url.location
				# print stream_url.location
				self.artistInfo['track']['permalink_url'] = track['permalink_url']
				self.artistInfos.append(copy.deepcopy(self.artistInfo))
				i += 1

		elapsedTime = time.time() - startTime

		print ("time for this update was %d" % elapsedTime)

		#BREAKS HERE

		for artistInfo in self.artistInfos:
			print ("got %s by % s " % (artistInfo['track']['title'], artistInfo['username']) )

		print "total of %d get requests" % getRequests
		return self.artistInfos

	def getfull(self):
		client = soundcloud.Client(client_id=self.api_data['soundcloud_client']['id'])

		returnTracks = []

		track = {
			'title': '',
			'steam_url': ''
		}

		if client is None:
			print "Could not connect to client."
			return

		thisID = 448
		tracks = client.get('/users/'+ str(thisID)+ '/tracks')

		for t in tracks:
			track['stream_url'] = t.stream_url
			track['title'] = t.title
			if t.streamable:
				track['stream_url'] = client.get(track['stream_url'], allow_redirects=False).location
			else:
				track['stream_url'] = "FUCK YOU"
			returnTracks.append(track)





		return returnTracks
