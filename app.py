#!flask/bin/python
from flask import Flask, jsonify, abort, make_response, request, render_template
from flask.ext.triangle import Triangle
import json
from sc import SC

app = Flask(__name__)
Triangle(app)
app.config['DEBUG'] = True
app.config['PROPOGATE_EXCEPTIONS'] = True

def __init__(self):
	print "in this bitch!"


@app.route('/')
def index():
	print 'rendering index.html\n\n'
	return render_template('index.html')

@app.route('/howler')
def howler():
	return render_template('howler.html')

@app.route('/about')
def about():
	return 'here is all about us!!'

@app.route('/getfeed/<int:genre_id>', methods=['GET'])
def get_feed(genre_id):
	print genre_id
	infoz = SC().get()
	print "got: \n\n\t %s" % infoz
	return jsonify({'myjson': infoz})

@app.route('/getfull', methods=['GET'])
def getfull():
	infoz = SC().getfull()
	return jsonify({'myjson': infoz})


@app.route('/getfeed/', methods=['GET'])
def get_feed2():
	print "get feed has been called \n\n"
	infoz = SC().get()

	if infoz is None:
		raise AttributeError('did not properly return from SC.get()\n\n\n')

	# print "got: \n\n\t %s" % infoz
	return jsonify({'myjson': infoz})



@app.errorhandler(404)
def not_found(error):
	return make_response(jsonify({'error': 'Not found'}), 404)

if __name__ == '__main__':
	app.run(debug=True)
