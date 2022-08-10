const Hubs = require('./hubs-model');

function validateHub(req, res, next) {
  if(typeof req.body.name !== 'string') {
    res.status(400).json({ message: 'name must be a string' });
  } else if(req.body.name.trim() === '') {
    res.status(400).json({ message: 'name must not be empty' });
  } else {
    req.newHub = { name: req.body.name.trim() };
    next();
  }
}

function validateHubIsUnique(req, res, next) {
    Hubs.findByName(req.newHub.name)
        .then(result => {
            if(result != null) {
                res.status(400).json({ message: 'name must be unique' });
                return;
            }

            next();
        });
}

module.exports = {
    validateHub,
    validateHubIsUnique,
};