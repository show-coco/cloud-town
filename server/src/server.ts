// Start the server
import { app } from './app'
import { PathMapping } from './enum/app/PathMapping'
import { settings } from './settings'

// Application Port
const PORT = settings.PORT

app.listen(PORT, () => {
  console.log(
    `Go to http://localhost:${PORT}${PathMapping.graphql} to run queries!`
  )
})
