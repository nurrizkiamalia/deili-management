"use client";

import * as React from "react";
import { useCardById, useUpdateDueDate } from "@/hooks/useCard";
import { format, isBefore } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import DateTimePicker from "react-datetime-picker";

interface DateTimePickerComponentProps {
  cardId: number;
}

const DateTimePickerComponent: React.FC<DateTimePickerComponentProps> = ({ cardId }) => {
  const { card, loading: cardLoading, error: cardError } = useCardById(cardId);
  const { handleUpdateDueDate, loading: updatingDueDate } = useUpdateDueDate();
  const [date, setDate] = React.useState<Date | null>(card?.dueDate ? new Date(card.dueDate) : null);

  React.useEffect(() => {
    if (card?.dueDate) {
      setDate(new Date(card.dueDate));
    }
  }, [card]);

  const handleDateChange = async (newDate: Date | null) => {
    setDate(newDate);
    if (newDate) {
      try {
        const formattedDate = format(newDate, "yyyy-MM-dd'T'HH:mm:ss");
        console.log("Formatted Date:", formattedDate);
        await handleUpdateDueDate({
          cardId,
          dueDate: formattedDate,
        });
      } catch (err) {
        console.error("Failed to update due date:", err);
      }
    }
  };

  if (cardLoading) return <p>Loading...</p>;
  if (cardError) return <p>Error fetching card details.</p>;

  const isPastDueDate = date && isBefore(date, new Date());

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "w-fit justify-start text-left font-medium px-4 !py-1 rounded-2xl hover:text-white",
            !date && "text-muted-foreground bg-dspGreen",
            date && isPastDueDate ? "bg-red-200 text-red-700" : "bg-dspGreen text-green-700 "
          )}
          disabled={updatingDueDate}
          size="sm"
        >
          <CalendarIcon className="mr-2" />
          {date ? (
            <span>Due {format(date, "MMM d, yyyy h:mm a")}</span>
          ) : (
            <span>Set due date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto bg-dspGreenBg p-3 rounded-xl">
        <div className="flex flex-col items-center">
          <DateTimePicker
            onChange={handleDateChange}
            value={date}
            className="custom-date-time-picker"
            calendarIcon={<CalendarIcon className="text-dspOrange animate-pulse duration-1000" />}
            format="h:mm a"
            clearIcon={null}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateTimePickerComponent;