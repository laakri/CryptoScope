import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUserStore } from "../stores/user";
import { useToast } from "@/components/ui/use-toast";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BiLoaderAlt } from "react-icons/bi";
import { useState } from "react";

// Define form schema
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const Login: React.FC = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { login } = useUserStore();

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setLoading(true);

    try {
      console.log(values);
      await login(values);
      toast({
        title: "Success",
        description: "Logged in successfully!",
        duration: 3000,
      });
    } catch (error: any) {
      console.error("Error logging in:", error);

      if (error.response && error.response.data.message) {
        toast({
          title: "Error",
          description: error.response.data.message,
          variant: "destructive",
          duration: 3000,
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to log in. Please try again.",
          variant: "destructive",
          duration: 3000,
        });
      }
    }
    setLoading(false);
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Login</DialogTitle>
        <DialogDescription>
          Please enter your email and password to log in.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="**@**" {...field} />
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
                  <Input type="password" placeholder="****" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="submit" variant="secondary" className="w-full">
              {loading ? (
                <div className="flex items-center gap-1">
                  <BiLoaderAlt className="mr-2 animate-spin" />
                  Loading
                </div>
              ) : (
                <p>Login</p>
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default Login;
