import { Todo } from "@/Interfaces";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ButtonLoading from "./ButtonLoading";

interface Props {
  updateTodos: (newTodos: Todo) => void;
}

const AddTaskFormDesktop = ({ updateTodos }: Props) => {
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
    <div className="w-fit h-fit  items-center justify-items-center hidden lg:grid">
      <div className="flex flex-col gap-7 items-center">
        <Form {...form}>
          <Card className="w-[350px] shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl">Task</CardTitle>
              <CardDescription>Create a new task</CardDescription>
            </CardHeader>

            <CardContent>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
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
              </form>
            </CardContent>
          </Card>
        </Form>
      </div>
    </div>
  );
};

export default AddTaskFormDesktop;
