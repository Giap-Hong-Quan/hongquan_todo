import React, { useState } from 'react'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import api from '@/lib/axios'

const AddTask = ({onTaskAdd}) => {
  const [newTask,setNewTask]=useState('');
  const handleSubmit= async (e)=>{
    e.preventDefault();
    try {
      const data={
        title:newTask.trim()
      }
       if (!data.title) {
        toast.error("Vui lòng nhập nội dung task")
        return
      }
      const res= await api.post('/tasks',data);
      toast.success(`Thêm Task ${newTask} thành công`)
      console.log(res)
      setNewTask('');
      onTaskAdd?.();// gọi callback để cha refresh list
    } catch (error) {
      console.error("Lỗi khi thêm task:", error)
       toast.error("Lỗi khi thêm task ?");
    }
  }
  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col gap-3 sm:flex-row"
      >
        <Input
          type="text"
          value={newTask}
          placeholder="Cần phải làm gì"
          onChange={(e) => setNewTask(e.target.value)}
          className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
        />
        <Button
          type="submit"   // 🔑 đây
          variant="gradient"
          size="xl"
          className="px-6"
          disabled={!newTask.trim()}
        >
          <Plus className="size-5" /> Thêm
        </Button>
      </form>
    </Card>
    
  )
}

export default AddTask