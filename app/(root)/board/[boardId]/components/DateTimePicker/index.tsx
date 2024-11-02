"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import DateTimePicker from "react-datetime-picker";

interface DateTimePickerComponentProps {
  dueDate?: string;
  onChange: (date: Date | null) => void;
}

const DateTimePickerComponent: React.FC<DateTimePickerComponentProps> = ({ dueDate, onChange }) => {
  const [date, setDate] = React.useState<Date | null>(dueDate ? new Date(dueDate) : null);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "w-fit justify-start text-left font-medium px-4 !py-1 bg-dspGreen text-dspDarkGray hover:text-white rounded-2xl ",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2" />
          {date ? (
            <span>Due {format(date, "MMM d, yyyy h:mm a")}</span>
          ) : (
            <span>Pick a date and time</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto bg-dspGreenBg p-3 rounded-xl">
        <div className="flex flex-col items-center">
          <DateTimePicker
            onChange={(newDate) => {
              setDate(newDate);
              onChange(newDate);
            }}
            value={date}
            className="custom-date-time-picker"
            calendarIcon={ <CalendarIcon className="text-dspOrange animate-pulse duration-1000" />}
            format="h:mm a"
            clearIcon={null}
            disableClock={true}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateTimePickerComponent;
