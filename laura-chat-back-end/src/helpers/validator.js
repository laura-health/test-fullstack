const { body, validationResult } = require('express-validator')

const validateRequest = (method) => {
    switch (method) {
        case 'createRoom':
            return [
                body('room_name').isLength({min:1}).withMessage('Room name must be at least one character'),
                body('owner_id').isLength({min:24,max:24}).withMessage('Wrong id format'),
                body('owner_name').isString().withMessage('You must pass the name of the owner')
              ]
            break; 
        case 'joinRoom':
            return [
                body('room_id').isLength({min:24,max:24}).withMessage('Wrong id format'),
                body('user_id').isLength({min:24,max:24}).withMessage('Wrong id format'),
                body('user_name').isString().withMessage('You must pass the name of the user')
              ]
            break; 
        default:
            break;
    }
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {validateRequest,validate};