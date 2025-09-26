import React, { useState } from 'react'
import { Card } from './ui/card'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Calendar, CheckCircle2, Circle, Delete, DeleteIcon, Ghost, Square, SquarePen, Trash2 } from 'lucide-react'
import { Input } from './ui/input'
import api from '@/lib/axios'
import { toast } from 'sonner'

const TaskCard = ({task,index,onTaskAdd}) => {
    const [isEdit,setIsEdit]=useState(false)
    const [newTask,setNewTask]=useState(task.title)
const deleteTask= async (id)=>{
    try {
        const res= await api.delete(`tasks/${id}`)
        console.log(res)
        onTaskAdd?.();
        toast.success(`Xóa Task ${task.title} thành công`)
    } catch (error) {
        console.log('Lỗi hệ thống',error)
        toast.error(`Xóa Task ${task.title} thất bại`)
    }
}
const updateTask= async (id,data)=>{
    try {
        const res= await api.put(`tasks/${id}`,data);
        console.log(res)
        onTaskAdd?.();
        toast.success(`Cập nhật Task thành công`)
    } catch (error) {
        console.log('Lỗi hệ thống',error)
        toast.error(`Cập Task thất bại`)
    }
}
const handelKeyPress= (e)=>{
    if(e.key==='Enter'){
        updateTask(task._id,{title:newTask,status: task.status })
        setIsEdit(false);
    }
}
const toggleCompleteButton= async ()=>{
    if(task.status==='active'){
        updateTask(task._id,{title:newTask,status:'complete'})
        setIsEdit(false);
    }else{
        updateTask(task._id,{title:newTask,status:'active',completeAt:null})
        setIsEdit(false);
    }
}
  return (
    <div>
        <Card  className={cn('p-6 border-0 bg-gradient-card shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group',
            task.status==="complete" && "opacity-75"
        )}
        style={{animationDelay:`${index * 50}ms`}}
        >
            <div className='flex items-center gap-4'>
                {/* nut tron */}
                <Button variant='ghost' 
                onClick={toggleCompleteButton}
                size='icon' className={cn("flex-shrink-0 size-8 rounded-full transition-all duration-20000",
                    task.status==="complete" ?'text-success hover:text-success/80':'text-muted-foreground hover:text-primary'
                )}>
                    {task.status==='complete'? (
                        <CheckCircle2 className='size-5 '/>
                    ):(
                        <Circle className='size-5'/>
                    )}
                </Button>
                {/*hien thi va chinh sua  */}
                <div className='flex-1 min-w-0 '>
                    {isEdit?(
                        <Input placeholder='Cần phải làm gì ?'  
                        className='flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20'
                        type='text'
                        value={newTask}
                        onChange={(e)=>setNewTask(e.target.value)}
                        onBlur={()=>setIsEdit(false)}
                        onKeyDown={handelKeyPress}            // nên dùng onKeyDown thay vì onKeyPress (deprecated)
                        autoFocus
                        />
                    ):(
                        <p className={cn('text-base transition-all duration-200',
                            task.status==="complete"?'line-through text-muted-foreground':'text-foreground')}>{task.title}</p>
                    )}
                {/* ngay tao va ngay hoan thanh  */}
                <div className='flex items-center gap-2 mt-1'>
                    <Calendar className='size-3 text-muted-foreground'/>
                    <span className='text-xs text-muted-foreground'>
                        {new Date(task.createdAt).toLocaleString()}
                    </span>
                    {task.completeAt && (
                        <>
                            <span className='text-xs text-muted-foreground'> - </span>
                            <Calendar className='size-3 text-muted-foreground'/>
                            <span className='text-xs text-muted-foreground'>
                                {new Date(task.completeAt).toLocaleString()}
                            </span>
                        </>
                    )}
                </div>
                </div>
                {/* nut chinh vaf xoas */}
                <div className='hidden gap-2 group-hover:inline-flex animate-slide-up'>
                    <Button
                    variant='ghost'
                    size='icon'
                    className='flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info '
                    onClick={()=>setIsEdit(true)}
                    >
                        <SquarePen className='size-4'/>
                    </Button>
                     <Button
                    onClick={() => deleteTask(task._id)}
                    variant='ghost'
                    size='icon'
                    className='flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive '
                    >
                        <Trash2  className='size-4'/>
                    </Button>
                </div>
            </div>
        </Card>
    </div>
  )
}

export default TaskCard