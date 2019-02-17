const mongoose = require('mongoose');
mongoose.set('debug',true);

const NoteSchema = mongoose.Schema({
	title: String,
	content: String
}, {
	timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);