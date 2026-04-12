const serializeExercises = (rows) => {
    return rows.map(serializeExercise);
}
const serializeExercise = (row) => {
    // return { id: row.id, name: row.name };
    return { ...row };
}


module.exports = {
  serializeExercise,
  serializeExercises,
}