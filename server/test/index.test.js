const request = require('supertest')
const expect = require('expect')
const { ObjectID } = require('mongodb')

const { app } = require('../index')
const { Todo } = require('../database')
const testTodos = [{
        _id: new ObjectID(),
        text: 'todod 1'
    },
    {
        _id: new ObjectID(),
        text: 'todo 2'
    }
]
beforeEach(done => {
    Todo.remove({})
        // .then(() => done())
        .then(() => {
            Todo.insertMany(testTodos)
                .then(() => done())
        })
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