const router = require('express').Router();

router.use('/health', require('./health'));
router.use('/exercises', require('./exercises'));

module.exports = router;

//TODO: moar routes
//TODO: documentation
//TODO: deployment

/*
  Routes

  Top-level:
  GET     /recent_workouts                         recent_workouts#index
  GET     /tools                                   tools#index
  GET     /records                                 records#index

  Exercise workout sets:
  GET     /exercises/:exercise_id/workout_sets     workout_sets#index
  POST    /exercises/:exercise_id/workout_sets     workout_sets#create
  GET     /exercises/:exercise_id/workout_sets/new workout_sets#new
  GET     /exercises/:exercise_id/workout_sets/:id/edit workout_sets#edit
  GET     /exercises/:exercise_id/workout_sets/:id  workout_sets#show
  PATCH   /exercises/:exercise_id/workout_sets/:id  workout_sets#update
  PUT     /exercises/:exercise_id/workout_sets/:id   workout_sets#update
  DELETE  /exercises/:exercise_id/workout_sets/:id   workout_sets#destroy

  Exercises:
  GET     /exercises                               exercises#index
  POST    /exercises                               exercises#create
  GET     /exercises/new                           exercises#new
  GET     /exercises/:id/edit                      exercises#edit
  GET     /exercises/:id                           exercises#show
  PATCH   /exercises/:id                           exercises#update
  PUT     /exercises/:id                           exercises#update
  DELETE  /exercises/:id                           exercises#destroy
  */
