module.exports = {
  getImages: (req, res) => {
    console.log('Server: receieved GET to /images');
    // console.log('Server: req.body:', req.body);
    // console.log('Server: req.params:', req.params);
    console.log('Server: req.query:', req.query);
  
    res.status(200).send({"title":"Taylor Swift","artist":"Taylor Swift","url":"https://www.amazon.com/Taylor-Swift/dp/B0014I4KH6","image":"https://images-na.ssl-images-amazon.com/images/I/61McsadO1OL.jpg","thumbnail_image":"https://i.imgur.com/K3KJ3w4h.jpg"});
  },

  postImages: (req, res) => {
    console.log('Server: received POST to /images');
    console.log('Server: req.body:', req.body);
    // console.log('Server: req.params:', req.params);
    // console.log('Server: req.query:', req.query);
  
    res.status(201).send({});
  }
}