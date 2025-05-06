import React, { useCallback } from 'react'
import Button from './Button'

const SelectedProject = ({index, setProjects, projects, handleProjectDelete, ...props}) => {

    const [task, setTask] = React.useState('');

    const project = projects[index];

    const handleTaskSubmit = (e) => {
        e.preventDefault()
        if (task) {
            setProjects((prevProjects) => {
                const updatedProjects = [...prevProjects]
                const currentProject = { ...updatedProjects[index] };
                currentProject.tasks = [...(currentProject.tasks || []), task];
                updatedProjects[index] = currentProject;
                return updatedProjects;
            })
            setTask('')
        }
    }

    const handleTaskDelete = (indexTask) => {
        setProjects((prevProjects) => {
            const updatedProjects = [...prevProjects]
            const currentProject = { ...updatedProjects[index] };
            currentProject.tasks = currentProject.tasks.filter((_, i) => i !== indexTask);
            updatedProjects[index] = currentProject;
            return updatedProjects;
        })
        setTask('')
    }

  return (
    <div {...props}>
        <div className="flex flex-row justify-between items-center mb-2">
            <h2 className='text-2xl font-bold text-stone-900'>{project.name}</h2>
            <Button title="Delete" className='text-stone-900' handleClick={handleProjectDelete}/>
        </div>
        <p className='text-stone-400'>{project.dueDate}</p>
        <div className='flex flex-col gap-4 mt-4 mb-2'>
            <p className='text-stone-600 whitespace-pre-wrap'>{project.description}</p>
        </div>
        <hr/>
        <div className='flex flex-col gap-4 mt-4 mb-2'>
            <h2 className='text-2xl font-bold text-stone-900'>Tasks</h2>
            <form onSubmit={handleTaskSubmit} className='flex flex-row gap-2'>
                <input type="text" value={task} onChange={(e) => setTask(e.target.value)} className='px-2 py-2 bg-stone-300 text-stone-900' placeholder='Add a new task...' required/>
                <Button title="Add Task" className='w-25 px-2 py-2 text-xs md:text-base rounded-md text-stone-900 hover:text-stone-500' type='submit'/>
            </form>
            {project.tasks.length > 0  ? <ul className='flex flex-col gap-4 py-4 px-3 bg-stone-200'>
                {project.tasks.map((task, index) => (
                    <li key={index} className='text-stone-900 flex flex-row justify-between items-center'>
                        <p>{task}</p>
                        <Button title="Clear" handleClick={() => handleTaskDelete(index)} className='text-stone-900'/>    
                    </li>
                ))}
            </ul> : <p className='text-stone-500'>No tasks added yet</p>}
        </div>
    </div>
  )
}

export default SelectedProject