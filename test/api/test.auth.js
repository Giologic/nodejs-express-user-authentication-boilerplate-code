const expect = require('chai').expect;
const request = require('supertest')

const app = require('../../node-app/app');
const conn = require('../../node-app/db/index');

const helper = require('../helper')

describe('User Authorization', () => {
  before((done) => {
    conn.connect()
      .then(() => done())
      .catch((error) => done(error))
  })
  after((done) => {
    conn.close()
      .then(() => done())
      .catch((error) => done(error))
  })

  it('OK, registering a user works', (done) => {
    request(app).post('/api/v1/auth/register')
      .send(helper.testUser)
      .then((res) => {
        const body = res.body
        expect(body).to.contain.property('id')
        expect(body).to.contain.property('firstName')
        expect(body).to.contain.property('lastName')
        expect(body).to.contain.property('email')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it('OK, logging in the registered user works', (done) => {
    request(app).post('/api/v1/auth/login')
      .send({
        email: helper.testUser.email,
        password: helper.testUser.password
      })
      .then((res) => {
        const body = res.body
        expect(body).to.contain.property('message')
        expect(body.message).to.equal('Successfully Logged in')
        expect(body).to.contain.property('token')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})