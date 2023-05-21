import express from 'express'
import { json } from 'body-parser'
import { currentuserRouter } from './routes/current-user'
import { signupRouter } from './routes/signup'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { errorHandler as GlobalErrorHandler } from './middlewares/error-handler'

const app = express()
app.use(json())

app.use(currentuserRouter)
app.use(signupRouter)
app.use(signoutRouter)
app.use(signinRouter)

// This should be the last middleware
app.use(GlobalErrorHandler)

app.listen(3000, () => {
    console.log('listening on port 3000')
})