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
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  todos: Todo[];
  deleteTodo: Dispatch<SetStateAction<Todo[]>>;
  editTodos: (updatedTodo: Todo) => void;
}

const TaskList = ({ todos, deleteTodo: updateTodos, editTodos }: Props) => {
  const { toast } = useToast();
  const [deleteLoading, setDeleteLoading] = useState<{
    [key: string]: boolean;
  }>({});
  const [checkedStates, setCheckedStates] = useState<{
    [key: string]: boolean;
  }>({});

  const deleteTask = (id: string) => {
    setDeleteLoading((prevStates) => ({ ...prevStates, [id]: true }));
    apiClient
      .delete(id)
      .then(() => {
        let newTodos = [...todos];
        newTodos = newTodos.filter((todo) => todo._id !== id);
        updateTodos(newTodos);
        toast({
          title: "Success",
          description: "New task added.",
        });
        setDeleteLoading((prevStates) => {
          const newStates = { ...prevStates };
          delete newStates[id]; // or newStates[id] = false; if you prefer to keep the key
          return newStates;
        });
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: err.response ? err.response.data : err.message,
          description: err.response ? err.message : "Server Not Reachable",
        });
        setDeleteLoading((prevStates) => ({ ...prevStates, [id]: false }));
      });
    console.log(id);
  };

  const handleCheckState = (id: string, isChecked: any) => {
    console.log(isChecked);

    const newState = isChecked ?? false;

    setCheckedStates((prevstates) => ({
      ...prevstates,
      [id]: newState,
    }));

    apiClient
      .complete(id, newState)
      .then((res) => {
        console.log(res);
        toast({
          title: "Success",
          description: "Task Completion Updated",
        });
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: err.response ? err.response.data : err.message,
          description: err.response ? err.message : "Server Not Reachable",
        });
        setCheckedStates((prevstates) => ({
          ...prevstates,
          [id]: !newState,
        }));
      });

    // Move checked states to the bottom
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
                <TableCell>
                  <Checkbox
                    checked={!!checkedStates[todo._id]}
                    onCheckedChange={(isChecked) =>
                      handleCheckState(todo._id, isChecked)
                    }
                  />
                </TableCell>
                <TableCell
                  className={
                    !checkedStates[todo._id]
                      ? "text-md  min-[460px]:text-xl font-poppins"
                      : "text-md  min-[460px]:text-xl font-poppins line-through"
                  }
                >
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
                    {!deleteLoading[todo._id] ? (
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
