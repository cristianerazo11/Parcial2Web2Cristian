const router = require("express").Router();
const { connectClient } = require("../db/postgres");
const Todo = require("../src/models/todoModel");

// Index
router.get("/", async (req, res) => {
    const client = await connectClient();
    try {
        const result = await client.query("SELECT * FROM todos");
        res.render('todos/index', { todos: result.rows });
    } catch (error) {
        res.status(500).send(error.message);
    } finally {
        await client.end();
    }
});

//store
router.post("/", async (req,res) => {
    console.log(req.body);
    try{
        const {title, completed} = req.body;
        await Todo.create({ title, completed: completed ==  'on' ? true : false });
        res.redirect('todospanel')

    }catch (error){
        res.status(500).send(error.message);
    }
});

// update for id
router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const todos = await Todo.findAll();
    const todoToEdit = await Todo.findByPk(id);
    res.render('index', { todos, todoToEdit });
});

//update
router.put("/", async (req, res) =>{
    const id = req.params.id;
    const {title, completed} = req.body;
    try{
        const todo = await Todo.findByPk(id);
        if(!todo){
            return res.status(404).send("id no registrado");
        }
        todo.title = title;
        todo.completed = completed === 'on' ? true : false;
        await todo.save();
    } catch(error){
        res.status(500).send(error.message);
    }
});


//delete
router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const todo = await Todo.findByPk(id);
        if (!todo) {
            return res.status(404).send("id no registrado");
        }
        await todo.destroy();
        res.status(200).send("Tarea eliminada correctamente.");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;