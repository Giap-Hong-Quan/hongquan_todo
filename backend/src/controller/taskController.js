import Task  from "../model/Task.js";
//get all
export const getAllTask=async (req,res)=>{

    const {filter="today"}= req.query;
    const now =new Date();
    let startDate;
    switch(filter){
        case "today":{
            startDate=new Date(now.getFullYear(),now.getMonth(),now.getDate()); // ngay hien tai
        }
        case "week" :{
            const mondDayDate=
            now.getDate()-(now.getDay()-1)-(now.getDay() === 0? 7 : 0);
            startDate=new Date(now.getFullYear(),now.getMonth(),mondDayDate);
        }
        case "month" :{
            startDate=new Date(now.getFullYear(),now.getMonth()-1);
        }
        case "all":
        default:{
            startDate=null;
        }
    }
    const query=startDate ? {createdAt :{$gte :startDate}} :{}
   try {
        const result= await Task.aggregate([
            {$match:query},       /// lọc trước thỏa trong macth cái dưới mới đc chạy
            {
                $facet:{
                    tasks:[{$sort:{createdAt:-1}}],
                    activeCount:[{$match:{status:'active'}},{$count:'count'}],
                    completeCount:[{$match:{status:'complete'}},{$count:'count'}]
                }
            }
        ])

        const tasks=result[0].tasks;
        const activeCount=result[0].activeCount[0]?.count||0;    //kiểm tra undefile không ỏ =0
        const completeCount=result[0].completeCount[0]?.count||0;
        res.status(200).json({tasks,activeCount,completeCount})
   } catch (error) {
    console.log("Lỗi khi gọi getAllTaks",error);
    res.status(500).json({message:"Lỗi hệ thống"});
   }
}
//create
export const createTask=async (req,res)=>{
    try {
        const {title} =req.body;
        if (!title || title.trim() === "") {
            return res.status(400).json({ message: "nội dung rỗng" });
        }
        const task=new Task({title})
        const newTask= await task.save();
        res.status(201).json(newTask);
        // const createTask= await Task.create({title});
        // res.status(201).json({data:createTask});
    } catch (error) {
        console.error("Lỗi tạo task:", error);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
}
//update
export const updateTask=async (req,res)=>{
    try {
        const {id}=req.params;
        const {title,status}=req.body;
        const updateData = { title, status };
        if (status === "complete") {
            updateData.completeAt = new Date();
        }else if (status === "active") {
      updateData.completeAt = null;   // 👈 reset lại
    }
        const updateTask= await Task.findByIdAndUpdate(id,updateData,{new:true});
        if (!updateTask) return res.status(404).json({ message: "Task not found" });
        res.json(updateTask);
    } catch (error) {
        console.error("Lỗi tạo task:", error);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
}
//delete
export const deleteTask=async (req,res)=>{
    try {
        const {id}=req.params;
        const deleteTask= await Task.findByIdAndDelete(id);
        if (!deleteTask) return res.status(404).json({ message: "Task not found" });
        res.status(204).send(); // 204 = No Content
    } catch (error) {
        console.error("Lỗi tạo task:", error);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
  
    
}