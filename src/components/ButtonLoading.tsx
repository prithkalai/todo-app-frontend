import { ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

const ButtonLoading = () => {
  return (
    <Button disabled>
      <ReloadIcon className="h-4 w-4 animate-spin" />
    </Button>
  );
};

export default ButtonLoading;
