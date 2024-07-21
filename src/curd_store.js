import React, { useEffect, useState } from 'react';
import './curd_store.css';
import { database } from './firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';

function CurdStore() {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [id, setId] = useState('');
    const [show, setShow] = useState(false);
    const [tasks, setTasks] = useState([]);

    const taskCollection = collection(database, "demo");

    useEffect(() => {
        const getData = async () => {
            const dbTasks = await getDocs(taskCollection);
            setTasks(dbTasks.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        getData();
    }, [taskCollection]); // Added dependency array to prevent useEffect from running indefinitely

    const handleCreate = async () => {
        await addDoc(taskCollection, { taskName: taskName, taskDescription: taskDescription });
        setTaskName('');
        setTaskDescription('');
    };

    const handleDelete = async (id) => {
        const deleteTask = doc(database, "demo", id);
        await deleteDoc(deleteTask);
    };

    const handleEdit = (id, taskName, taskDescription) => {
        setTaskName(taskName);
        setTaskDescription(taskDescription);
        setId(id);
        setShow(true);
    };

    const handleUpdate = async () => {
        const updateTask = doc(database, "demo", id);
        await updateDoc(updateTask, { taskName: taskName, taskDescription: taskDescription });
        setShow(false);
        setTaskName('');
        setTaskDescription('');
    };

    return (
        <div className='container'>
            <input value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder="Task Name" />
            <input value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} placeholder="Task Description" />
            {!show ? <button onClick={handleCreate}>Create</button> : 
            <button onClick={handleUpdate}>Update</button>}
            {
                tasks.map(task =>
                <div key={task.id} className="task">
                    <div>
                        <h1 className="task-name">{task.taskName}</h1>
                        <hr/>
                        <h1 className="task-description">{task.taskDescription}</h1>
                    </div>
                    <div>
                        <button className="edit-button" onClick={() => handleEdit(task.id, task.taskName, task.taskDescription)}>Edit</button>
                        <button onClick={() => handleDelete(task.id)}>Delete</button>
                    </div>
                </div>)
            }
        </div>
    )
}

export default CurdStore;
