import { Todo } from "@/Interfaces";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import apiClient from "@/services/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import ButtonLoading from "./ButtonLoading";
import { useState } from "react";

interface Props {
  updateTodos: (newTodos: Todo) => void;
}

const AddTaskFormMobile = ({ updateTodos }: Props) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const formSchema = z.object({
    data: z.string().min(3, "Task is required."),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      data: "",
    },
  });

  function onSubmit(formData: z.infer<typeof formSchema>) {
    setLoading(true);
    apiClient
      .create(formData.data)
      .then((res) => {
        setLoading(false);
        updateTodos(res.data);
        toast({
          title: "Success",
          description: "New task added.",
        });
        form.reset();
      })
      .catch((err) => {
        setLoading(false);
        toast({
          variant: "destructive",
          title: err.response ? err.response.data : err.message,
          description: err.response ? err.message : "Server Not Reachable",
        });
        console.log(err);
      });

    console.log(formData);
  }

  return (
    <div className="w-full flex justify-center">
      <Form {...form}>
        <DrawerContent className="pl-5 pr-5">
          <DrawerHeader>
            <DrawerTitle>Task</DrawerTitle>
            <DrawerDescription>Create a new task</DrawerDescription>
          </DrawerHeader>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 pl-4 pr-4"
          >
            <FormField
              control={form.control}
              name="data"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Dental Appointment at 8:00pm."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex justify-center">
              {!loading ? (
                <Button type="submit">Add</Button>
              ) : (
                <ButtonLoading />
              )}
            </div>
            <DrawerFooter>
              <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Form>
    </div>
  );
};

export default AddTaskFormMobile;
