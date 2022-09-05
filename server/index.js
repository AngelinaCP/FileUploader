const cors = require('cors');
const path = require('path')
const multer = require('multer')
const express = require('express')
const bodyParser = require('body-parser')

const app = new express();
app.use(cors())
app.use(bodyParser.json())
app.use(express.static(__dirname));

const PORT = 3001;

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(__dirname);
        cb(null, path.join(__dirname, '/uploads/'));
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
    fileFilter: function(req, file, callback) {
        const ext = path.extname(file.originalname);
        if (ext != '.png' && ext != '.jpg' && ext != '.gif' && ext != '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true);
    }
})


const upload = multer({storage: storage});
const fileUpload = upload.fields([{name: 'image-file', maxCount: 1}])

app.route('/').get((req, res) => {
    res.json('./uploads/0835ff03377c8119d459c409fcecdc9a' + '.jpg')
})

app.get('/fetchImage/:file(*)', (req, res) => {
    let file = req.params.file;
    let fileLocation = path.join(__dirname + '/uploads/', file);
    //res.send({image: fileLocation});
    console.log('fileLocation', fileLocation);
    res.sendFile(`${fileLocation}`)
})

app.route('/').post(fileUpload, (req, res) => {
    const obj = JSON.parse(JSON.stringify(req.body));
    console.log(obj);
    res.json({message: "Form submitted successfully"})
})

app.listen(PORT, () => console.log(`Server is listening at ${PORT}`))