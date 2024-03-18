import { Todo } from "@/Interfaces";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

interface Props {
  updateTodos: (newTodo: Todo) => void;
  id: string;
}

const EditTaskForm = ({ id, updateTodos }: Props) => {
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
    apiClient
      .update(id, formData.data)
      .then((res) => {
        console.log(res);

        updateTodos(res.data.data);
        toast({
          title: "Success",
          description: "Task was updated",
        });
        form.reset();
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: err.response ? err.response.data : err.message,
          description: err.response ? err.message : "Server Not Reachable",
        });
        console.log(err);
      });
    console.log(id);
  }

  return (
    <Form {...form}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl">Edit</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="data"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter the updated task"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex justify-center">
              <Button type="submit">Update</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Form>
  );
};

export default EditTaskForm;
