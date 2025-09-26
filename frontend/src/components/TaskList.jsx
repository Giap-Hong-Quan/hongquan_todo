import React from 'react'
import { Card } from './ui/card';
import TaskEmptyState from './TaskEmptyState';
import TaskCard from './TaskCard';

const TaskList = ({filtedTask,onTaskAdd}) => {
  let filter='all';
  
if(!filtedTask ||filtedTask.length===0){
  return <TaskEmptyState filter={filter}/>
}
  return (
    <div className='space-y-3'>
      {
        filtedTask.map((task,index)=>(
          <TaskCard key={task._id ?? index} task={task} index={index}  onTaskAdd={onTaskAdd}/>
        ))
      }
       
    </div>
  )
}

export default TaskList