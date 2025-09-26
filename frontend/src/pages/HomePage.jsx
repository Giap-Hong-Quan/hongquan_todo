import AddTask from '@/components/AddTask'
import DateTimeFilter from '@/components/DateTimeFilter'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import StartaAndFilters from '@/components/StartaAndFilters'
import TaskList from '@/components/TaskList'
import TaskListPagination from '@/components/TaskListPagination'
import api from '@/lib/axios'
import { visibleTaskLimit } from '@/lib/data'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
const Homepage = () => {
const [taskBuffer,setTaskBuffer]=useState([])
const [filter, setFilter] = useState("all");
const [activeCount,setActiveCount]=useState(0);
const [completeCount,setCompleteCount]=useState(0);
const [dateQuery,setDateQuery]=useState()
const [page,setPage]=useState(1)
const filteredTasks = taskBuffer.tasks?.filter((task) => {
  if (filter === "all") return true;
  return task.status === filter;
}) || [];
useEffect(()=>{
  fetchTasks();
},[dateQuery])

useEffect(()=>{
setPage(1)
},[filter,dateQuery])
const fetchTasks=async ()=>{
  try {
    const getTask= await api.get(`/tasks?filter=${dateQuery}`);
    const data= getTask.data;
    setActiveCount(getTask.data.activeCount);
    setCompleteCount(getTask.data.completeCount);
    setTaskBuffer(data)    //Sau khi fetch, bạn nên lưu dữ liệu:
    console.log(data)
  } catch (error) {
    console.log("lỗi này sảy ra khi truy xuất task",error);
    toast.error("Lỗi này sảy ra khi truy xuất task");
  }
}
// phân trang 
const visibleTasks = filteredTasks.slice(
  (page - 1) * visibleTaskLimit,
  page * visibleTaskLimit
);

const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

const handleNext = () => {
  if (page < totalPages) setPage((prev) => prev + 1);
};
const handlePrev = () => {
  if (page > 1) setPage((prev) => prev - 1);
};
const handlePageChange = (newPage) => setPage(newPage);

if(visibleTasks.length===0){
  handlePrev();
}
  return (
    <div className="min-h-screen w-full bg-[#fefcff] relative">
  {/* Dreamy Sky Pink Glow */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
    }}
  />
    {/* Your Content/Components */}
    <div className='container pt-8 mx-auto relative z-10 '>
        <div className='w-full max-w-2xl p-6 mx-auto space-y-6'>
            {/* đầu trang*/}
            <Header/>
            {/* Taon nhiệm vụ với add task */}
            <AddTask onTaskAdd={fetchTasks}/>
            {/* Thống kê và bộ lọc*/}
            <StartaAndFilters activeTaskCount={activeCount} completedTaskCount={completeCount} filter={filter} onFilterChange={setFilter} />
            {/* Danh sách nhiệm vụ */}
            <TaskList filtedTask={visibleTasks} onTaskAdd={fetchTasks}/>
            {/* Phân trang và lọc theo ngày */}
            <div className='flex flex-col items-center justify-between gap-6 sm:flex-row'>
                <TaskListPagination handleNext={handleNext} handlePrev={handlePrev} handlePageChange={handlePageChange} page={page} totalPages={totalPages} /> 
                <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery}/>
            </div>
            {/* Chân trang */}
            <Footer completedTaskCount={completeCount}  activeTaskCount={activeCount} />
        </div>
    </div>
</div>
  )
}

export default Homepage

