"use client"

import * as React from "react"
import { ChevronDown, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function Combobox({ value, onValueChange, values, valueKey = 'value', labelKey = 'label', placeholder = 'Start searching...' }) {
  const [open, setOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] flex justify-start relative overflow-x-hidden"
        >
          <div className="w-full truncate mr-3 text-start">
            {value
              ? values.find((valueObj) => valueObj[valueKey] === value)?.[labelKey]
              : placeholder}
          </div>
          <ChevronDown className="absolute right-0 ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0"
        side="bottom"
        avoidCollisions={false}
      >
        <Command shouldFilter={false}>
          <CommandInput value={searchText} onValueChange={setSearchText} placeholder={placeholder} className="h-9" />
          <CommandEmpty>No results found</CommandEmpty>
          <CommandGroup>
            {values.filter(v => {
              return v[labelKey]?.toLowerCase().includes(searchText.toLowerCase());
            }).map((valueObj) => (
              <CommandItem
                key={valueObj[valueKey]}
                value={valueObj[valueKey]}
                onSelect={(currentValue) => {
                  onValueChange(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                {valueObj[labelKey]}
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === valueObj[valueKey] ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}