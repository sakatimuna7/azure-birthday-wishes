import { Card } from "@/components/ui/card";
import { Heart, Gift } from "lucide-react";

interface BirthdayCardProps {
  name: string;
  message: string;
  delay?: number;
}

const BirthdayCard = ({ name, message, delay = 0 }: BirthdayCardProps) => {
  return (
    <Card
      className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-500 hover:scale-105 animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full animate-glow"></div>
          </div>
          <Heart className="w-5 h-5 text-accent" />
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-elegant">{name}</h3>
          <p className="text-muted-foreground leading-relaxed italic">
            "{message}"
          </p>
        </div>

        <div className="flex justify-end">
          <Gift className="w-4 h-4 text-primary animate-float" />
        </div>
      </div>
    </Card>
  );
};

export default BirthdayCard;
