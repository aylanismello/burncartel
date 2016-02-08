#!flask/bin/python
from flask import Flask, jsonify, abort, make_response, request, render_template
from flask.ext.triangle import Triangle
import json
from sc import SC

app = Flask(__name__)
Triangle(app)
app.config['DEBUG'] = True


@app.route('/')
def index():
	return render_template('index.html')


@app.route('/hi')
def hi():
	return 'about that...'

@app.route('/fire')
def fire():
	feed = get_feed()
	# return ("nothing")
	return render_template('fire.html', infoz=feed)

@app.route('/getfeed', methods=['GET'])
def get_feed():
	infoz = SC().get()
	print "got: \n\n\t %s" % infoz
	return jsonify({'myjson': infoz})

@app.route('/angular')
def angular():
	print "GOT YOU"
	return render_template('/ng-fun.html')

@app.route('/getter', methods=['GET'])
def getter():
	return 'yo'

@app.route('/thejson', methods=['GET'])
def getit():
	json_file = 'static/test2.json'
	json_data = open(json_file)
	data = json.load(json_data)
	return jsonify({'myjson': data})



@app.route('/get')
def getTho():
	print 'here'
	return render_template('get.html')

@app.route('/frontend')
def get_front():
	#pass our object with all our data....
	info = [{
		'ID': '415608',
		'username': 'Louis The Child',
		'avatar_url': './artist.png',
		'track': {
			'ID': '8533',
			'title': 'Eyes On U',
			'url': '/static/eyesOnU.mp3',
			'artwork_url': 'track.png'
		}
	}]
	return render_template('play.html', info=info)
	#idea: pass our front end model a json object, and then we work in angular

@app.errorhandler(404)
def not_found(error):
	return make_response(jsonify({'error': 'Not found'}), 404)


if __name__ == '__main__':
	app.run(debug=True)
