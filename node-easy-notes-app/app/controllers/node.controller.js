const Note = require('../models/note.model.js');

//Create and Save New Note
exports.create = (req, res) => {
	
	console.log('Create and Save New Note');
	
	//console.log('request body content==>',req.body.content);
	//validate request (?? content can be empty)
	/* if(!req.body.content){
		return res.status(400).send({
			message: 'Note content can not be empty'
		});
	 }*/
	
	//create a new note
	const note = new Note({
		title : req.body.title || 'Untitled Note',
		content : req.body.content
	});
	
	//save in DB
	note.save()
	.then(data => res.status(201).send(data))
	.catch(err => {
		res.status(500).send({
			message: err.message || "Some error occurred while creating the Note." 
		})
	});
	
}

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
	
	console.log('Retrieve and return all notes from the database.');
	
	Note.find()
	.then(notes => {
		res.status(200).send(notes);
	})
	.catch(err => {
		res.status(500).send({
			message: err.message || "Some error occurred while searching notes"
		});
	});
	
}



//Find a single note with a title
exports.findByTitle = (req, res) => {
	console.log('Retrieve a single note with a title' , req.query.title);
	Note.findOne({"title": req.query.title}, function(err, note) {
		
		
		
		if(err){
			return res.status(404).send({
				message : "cant find any note with error" + err
			});
		}
		
		if(!note){
			return res.status(404).send({
				message : "cant find any note with given id" + req.params.noteId
			});
		}
	
		//res.status(200).send(note);
		res.status(200).send(note);
	});
	
	
	
	//res.send(res.query);
}


// Find a single note with a noteId
exports.findById = (req, res) => {
	console.log('Retrieve a single note with a noteId' , req.params.noteId);
	
	Note.findById(req.params.noteId)
	.then(note => {
		if(!note){
			return res.status(404).send({
				message : "cant find any note with given id" + req.params.noteId
			});
		}
	
		res.status(200).send(note);
	})
	.catch(err => {
		
		if(err.kind === 'ObjectId'){
			return res.status(404).send({
				message: err.message || "Some error occurred while searching note with given id" + req.params.noteId
			});
		}
		
		return res.status(500).send({
				message: err.message || "Some error occurred while searching note with given id" + req.params.noteId
			});
	});
}


/*// Find a single note with a title(?? Still Research Needed) 
exports.findByTitle = (req, res) => { 
	console.log('Retrieve a single note with a title' , req.query.title);
	
	Note.findByOne({title: req.query.title}, {
		
	})
	.then(note => {
		if(!note){
			return res.status(404).send({
				message : "cant find any note with given title" + req.params.title
			});
		}
	
		res.status(200).send(note);
	})
	.catch(err => {
		res.status(500).send({
		});
	});
};*/

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
	console.log('Update a note identified by the noteId in the request');
	
	//Validate Request Content
	if(!req.body.content){
		return res.status(400).send({
				message: "Note Content can not be Empty"
			}); 
	}
	
	// Find note and update it with the request body
	Note.findOneAndUpdate({_id : req.params.noteId}, {
		title: req.body.title || 'Untitled Note',
		content: req.body.content	
	}, {new: true})
	.then(note => {
		
		if(!note){
			return res.status(404).send({
				message : "cant find any note with given id" + req.params.noteId
			});
		}
		
		res.status(200).send(note);
	})
	.catch(err => {
		
		if(err.kind === 'ObjectId'){
			return res.status(404).send({
				message: err.message || "Some error occurred while updating note with given noteId" + req.params.noteId
			});
		}
		
		return res.status(500).send({
				message: err.message || "Some error occurred while updating note with given noteId" + req.params.noteId
			});
	});
	
}

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
	console.log('Delete a note with the specified noteId in the request');
	
	Note.findByIdAndDelete(req.params.noteId)
	.then(note => {
		if(!note){
			return res.status(404).send({
				message: err.message || " There is No note found with given noteId " + req.params.noteId
			});
		}
		res.status(200).send({message : "Note Deleted Successfully"});
	})
	.catch(err => {
		
		if(err.kind === 'ObjectId'){
			return res.status(404).send({
				message: err.message || "No Note found with given noteId " + req.params.noteId
			});
		}
		
		return res.status(500).send({
				message: err.message || "Some error occurred while updating note with given noteId " + req.params.noteId
			});
	});
}