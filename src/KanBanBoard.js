/** @jsxImportSource @emotion/react */ 
import { css } from '@emotion/react';
import { useState,useEffect } from 'react';
import KanBanColumn from './KanBanColumn'
const kanbanBoardStyles = css`
  flex: 10;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin: 0 1rem 1rem;
`;
const COLUMN_BG_COlORS = {
  loading:"#E3E3E3",
  todo:"#C9AF97",
  ongoing:"#FFE799",
  done:"#C0E8BA"
}
const COLUMN_KEY_TODO = "todo"
const COLUMN_KEY_ONGOING = "ongoing"
const COLUMN_KEY_DONE = "done"
export default function KanBanBoard({
  onAdd,
  isLoading,
  todoList,
  ongoingList,
  doneList,
  onDrop
}) {
  const [draggedItem,setDraggedItem] = useState(null)
  const [dragSource,setDragSource] = useState(null)
  const [dragTarget,setDragTarget] = useState(null)
  // const handleDrop = (evt)=>{
  //   if(!draggedItem || !dragSource || !dragTarget || dragSource === dragTarget){
  //     return 
  //   }
  //   const updateMethodObj = {
  //     [COLUMN_KEY_TODO]:setTodoList,
  //     [COLUMN_KEY_ONGOING]:setOngoingList,
  //     [COLUMN_KEY_DONE]:setDoneList,
  //   }
  //   if(dragSource){
  //     updateMethodObj[dragSource](pre=>pre.filter(v=>!Object.is(v,draggedItem)))
  //   }
  //   if(dragTarget){
  //     updateMethodObj[dragTarget](pre=>([draggedItem,...pre]))
  //   }
  // }
 
  return (
    <main css={kanbanBoardStyles}>
      { isLoading ?
      (
        <KanBanColumn bgColor={COLUMN_BG_COlORS["loading"]} title={"处理中"}/>
      )
      :(
        <KanBanColumn 
          bgColor = {COLUMN_BG_COlORS["todo"]}
          title='待处理'
          cardList={todoList}
          setIsDragSource={(isSrc) => setDragSource(isSrc ? COLUMN_KEY_TODO : null)}
          setIsDragTarget={(isTgt) => setDragTarget(isTgt ? COLUMN_KEY_TODO : null)}
          handleDrop={onDrop}
          onAdd={onAdd}
          canAddNew={true}
          setDraggedItem={setDraggedItem}
        />
      )}
        <KanBanColumn 
          bgColor = {COLUMN_BG_COlORS["ongoing"]}  
          title="进行中"
          setIsDragSource={(isSrc) => setDragSource(isSrc ? COLUMN_KEY_ONGOING : null)}
          setIsDragTarget={(isTgt) => setDragTarget(isTgt ? COLUMN_KEY_ONGOING : null)}
          handleDrop={onDrop}
          cardList={ongoingList}
          setDraggedItem={setDraggedItem}
        />
        <KanBanColumn  
          bgColor = {COLUMN_BG_COlORS["done"]} 
          title="已完成"
          setIsDragSource={(isSrc) => setDragSource(isSrc ? COLUMN_KEY_DONE : null)}
          setIsDragTarget={(isTgt) => setDragTarget(isTgt ? COLUMN_KEY_DONE : null)}
          handleDrop={onDrop}
          cardList={doneList}
          setDraggedItem={setDraggedItem}
        />
    </main>
  );
}
