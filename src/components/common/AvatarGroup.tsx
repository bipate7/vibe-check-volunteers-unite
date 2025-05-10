
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils/imageUtils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type AvatarWithName = {
  id: string;
  name: string;
  image?: string;
};

interface AvatarGroupProps {
  items: AvatarWithName[];
  limit?: number;
  size?: "sm" | "md" | "lg";
}

const AvatarGroup = ({ items, limit = 3, size = "md" }: AvatarGroupProps) => {
  const visibleItems = items.slice(0, limit);
  const remainingCount = Math.max(0, items.length - limit);
  
  const getSizeClass = () => {
    switch (size) {
      case "sm": return "h-6 w-6 text-xs";
      case "lg": return "h-12 w-12 text-base";
      default: return "h-8 w-8 text-sm";
    }
  };
  
  const sizeClass = getSizeClass();

  return (
    <div className="flex -space-x-2">
      <TooltipProvider>
        {visibleItems.map((item) => (
          <Tooltip key={item.id}>
            <TooltipTrigger asChild>
              <Avatar className={`${sizeClass} border-2 border-background`}>
                <AvatarImage src={item.image} />
                <AvatarFallback className="bg-primary/10">{getInitials(item.name)}</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
        
        {remainingCount > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className={`${sizeClass} border-2 border-background bg-muted`}>
                <AvatarFallback>+{remainingCount}</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>{remainingCount} more</p>
            </TooltipContent>
          </Tooltip>
        )}
      </TooltipProvider>
    </div>
  );
};

export default AvatarGroup;
