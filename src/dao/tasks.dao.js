import Task from "../models/tasks.model.js";

const taskDao = {};

taskDao.getAll = async () => {
  try {
    const tasks = await Task.find();
    return tasks;
  } catch (error) {
    throw new Error("Error al obtener todas las tareas: " + error.message);
  }
};


taskDao.getOne = async (id) => {
  try {
    const task = await Task.findOne({ id_task: id });
    return task;
  } catch (error) {
    throw new Error("Error al obtener la tarea: " + error.message);
  }
};


taskDao.insertTask = async (taskData) => {
  try {
    const newTask = new Task(taskData);
    await newTask.save();
    return true;
  } catch (error) {
    throw new Error("Error al insertar la tarea: " + error.message);
  }
};

taskDao.updateTask = async (id, taskData) => {
  try {
    await Task.findOneAndUpdate({ id_task: id }, taskData);
    return true;
  } catch (error) {
    throw new Error("Error al actualizar la tarea: " + error.message);
  }
};


taskDao.deleteTask = async (id) => {
  try {
    const deletedTask = await Task.findOneAndDelete({ id_task: id });
    if (deletedTask) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error("Error al eliminar la tarea: " + error.message);
  }
};


export default taskDao;
