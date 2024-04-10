import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function HomePage() {
  return (
    <div className="  flex min-h-60  items-center justify-center px-16">
      <div className="relative w-full max-w-lg">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl "></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl "></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl "></div>
        <div className="m-8 relative space-y-4">
          <div className="p-5  rounded-lg flex items-center justify-between space-x-8">
            <Input type="email" placeholder="Email" />
            <Button type="submit">Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
