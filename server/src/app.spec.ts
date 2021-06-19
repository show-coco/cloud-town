import request from 'supertest'
import { app } from './app'
import { PathMapping } from './enum/app/PathMapping'

describe('Test the root path', () => {
  it('It should response the GET method', (done) => {
    void request(app)
      .get(PathMapping.graphql)
      .then((response) => {
        expect(response.statusCode).toBe(400)
        done()
      })
  })
})
