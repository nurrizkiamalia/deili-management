"use client";

import { Check, ChevronsDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useQuery } from "@apollo/client";
import { GET_SEARCH_USER_BY_EMAIL } from "@/graphql/query/userQuery";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";

const FindByEmail: React.FC<{ onSelect: (userId: number) => void }> = ({ onSelect }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  const debouncedSearch = useCallback(
    debounce((nextValue: string) => {
      setDebouncedValue(nextValue);
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSearch(value);
  }, [value, debouncedSearch]);

  const { data, loading, error } = useQuery(GET_SEARCH_USER_BY_EMAIL, {
    variables: { email: debouncedValue },
    skip: !debouncedValue,
  });

  const handleSelect = (email: string, userId: number) => {
    setValue(email);
    onSelect(userId);  // Pass userId (Long) to the parent component
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? value : "Select Email to Add..."}
          <ChevronsDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className="w-full">
          <CommandInput
            placeholder="Search email..."
            value={value}
            onValueChange={(nextValue: string) => setValue(nextValue)}
          />
          <CommandList className="w-full">
            {loading && <CommandEmpty>Loading...</CommandEmpty>}
            {error && <CommandEmpty>Error loading data...</CommandEmpty>}
            {(!data?.getSearchUserByEmail || data.getSearchUserByEmail.length === 0) && (
              <CommandEmpty>No email found.</CommandEmpty>
            )}
            <CommandGroup>
              {data?.getSearchUserByEmail &&
                data.getSearchUserByEmail.map((user: any) => (
                  <CommandItem
                    key={user.email}
                    value={user.email}
                    onSelect={() => handleSelect(user.email, user.id)}
                  >
                    {user.email}
                    <Check
                      className={cn("ml-auto", value === user.email ? "opacity-100" : "opacity-0")}
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default FindByEmail;