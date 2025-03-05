import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getTodoByIdQueryOptions } from "../../../shared/api/todos";
import styles from "./index.module.scss";

export const TodoDetailsPage = () => {
  const param = useParams();

  const { data, error, isLoading } = useQuery(
    getTodoByIdQueryOptions(param?.id || "")
  );

  const navigate = useNavigate();
  return (
    <div className={styles.todoDetails}>
      {isLoading && <div>...Loading</div>}
      {error && <div>error: {JSON.stringify(error)}</div>}
      {data && (
        <div className={styles.todoDetailsText}>
          <h1 className={styles.todoDetailsTitle}>{data?.title}</h1>
          <h2 className={styles.todoDetailsDescription}>{data?.description}</h2>
        </div>
      )}
      <button className={styles.todoDetailsButton} onClick={() => navigate(-1) } type="button">
        Назад
      </button>
    </div>
  );
};
