import React, { useState } from "react";
import styles from './index.module.scss'

interface InputPlusProps {
  onAdd: (title: string, description: string) => void;
}

export const AddForm: React.FC<InputPlusProps> = ({ onAdd }) => {
  const [titleInputValue, setTitleInputValue] = useState('');
  const [descriptionInputValue, setDescriptionInputValue] = useState('');
  const addTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!titleInputValue || !descriptionInputValue) {
      alert('Заполните оба поля');
      return
    }
    onAdd(titleInputValue, descriptionInputValue)
    setTitleInputValue('');
    setDescriptionInputValue('');
  }
  return (
    <form className={styles.inputPlus} onSubmit={addTask}>
        <input 
          type="text"
          className={styles.inputPlusValue}
          value={titleInputValue}
          placeholder="Заголовок"
          onChange={(event) => {setTitleInputValue(event.target.value)}}
        />
        <input 
          type="text"
          className={styles.inputPlusValue}
          value={descriptionInputValue}
          placeholder="Описание"
          onChange={(event) => {setDescriptionInputValue(event.target.value)}}
        />
        <button 
          type="submit"
          aria-label='Добавить задачку'
          className={styles.inputPlusButton}
        />
    </form>
  )
}