import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="grid h-[calc(100vh-7rem)] w-full place-content-center">
      <Loader2 className="h-16 w-16 animate-spin" />
    </div>
  );
};
export default Loading;
