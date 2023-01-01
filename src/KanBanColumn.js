/** @jsxImportSource @emotion/react */ 
import { css } from '@emotion/react';
import KanbanCard from './KanbanCard';

export default function KanBanColumn({
  children,
  bgColor,
  title,
  setIsDragSource = () => { },
  setIsDragTarget = () => { },
  handleDrop,
  cardList=[],
  setDraggedItem
}) {
  return (
    <section
      onDragStart={() => setIsDragSource(true)}
      onDragOver={(evt) => {
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'move';
        setIsDragTarget(true);
      } }
      onDragLeave={(evt) => {
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'none';
        setIsDragTarget(false);
      } }
      onDrop={(evt) => {
        evt.preventDefault();
        handleDrop && handleDrop(evt);
      } }
      onDragEnd={(evt) => {
        evt.preventDefault();
        setIsDragSource(false);
        setIsDragTarget(false);
      } }
      css={KanBanColumnStyle(bgColor)}
    >
      <h2>{title}</h2>
      <ul>
        {children}
        {cardList.map(props => <KanbanCard onDragStart={()=>setDraggedItem(props)} {...props}  key={props.title}/>) }
      </ul>

    </section>
  );
}
function KanBanColumnStyle(bgColor) {
  return css`
        flex: 1 1;
        display: flex;
        flex-direction: column;
        border: 1px solid gray;
        border-radius: 1rem;
        background-color: ${bgColor};
        & > ul {
          flex: 0px;
          margin: 1rem;
          padding: 0;
          overflow: auto;
        }
        & > h2 {
          margin: 0.6rem 1rem;
          padding-bottom: 0.6rem;
          border-bottom: 1px solid gray;
          & > button { 
            float: right; 
            margin-top: 0.2rem;
            padding: 0.2rem 0.5rem; 
            border: 0; 
            border-radius: 1rem; 
            height: 1.8rem; 
            line-height: 1rem; 
            font-size: 1rem;} 
        }
      `;
}

