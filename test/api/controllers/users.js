var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('users controller', function() {

    describe('GET /users', function() {

        it('should return a list of users', function(done) {
            request(server)
            .get('/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                //check that first user is correctly structured
                res.body[0].should.have.property('id');
                res.body[0].should.have.property('gender');
                res.body[0].should.have.property('title');
                res.body[0].should.have.property('first');
                res.body[0].should.have.property('last');
                res.body[0].should.have.property('email');
                res.body[0].should.have.property('username');
                res.body[0].should.have.property('phone');
                res.body[0].should.have.property('cell');
                res.body[0].should.have.property('picture');
                res.body[0].should.have.property('registered');
                res.body[0].should.have.property('dob');
                done();
            });
        });
    });

    describe('POST /users', function() {

        it('should return the newly created user', function(done) {
            var gender = 'male';
            var title = 'mr';
            var first = 'robin';
            var last = 'besson';
            var email = 'robin.besson@gmail.com';
            var phone = '+34651507445';
            var cell = '987654321';
            request(server)
            .post('/users')
            .field('gender', gender)
            .field('title', title)
            .field('first', first)
            .field('last', last)
            .field('email', email)
            .field('phone', phone)
            .field('cell', cell)
            .set('Accept', 'multipart/form-data')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                //check values of the returned user
                res.body.should.be.an.instanceOf(Object)
                res.body.should.have.property('id');
                res.body.should.have.property('gender', gender);
                res.body.should.have.property('title', title);
                res.body.should.have.property('first', first);
                res.body.should.have.property('last', last);
                res.body.should.have.property('email', email);
                res.body.should.have.property('username');
                res.body.should.have.property('phone', phone);
                res.body.should.have.property('cell', cell);
                res.body.should.have.property('picture');
                res.body.should.have.property('registered');
                res.body.should.have.property('dob');
                done();
            });
        });

        it('should return an error if the gender field is missing', function(done) {
            var title = 'mr';
            var first = 'robin';
            var last = 'besson';
            var email = 'robin.besson@gmail.com';
            var phone = '+3465150744';
            var cell = '987654321';
            request(server)
            .post('/users')
            .field('title', title)
            .field('first', first)
            .field('last', last)
            .field('email', email)
            .field('cell', cell)
            .set('Accept', 'multipart/form-data')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                res.error.text.should.be.instanceOf(String);
                done();
            });
        });

        it('should return an error if the email is invalid', function(done) {
            var gender = 'male';
            var title = 'mr';
            var first = 'robin';
            var last = 'besson';
            var email = 'robin.besson@malformed';
            var phone = '+3465150744M';
            var cell = '987654321';
            request(server)
            .post('/users')
            .field('gender', gender)
            .field('title', title)
            .field('first', first)
            .field('last', last)
            .field('email', email)
            .field('phone', phone)
            .field('cell', cell)
            .set('Accept', 'multipart/form-data')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                res.error.text.should.be.instanceOf(String);
                done();
            });
        });
    });

});
