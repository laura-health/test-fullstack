const {Router} = require('express');
const UserController = require('../controllers/UserController');
const RoomController = require('../controllers/RoomController');
const TaskController = require('../controllers/TaskController');
const AnnotationController = require('../controllers/AnnotationController');
const PatientController = require('../controllers/PatientController');
const { validateRequest, validate } = require('../helpers/validator');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const routes = Router();

//SWAGGER
routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

//ROOMS
routes.get('/rooms/:id',RoomController.getUserRooms);
routes.get('/rooms/find/user/:id', RoomController.findUserRoom);
routes.get('/rooms/find/room/:id', RoomController.findRoom);
routes.get('/rooms/find/possibilities/:id', RoomController.findPossibilities);
routes.post('/rooms/create', RoomController.createRoom);
routes.put('/rooms/join',validateRequest('joinRoom'),validate, RoomController.joinRoom);
routes.put('/rooms/sendMessage',RoomController.receiveMessage);

//USER
routes.get('/users/:user_id', UserController.getUser);
routes.post('/users/create', UserController.createUser);
routes.post('/users/login', UserController.login);

//TASK
routes.get('/tasks/:id',     TaskController.findFilterTasks);
routes.post('/tasks/create', TaskController.createTask);
routes.put('/tasks/assign',  TaskController.assignTask);
routes.put('/tasks/complete',TaskController.completeTask);

//ANNOTATIONS
routes.post('/annotations/create', AnnotationController.createAnnotation);
routes.get('/annotations/:room_id', AnnotationController.getAnnotations);

//PATIENT
routes.post('/patient/create', PatientController.createPatient);
routes.get('/patient/:patient_id', PatientController.getPatient);

module.exports = routes;