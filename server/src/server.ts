// Start the server
import { httpServer } from './app'
import { PathMapping } from './enum/app/PathMapping'
import { settings } from './settings'

// Application Port
const PORT = settings.PORT

httpServer.listen(PORT, () => {
  console.log(
    `Go to http://localhost:${PORT}${PathMapping.graphql} to run queries!`
  )
})
