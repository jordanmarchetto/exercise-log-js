/*
	"id": "2",
	"name": "Bench Press",
	"description": null,
	"icon": "bi-trophy-fill",
	"set_types": [
		"WeightWorkoutSet"
	],
	"created_at": "2024-06-24T03:32:32.164Z",
	"updated_at": "2024-06-24T03:32:32.164Z",
	"show_on_records": true
*/
const serializeExercises = (rows) => {
  return rows.map(serializeExercise);
};
const serializeExercise = (row) => {
  const {
    id,
    name,
    description,
    icon,
    created_at,
    updated_at,
    show_on_records,
  } = row;
  return {
    id,
    name,
    description,
    icon,
    created_at,
    updated_at,
    show_on_records,
  };
};

module.exports = {
  serializeExercise,
  serializeExercises,
};
