/** @jsxImportSource @emotion/react */ 
import logo from './logo.svg';
import './App.css';
import { useState,useEffect } from 'react';
import KanBanBoard from './KanBanBoard';
import KanbanNewCard from './KanbanNewCard';
import KanBanColumn from './KanBanColumn';

const COLUMN_BG_COlORS = {
  loading:"#E3E3E3",
  todo:"#C9AF97",
  ongoing:"#FFE799",
  done:"#C0E8BA"
}
const DATA_STORE_KEY = "kanban-data-store"
const COLUMN_KEY_TODO = "todo"
const COLUMN_KEY_ONGOING = "ongoing"
const COLUMN_KEY_DONE = "done"

export const MINUTE = 60 * 1000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;
export const UPDATE_INTERVAL = MINUTE;

function App() {
  const [showAdd, setShowAdd] = useState(false); 
  const [todoList,setTodoList] = useState([
    { title: '开发任务-1', status: '2022-09-15 21:10' },
    { title: '开发任务-3', status: '2022-05-22 18:15' },
    { title: '开发任务-5', status: '2022-05-22 21:05' },
  ])
  const [ongoingList,setOngoingList] = useState([
    { title: '开发任务-4', status: '2022-05-02 18:15' },
    { title: '开发任务-6', status: '2022-05-22 18:15' },
    { title: '测试任务-2', status: '2022-05-12 18:15' }
  ])
  const [doneList,setDoneList] = useState([
    { title: '开发任务-9', status: '2022-11-02 21:10' },
    { title: '开发任务-7', status: '2022-11-22 18:15' },
    { title: '开发任务-5', status: '2022-11-22 21:05' },
  ])
  const [isLoading,setIsLoading] = useState(true)

 

 
  const handleAdd = (evt) => {  
    setShowAdd(true) 
  };

  useEffect(()=>{
    const data = window.localStorage.getItem(DATA_STORE_KEY);
    setTimeout(()=>{
      if(data){
        const kanbanColumnData = JSON.parse(data); 
        setTodoList(kanbanColumnData.todoList);
        setOngoingList(kanbanColumnData.ongoingList);
        setDoneList(kanbanColumnData.doneList);
      }
      setIsLoading(false)
    },1000)
  },[])

  
  const handleSubmit = (title)=>{
    setTodoList( currentTodoList => [
      { title, status: new Date().toDateString()},
      ...currentTodoList
    ])
    todoList.unshift({ title, status: new Date().toDateString() });
  }

  const handleSaveAll = ()=>{
    const data = JSON.stringify({
      todoList,
      ongoingList,
      doneList
    })
    window.localStorage.setItem(DATA_STORE_KEY,data)
  }

  const [draggedItem,setDraggedItem] = useState(null)
  const [dragSource,setDragSource] = useState(null)
  const [dragTarget,setDragTarget] = useState(null)

  const handleDrop = (evt)=>{
    if(!draggedItem || !dragSource || !dragTarget || dragSource === dragTarget){
      return 
    }
    const updateMethodObj = {
      [COLUMN_KEY_TODO]:setTodoList,
      [COLUMN_KEY_ONGOING]:setOngoingList,
      [COLUMN_KEY_DONE]:setDoneList,
    }
    if(dragSource){
      updateMethodObj[dragSource](pre=>pre.filter(v=>!Object.is(v,draggedItem)))
    }
    if(dragTarget){
      updateMethodObj[dragTarget](pre=>([draggedItem,...pre]))
    }
  }

  
  return (
    <div className="App">
      <header className="App-header">
        <h1>我的看板<button onClick={handleSaveAll}>保存所有卡片</button></h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <KanBanBoard>
        { isLoading ?
          (<KanBanColumn bgColor={COLUMN_BG_COlORS["loading"]} title={"处理中"}/>)
          :(<KanBanColumn 
              bgColor = {COLUMN_BG_COlORS["todo"]}
              title={
                <>
                  待处理
                  <button onClick={handleAdd} disabled={showAdd}>
                  ⊕ 添加新卡片
                  </button>
                </>
              }
              cardList={todoList}
              setIsDragSource={(isSrc) => setDragSource(isSrc ? COLUMN_KEY_TODO : null)}
              setIsDragTarget={(isTgt) => setDragTarget(isTgt ? COLUMN_KEY_TODO : null)}
              handleDrop={handleDrop}
              setDraggedItem
            >
              {showAdd && <KanbanNewCard onSubmit={handleSubmit}/>}
            </KanBanColumn>
        )}
        <KanBanColumn 
          bgColor = {COLUMN_BG_COlORS["ongoing"]}  
          title="进行中"
          setIsDragSource={(isSrc) => setDragSource(isSrc ? COLUMN_KEY_ONGOING : null)}
          setIsDragTarget={(isTgt) => setDragTarget(isTgt ? COLUMN_KEY_ONGOING : null)}
          handleDrop={handleDrop}
          cardList={ongoingList}
          setDraggedItem

        >
        </KanBanColumn>
        <KanBanColumn  
          bgColor = {COLUMN_BG_COlORS["done"]} 
          title="已完成"
          setIsDragSource={(isSrc) => setDragSource(isSrc ? COLUMN_KEY_DONE : null)}
          setIsDragTarget={(isTgt) => setDragTarget(isTgt ? COLUMN_KEY_DONE : null)}
          handleDrop={handleDrop}
          cardList={doneList}
          setDraggedItem
        >
        </KanBanColumn>
      </KanBanBoard>
    </div>
  );
}

export default App;