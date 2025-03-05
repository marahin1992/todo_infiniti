import styles from "./index.module.scss";
import { AddForm } from "../../../shared/ui/add-form";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { createTodo, deleteTodo, getTodosInfiniteQueryOptions, updateTodo } from "../../../shared/api/todos";
import { Task } from "../../../entities/task/ui";
import { useIntersection } from "../hooks/intersection-hook";
import { nanoid } from "nanoid";
import { Todo } from "../../../shared/api/todos/model";

export const TodoListPage = () => {
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch
  } = useInfiniteQuery(getTodosInfiniteQueryOptions());

  const cursorRef = useIntersection(() => {
    fetchNextPage();
  });

  const createTodoMutation = useMutation({
    mutationFn: createTodo
  })

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo
  })

  const editTodoMutation = useMutation({
    mutationFn: updateTodo
  })

  const handleCreate = (title: string, description: string) => {
    createTodoMutation.mutate({
      id: nanoid(),
      completed: false,
      title,
      description
    }, {
      onSuccess() {
        refetch()
      }
    })
  }

  const handleDelete = (id: string) => {
    deleteTodoMutation.mutate(id, {onSuccess(){
      refetch()
    }})
  }

  const handleEdit = (todo: Todo) =>  {
    editTodoMutation.mutate(todo, {
      onSuccess() {
        refetch()
      }
    })
  }



  if (isLoading) {
    return <div>...Loading</div>;
  }

  if (error) {
    console.log(error);
    return <div>error: {JSON.stringify(error)}</div>;
  }

  

  return (
    <article>
      <h1 className={styles.articleTitle}>Список задач</h1>
      <section className={styles.articleSection}>
        <AddForm onAdd={handleCreate} />
      </section>
      <section className={styles.articleSection}>
        {!data?.length && (
          <p className={styles.articleText}>
            Задач нет, как таковых. Есть идеи?
          </p>
        )}
        {data?.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            completed={task.completed}
            onRemoved={() => {handleDelete(task.id)}}
            onEdited={handleEdit}
          />
        ))}
      </section>
      <div ref={cursorRef}>
        {!hasNextPage && <div>Больше задач нет</div>}
        {isFetchingNextPage && <div>...Loading</div>}
      </div>
      
    </article>
  );
};


