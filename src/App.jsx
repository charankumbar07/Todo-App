import { useState ,useEffect} from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import './App.css'

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(() => {
    let todostr=localStorage.getItem("todos")
    if (todostr) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos) 
    }
  }, [])

//   useEffect(() => {
//     localStorage.setItem("todos", JSON.stringify(todos));
// }, [todos]);
  
  const SaveLS = () => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  

  const handelAdd =() => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    SaveLS()
  }

  const handelchange = (e) => {
    setTodo(e.target.value)
  }

  const handelEdit = (e,id) => {
    let t=todos.filter(i=>i.id==id)
    setTodo(t[0].todo)
    let newtodos=todos.filter(item=>{
      return item.id!=id
    })
    setTodos(newtodos)
    SaveLS()
  }

  const handelDelete = (e,id) => {
    let newtodos=todos.filter(item=>{
      return item.id!=id
    })
    setTodos(newtodos)
    SaveLS()
  }

  const handelCheck = (e) => {
    let id =e.target.name
    let index =todos.findIndex(item=>{
      return item.id===id
    })
    let newtodos=[...todos]
    newtodos[index].isCompleted=!newtodos[index].isCompleted
    setTodos(newtodos)
    SaveLS()
  }

  return (
    <>
      <Navbar />
      <div className="container bg-violet-100 md:w-1/2 m-auto min-h-[95vh] md:min-h-[80vh] p-2">
        <span className='text-4xl font-bold m-auto'>Task Manager</span>
        <div className='text-2xl font-bold m-4'>Add a Todo</div>
        <div className='flex gap-2 my-5'>
          <input onChange={handelchange} value={todo} type="text" className='bg-white w-full mx-2 rounded-full' />
          <button onClick={handelAdd} disabled={todo.length<=3} className='bg-violet-400 hover:bg-violet-600 font-bold text-white px-4 py-1 mx-2 rounded-full'>Save</button>
        </div>

        {todos.map(item=>{

        
        return <div key={item.id} className="todos flex justify-between">
          <div className='flex gap-2'>
          <input name={item.id} onChange={handelCheck} type="checkbox" value={item.isCompleted} id=''/>
          <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
          </div>
          <div>
          <button onClick={(e)=>{handelEdit(e,item.id)}} className='bg-violet-400 px-4 py-1 rounded-full hover:bg-violet-600 m-1 '><FaEdit /></button>
          <button onClick={(e)=>{handelDelete(e,item.id)}} className='bg-violet-400 px-4 py-1 rounded-full hover:bg-violet-600 m-1 '><MdDelete /></button>
          </div>
        </div>
        })}
      </div>
    </>
  )
}

export default App
