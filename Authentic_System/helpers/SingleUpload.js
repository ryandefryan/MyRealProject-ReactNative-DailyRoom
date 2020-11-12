const multer = require('multer')

const multerSingleUpload = () => {
    var diskStorage = multer.diskStorage({
        destination : function (req, file, next){
            next(null, 'supports/images/public/Profile_Images') // Folder Storage
        },
        filename : function (req, file, cb){
            cb(null, 'PIMG' + '-' + Date.now() + '.' + file.mimetype.split('/')[1]) // Nama File Yang Disimpan ke Storage
        }
    })
    
    var fileFilter = (req, file, next) => {
        try {
            if(file.mimetype.includes('image') === false) throw 'File Type Must Be Image'
            next(null, true)
        } catch (error) {
            req.filteringValidation = error
            next(null, false)
        }
    }
    
    const singleUpload = multer({storage : diskStorage, fileFilter : fileFilter, limits : {fileSize : 5 * 1000000, fieldSize: 25 * 1024 * 1024}}).single('image')
    
    return singleUpload
}

module.exports = multerSingleUpload