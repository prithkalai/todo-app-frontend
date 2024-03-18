import ButtonLoading from "@/components/ButtonLoading";
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import apiGuest from "@/services/api-guest";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const formSchema = z.object({
    email: z.string().email("Enter a valid email").min(3, "Email is required"),
    password: z.string().min(1, "Password is required."),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(formData: z.infer<typeof formSchema>) {
    setLoading(true);
    apiGuest
      .login(formData.email, formData.password)
      .then((res) => {
        localStorage.setItem("authToken", res.data.token);
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        toast({
          variant: "destructive",
          title: err.response ? err.response.data.message : err.message,
          description: err.response ? err.message : "Server Not Reachable",
        });
        console.log(err);
      });

    console.log(formData);
  }

  return (
    <div className="w-screen h-fit mt-20 md:mt-28 flex flex-row items-center justify-center">
      <div className="flex flex-col gap-7 items-center">
        <Form {...form}>
          <Card className="w-[350px] shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl">Login</CardTitle>
              <CardDescription>Enter your credentials</CardDescription>
            </CardHeader>

            <CardContent>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {!loading ? (
                  <Button type="submit">Submit</Button>
                ) : (
                  <ButtonLoading />
                )}
              </form>
            </CardContent>
          </Card>
        </Form>
        <Button
          className="shadow-xl w-full"
          onClick={() => navigate("/signup")}
        >
          Create an account
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
