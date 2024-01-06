const validateRequisition = joiSchema => async (req, res, next) => {
    try {
        await joiSchema.validateAsync(req.body)
        next()
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({ mensagem: error.message })
    }
}

module.exports = validateRequisition
