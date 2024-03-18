import { Todo } from "@/Interfaces";
import { useToast } from "@/components/ui/use-toast";

import AddTaskFormDesktop from "@/components/TaskFormDesktop";
import AddTaskFormMobile from "@/components/TaskFormMobile";
import TaskList from "@/components/TaskList";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import apiClient from "@/services/api-client";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { toast } = useToast();
  const [todos, setTodos] = useState<Todo[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get()
      .then((res) => {
        setTodos(res.data.data);

        console.log(res);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: err.response ? err.response.data : err.message,
          description: err.response ? err.message : "Server Not Reachable",
        });
        if (err.response) {
          navigate("/login");
        }
        console.log(err);
      });
  }, []);

  const updateTodos = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const editTodos = (updatedTodo: Todo) => {
    let newTodos = [...todos];
    const index = newTodos.findIndex((todo) => todo._id === updatedTodo._id);
    newTodos[index].data = updatedTodo.data;
    setTodos(newTodos);
  };

  return (
    <>
      <div className="h-fit w-full mt-10 pl-5 pr-5 flex items-start justify-around gap-10">
        <AddTaskFormDesktop updateTodos={updateTodos} />
        <TaskList todos={todos} deleteTodo={setTodos} editTodos={editTodos} />
      </div>

      <Drawer>
        <DrawerTrigger>
          <Button className="fixed lg:hidden bottom-5 right-5 p-4 h-fit">
            <FaPlus className="text-4xl" />
          </Button>
        </DrawerTrigger>

        <AddTaskFormMobile updateTodos={updateTodos} />
      </Drawer>
    </>
  );
};

export default HomePage;
