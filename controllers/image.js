const Clarifai = require('clarifai');       // importing clarifi after installing through npm read documentation

const app = new Clarifai.App({              //most APIs you'll use are gonna be similar to this
 apiKey: 'b85dc6baa7b7494b88201a12115fd6f9'
});

const handleApiCall = (req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('unable to fect API'))
}

const handleImage = (req, res, dB) => {
	const { id } = req.body;

	dB('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
};