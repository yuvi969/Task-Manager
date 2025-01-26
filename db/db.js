const mongoose = require('mongoose')

const Dbconnect = (url) => {
  return mongoose
    .connect(url, {
      useNewUrlParser: true, // This option is no longer needed in newer Mongoose versions
      useUnifiedTopology: true, // This option is also no longer needed
      useCreateIndex: true, // Ensure unique index creation without deprecation warning
      useFindAndModify: false, // Avoid the deprecation warning for findOneAndUpdate()
      autoIndex: true, // Automatically build indexes (default behavior)
    })
    .then(() => console.log('MongoDB connected successfully'))
    .catch((error) => console.error('MongoDB connection error:', error))
}

module.exports = Dbconnect
