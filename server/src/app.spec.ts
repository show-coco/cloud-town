import request from 'supertest'
import { app } from './app'
import { PathMapping } from './enum/app/PathMapping'

describe('Test the root path', () => {
  it('It should response health', (done) => {
    void request(app)
      .get(PathMapping.health)
      .then((response) => {
        expect(response.statusCode).toBe(200)
        done()
      })
  })
})
