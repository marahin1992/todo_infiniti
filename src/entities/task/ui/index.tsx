import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import { Todo } from "../../../shared/api/todos/model";
import { Link } from "react-router-dom";

interface TaskProps {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  onRemoved: () => void;
  onEdited: (todo: Todo) => void;
}

export const Task: React.FC<TaskProps> = ({
  id,
  title,
  description,
  completed,
  onRemoved,
  onEdited,
}) => {
  const [checked, setChecked] = useState(completed);
  return (
    <div className={styles.inputTask}>
      <label className={styles.inputTaskLabel}>
        <input
          type="checkbox"
          checked={checked}
          className={styles.inputTaskCheckbox}
          onChange={(evt) => {
            onEdited({
              id,
              title,
              description,
              completed: evt.target.checked,
            });
            setChecked(evt.target.checked);
          }}
        />
        <div className={styles.inputTaskText}>
          <h3 className={styles.inputTaskTitle}>{title}</h3>
          <p className={styles.inputTaskDescription}>{description}</p>
        </div>
      </label>

      <Link className={styles.inputTaskLink} to={`/${id}`}>
        Просмотр
      </Link>

      <button
        type="button"
        aria-label="Remove"
        className={styles.inputTaskRemove}
        onClick={() => {
          if (confirm("Точно удалить?")) {
            onRemoved();
          }
        }}
      />
    </div>
  );
};
