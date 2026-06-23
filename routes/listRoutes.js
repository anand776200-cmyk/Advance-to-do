const express = require("express");
const router = express.Router();
const List = require('../models/listModel');

router.get('/new', (req, res) => {
    return res.render('newList')
})

router.get('/list', async (req, res) => {
    const userId = req.session.userId;
    if (!userId) return res.redirect('/login');
    const list = await List.find({ user: userId });
    if (list.length == 0) {
        return res.render('emptyList');
    }
    res.render('listIndex', { list });
})

router.post('/add', async (req, res) => {
    const user = req.session.userId
    const { listTitle, tasks } = req.body;
    const list = new List({ listTitle, user, tasks });
    console.log('working inside add');
    await list.save();
    return res.redirect('/lists/list');
})

router.get('/list/del/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await List.findByIdAndDelete(id);
        res.redirect('/lists/list')
    }
    catch (e) {
        res.send("404 error from deleting the list   - " + e);
    }
})

router.post('/list/:id/task', async (req, res) => {
    const { title, date, des, taskId } = req.body;
    const listId = req.params.id;
    if (taskId) {
        const updated = await List.findOneAndUpdate(
            { _id: listId, "tasks._id": taskId },
            {
                $set: {
                    "tasks.$.title": title,
                    "tasks.$.date": date,
                    "tasks.$.des": des
                }
            }
        );
        if (!updated) res.send("404 error");
        return res.redirect(`/lists/${listId}`);
    }
    else {
        const newTask = { title, date, des };
        await List.findByIdAndUpdate(listId,
            {
                $push: { tasks: newTask }
            }
        );

        return res.redirect(`/lists/${listId}`);
    }
})



router.get('/list/:listId/del/:taskId', async (req, res) => {
    const { taskId, listId } = req.params;

    await List.updateOne(
        { _id: listId },
        { $pull: { tasks: { _id: taskId } } }
    );
    const list = await List.findById(listId);

    if (list.tasks.length === 0) {
        await List.findByIdAndDelete(listId);
        return res.redirect('/lists/list');
    }

    res.redirect(`/lists/${listId}`);
})

router.get('/list/:listId/:taskId', async (req, res) => {
    const eachTask = document.querySelector(".each-task");
    const { taskId, listId } = req.params;
    const task = await List.findOne({ listId, "tasks._Id": taskId }, { "tasks.$": 1 });
    if (!task.isDone) {
        await List.updateOne(
            { _id: listId, "tasks._id": taskId },
            {
                $set: {
                    "tasks.$.isDone": true
                }
            }
        );

        eachTask.classList.remove("done");
        eachTask.classList.add("not-done");
    } else {
        await List.updateOne(
            { _id: listId, "tasks._id": taskId },
            {
                $set: {
                    "tasks.$.isDone": false
                }
            }
        );

        eachTask.classList.remove("not-done");
        eachTask.classList.add("done");
    }

    return res.redirect(`/lists/list/${listId}`);
})

router.get('/:id', async (req, res) => {
    const list = await List.findById(req.params.id);
    if (!list) return res.send("No list exist");
    res.render('eachList', { list });
})





module.exports = router;
