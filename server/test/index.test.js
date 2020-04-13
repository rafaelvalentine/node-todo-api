const request = require('supertest')
const expect = require('expect')
const express = require('express')


const { app } = require('../index')
const { Todo } = require('../database')

beforeEach(done => {
    Todo.remove({})
        .then(() => done())
})
describe('POST /todo', () => {

    it('should create a new Todo', done => {
        const text = 'Test create Todo'
        request(app)
            .post('/todo')
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
                    });
            })
    })


    it('should not create a new Todo', done => {
        request(app)
            .post('/todo')
            .send({})
            .expect(400)
            .end((err, res) => {

                if (err) return done(err)
                Todo.find()
                    .then((result) => {
                        expect(result.length).toBe(0)
                        done()
                    }).catch((err) => {
                        done(err)
                    });
            })
    })
})