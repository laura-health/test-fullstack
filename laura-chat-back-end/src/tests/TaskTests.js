const test = require('tape');
const taskController = require('../controllers/TaskController');
const supertest = require('supertest')
const app = require('../index.js'); 

test('PUT COMPLETE TASK /tasks/complete', (t) => {
    supertest(app)
      .put('/tasks/complete')
      .send({task_id: '5e22c40dd88f951a1c8d48b9'})
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) =>{
        t.assert(res.status === 200, "TEST COMPLETED THE TASK")
      })

});

