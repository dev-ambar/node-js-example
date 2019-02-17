module.exports = (app) => {
	const noteControler = require('../controllers/node.controller.js');
	
	
	//Create a new post
	app.post('/notes' , noteControler.create);
	
	//get All Posts
	app.get('/notes', noteControler.findAll);

	// Retrieve a single Note with noteId
	app.get('/notes/:noteId', noteControler.findById);
	
	
	// Retrieve a single Note with title (?? Still Research Needed)
	app.get('/notesByTitle', noteControler.findByTitle);
	
	//Update a single Note with noteId
	app.put('/notes/:noteId', noteControler.update);
	
	//Delete a Single Note with noteId
	app.delete('/notes/:noteId', noteControler.delete);
	
}