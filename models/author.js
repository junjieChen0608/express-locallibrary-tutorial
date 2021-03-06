var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

function formatDate(date) {
  return date ? moment(date).format('YYYY-MM-DD') : '';
}
// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
  return formatDate(this.date_of_birth)
         + ' - ' + formatDate(this.date_of_death);
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

// virtual for birth date
AuthorSchema
.virtual('date_of_birth_formatted')
.get(function() {
  return formatDate(this.date_of_birth);
})

// virtual for death date
AuthorSchema
.virtual('date_of_death_formatted')
.get(function() {
  return formatDate(this.date_of_death);
})

//Export model
module.exports = mongoose.model('Author', AuthorSchema);
