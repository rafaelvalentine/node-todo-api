const request = require('supertest')
const expect = require('expect')
const { ObjectID } = require('mongodb')

const { app } = require('../index')
const { populateTodos, testTodos, populateUsers, testUsers } = require('./seed')
const { Todo } = require('../database')

beforeEach(done => {
    populateUsers(done)
})
beforeEach(done => {
    populateTodos(done)
})
describe('POST /api/v1/todo', () => {
    it('should create a new Todo', done => {
        const text = 'Test create Todo'
        request(app)
            .post('/api/v1/todo')
            .send({ text })
            .expect(200)
            .expect(res => {
                expect(res.body.text).toBe(text)
            })
            .end((err, res) => {
                let text = res.body.text
                if (err) return done(err)
                Todo.findOne({ text })
                    .then((result) => {
                        expect(result.text).toBe(text)
                        done()
                    }).catch((err) => {
                        done(err)
                    })
            })
    })

    it('should not create a new Todo', done => {
        request(app)
            .post('/api/v1/todo')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) return done(err)
                Todo.find()
                    .then((result) => {
                        expect(result.length).toBe(2)
                        done()
                    }).catch((err) => {
                        done(err)
                    })
            })
    })
})

describe('GET /api/v1/todo', () => {
    it('should get all todos', done => {
        request(app)
            .get('/api/v1/todo')
            .expect(200)
            .expect(res => {
                expect(res.body.data.length).toBe(2)
            })
            .end(done)
    })
})

describe('GET /api/v1/todo:id', () => {
    it('should return todo doc', done => {
        request(app)
            .get(`/api/v1/todo/${testTodos[0]._id.toHexString()}`)
            .expect(200)
            .expect(res => {
                expect(res.body.data.text).toBe(testTodos[0].text)
            })
            .end(done)
    })
    it('should return 404 if todo not found', done => {
        request(app)
            .get(`/api/v1/todo/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done)
    })
    it('should return 400 for non-objectId', done => {
        request(app)
            .get(`/api/v1/todo/${123}`)
            .expect(400)
            .end(done)
    })
})

describe('DELETE /api/v1/todo:id', () => {
    it('Should remove a Todo', done => {
        const hexId = testTodos[1]._id.toHexString()
        request(app)
            .delete(`/api/v1/todo/${hexId}`)
            .expect(200)
            .expect(res => {
                expect(res.body.data._id).toBe(hexId)
            })
            .end((err, res) => {
                if (err) return done(err)
                Todo.findById(hexId)
                    .then((result) => {
                        expect(result).toNotExist()
                        done()
                    }).catch((err) => {
                        done(err)
                    })
            })
    })
    it('Should return 404 if the todo is not found', done => {
        const hexId = new ObjectID().toHexString()
        request(app)
            .delete(`/api/v1/todo/${hexId}`)
            .expect(404)
            .end(done)
    })
    it('Should return 400 if the todoID is not valid', done => {
        request(app)
            .delete(`/api/v1/todo/${123}`)
            .expect(400)
            .end(done)
    })
})

describe('PATCH /api/v1/todo:id', () => {
    it('Should update Todo', done => {
        const hexId = testTodos[0]._id.toHexString()
        const text = 'test update a todo'
        const completed = true
        request(app)
            .patch(`/api/v1/todo/${hexId}`)
            .send({...testTodos[0], text, completed })
            .expect(200)
            .expect(res => {
                const body = res.body.data
                expect(body.text).toBe(text)
                expect(body.completed).toBe(true)
                expect(body.completedAt).toBeA('number')
            })
            .end(done)
    })
    it('Should clear completedAt when todo not completed', done => {
        const hexId = testTodos[1]._id.toHexString()
        const text = 'test update a todo'
        const completed = false
        request(app)
            .patch(`/api/v1/todo/${hexId}`)
            .send({...testTodos[1], text, completed })
            .expect(200)
            .expect(res => {
                const body = res.body.data
                expect(body.text).toBe(text)
                expect(body.completed).toBe(false)
                expect(body.completedAt).toNotExist()
            })
            .end(done)
    })
})

describe('Get /api/v1/user/info/:id', () => {
    it('it should return user if authenticated', done => {
            request(app)
                .get(`/api/v1/user/info/${testUsers[0]._id.toHexString()}`)
                .set('Authorization', `Bearer ${testUsers[0].tokens[0].token}`)
                .set('x-auth', testUsers[0].tokens[0].token)
                .expect(200)
                .expect(res => {
                    expect(res.body.data._id).toBe(testUsers[0]._id.toHexString())
                    expect(res.body.data.email).toBe(testUsers[0].email)
                })
                .end(done)
        })
        // it('it should return 401 if user not authenticated', done => {

    // })
    // it('it should return 400 if userid is not sent', done => {

    // })
})