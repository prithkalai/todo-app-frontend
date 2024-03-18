import { RxPencil1, RxTrash } from "react-icons/rx";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Todo } from "@/Interfaces";
import apiClient from "@/services/api-client";
import { useToast } from "./ui/use-toast";
import { Dispatch, SetStateAction, useState } from "react";
import EditTaskForm from "./EditTaskForm";
import ButtonLoading from "./ButtonLoading";

interface Props {
  todos: Todo[];
  deleteTodo: Dispatch<SetStateAction<Todo[]>>;
  editTodos: (updatedTodo: Todo) => void;
}

const TaskList = ({ todos, deleteTodo: updateTodos, editTodos }: Props) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const deleteTask = (id: string) => {
    setLoading(true);
    apiClient
      .delete(id)
      .then(() => {
        let newTodos = [...todos];
        newTodos = newTodos.filter((todo) => todo._id !== id);
        updateTodos(newTodos);
        setLoading(false);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: err.response ? err.response.data : err.message,
          description: err.response ? err.message : "Server Not Reachable",
        });
        setLoading(false);
      });
    console.log(id);
  };

  return (
    <div className="w-full min-[460px]:w-[600px]">
      <Card className="p-5 shadow-lg">
        <Table>
          <TableCaption>
            {todos.length != 0
              ? "A list of your recent tasks."
              : "Add a new task."}
          </TableCaption>
          <TableHeader></TableHeader>
          <TableBody>
            {todos.map((todo) => (
              <TableRow key={todo._id}>
                <TableCell className="text-md  min-[460px]:text-xl font-poppins">
                  {todo.data}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          className="p-2 min-[460px]:p-3"
                          variant="outline"
                        >
                          <RxPencil1 className="text-md  min-[460px]:text-xl" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <EditTaskForm id={todo._id} updateTodos={editTodos} />
                      </PopoverContent>
                    </Popover>
                    {!loading ? (
                      <Button className="p-2 min-[460px]:p-3" variant="outline">
                        <RxTrash
                          className="text-md  min-[460px]:text-xl"
                          onClick={() => deleteTask(todo._id)}
                        />
                      </Button>
                    ) : (
                      <ButtonLoading />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default TaskList;
