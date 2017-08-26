module.exports = {
  getImages: (req, res) => {
    console.log('Server: receieved GET to /images');
    // console.log('Server: req.body:', req.body);
    // console.log('Server: req.params:', req.params);
    console.log('Server: req.query:', req.query);
  
    res.status(200).send('this GET request successful on server dawg, yaaaah!!!');
  },

  postImages: (req, res) => {
    console.log('Server: received POST to /images');
    console.log('Server: req.body:', req.body);
    // console.log('Server: req.params:', req.params);
    // console.log('Server: req.query:', req.query);
    // console.log('Server: req.query:', req.route);    
  
    res.status(201).send('this POST request success on server dawg, sweeeeet');
  }
}