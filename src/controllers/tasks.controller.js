import taskDao from "../dao/tasks.dao.js";
import Task from "../models/tasks.model.js";


function getTaskStatusClass(task) {
    const serverDate = new Date();
    const dueDate = new Date(task.dueDate);

    if (dueDate < serverDate) {
        return 'overdue';
    } else {
        return '';
    }
}

export const getAllTasks = (req, res) => {
  taskDao
    .getAll()
    .then((tasks) => {
      res.render("../src/views/index.ejs", { tasks, getTaskStatusClass }); 
    })
    .catch((err) => {
      res.json(err);
    });
};



export const getOneTask = (req, res) => {
  const taskId = req.params.id_task; 
  taskDao
    .getOne(taskId)
    .then((task) => {
      if (task) {
        const today = new Date();
        const taskDueDate = new Date(task.dueDate);
        
        if (taskDueDate < today) {
          res.render("../src/views/edit.ejs", { task }); 

        } else {
          res.render("../src/views/edit.ejs", { task }); 
        }
      } else {
        res.json({
          status: "Task not found",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: "Server unavailable",
      });
    });
};


export const insertTask = (req, res) => {
  taskDao
    .insertTask(req.body)
    .then((result) => {
      if (result) {
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.json({
        status: "Server unavailable",
      });
    });
};



export const updateTask = (req, res) => {
  taskDao
    .updateTask(req.params.id_task, req.body) 
    .then((result) => {
      if (result) {
        
      } else {
        res.status(404).send("Task not found"); // Manejar el caso en que la tarea no se encuentre
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        status: "Server unavailable",
      });
    });
};
  

export const deleteTask = (req, res) => {
  const taskId = req.params.id_task; 
  taskDao
    .deleteTask(taskId)
    .then((result) => {
      if (result) {
        console.log("ELIMINADO");
        res.redirect("/");
      } else {
        // res.render("../src/views/index.ejs", { task }); // Ajustar la renderización para pasar los productos
      }
    })
    .catch((err) => {
      res.json({
        status: "Server unavailable",
      });
    });
};


// export const deleteTask = (req, res) => {
//   const taskId = req.params.id_task;
//   taskDao
//     .deleteTask(taskId)
//     .then((result) => {
//       if (result) {
//         res.json({
//           status: "OK",
//           message: "Tarea eliminada exitosamente"
//         });
//       } else {
//         res.status(404).json({
//           status: "Error",
//           message: "La tarea no se encontró"
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({
//         status: "Error",
//         message: "Error en el servidor al intentar eliminar la tarea"
//       });
//     });
// };
