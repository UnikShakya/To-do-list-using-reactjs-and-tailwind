import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  const savetoLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }


  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, iscompleted: false }])
    setTodo(''); // Clear the input field after adding
    savetoLS()
  }

  const handleEdit = (e, id) => {
    const todoToEdit = todos.filter(i => i.id === id);
    setTodo(todoToEdit[0].todo);
    let newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos);
    savetoLS()
  };


  const handleDelete = (e, id) => {
    e.preventDefault();
    // Show confirmation dialog
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      // Filter out the todo with the given id
      const newTodos = todos.filter(item => item.id !== id);
      // Update state
      setTodos(newTodos);
      savetoLS()
    }
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let newTodos = [...todos];
    newTodos[index].iscompleted = !newTodos[index].iscompleted;
    setTodos(newTodos)
    savetoLS()
  }

  return (
    <>
      <Navbar />
      <div className='mx-3 md:container md:mx-auto bg-violet-100 text-black my-6 p-4 min-h-[80vh] md:w-1/2'>
        <div className="addTodo ">
          <h2 className='font-bold text-xl my-3 text-center'>Add Todos</h2>
          <div className="flex">
          <input onChange={handleChange} value={todo} type="text" className='w-full' />
          <button onClick={handleAdd} disabled={todo.length < 1} className='bg-violet-700 hover:bg-violet-900  font-bold py-1 mx-4 px-5 text-sm text-white rounded-md' >Add</button>
          </div>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} className='m-4' /> Show Finished
        <div className='h-[2px] bg-black'></div>
        <h2 className='font-bold text-lg my-3'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5 font-semibold text-m'>No todos to display</div>}
          {todos.map(item => {
            
            return(showFinished || !item.iscompleted) && <div key={item.id} className="todo flex justify-between md:w-1/2 my-3">
              <div className='flex gap-5'>
                <input onChange={handleCheckbox} type="checkbox" checked={item.iscompleted} name={item.id} id='' />
                <div className={item.iscompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-700 hover:bg-violet-900 font-bold py-1 px-3 text-sm text-white rounded-md mx-1'>Edit</button>
                <button onClick={(e) => handleDelete(e, item.id)} className='bg-violet-700 hover:bg-violet-900 font-bold py-1 px-3 text-sm text-white rounded-md'>Delete</button>
              </div>
            </div>
          })}

        </div>

      </div>


    </>
  )
}

export default App
