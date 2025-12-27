import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function SelectBar({
  setLanguage,
  setCreativity,
  setVariant,
  setUseCase,
  setTone,
  useCaseOptions,
}) {
  return (
    <div className="sticky top-0 bg-gray-300 dark:bg-gray-900 px-4 lg:px-12 py-4 rounded-xl h-[10rem] overflow-y-scroll lg:overflow-y-hidden md:h-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
        {/* For Tone -------------------------------------*/}
        <div className="w-full flex flex-col justify-between">
          <Select onValueChange={setTone}>
            <p className="text-sm font-bold text-gray-700 dark:text-gray-200">
              Choose Tonality
            </p>
            <SelectTrigger className="my-1 py-6">
              <SelectValue placeholder="Select Tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tone Options</SelectLabel>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="informal">Informal</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="constructive">Constructive</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* For Use Case -------------------------------------*/}
        <div className="w-full flex flex-col justify-between">
          <Select onValueChange={setUseCase}>
            <p className="text-sm font-bold text-gray-700 dark:text-gray-200">
              Choose UseCase
            </p>
            <SelectTrigger className="my-1 py-6">
              <SelectValue placeholder="Select UseCase" />
            </SelectTrigger>
            <SelectContent>
              {useCaseOptions?.map((group) => (
                <SelectGroup key={group.label}>
                  <SelectLabel>{group.label}</SelectLabel>
                  {group.items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* For Variants-------------------------------------*/}
        <div className="w-full flex flex-col justify-between">
          <Select onValueChange={setVariant}>
            <p className="text-sm font-bold text-gray-700 dark:text-gray-200">
              Choose Variants
            </p>
            <SelectTrigger className="my-1 py-6">
              <SelectValue placeholder="Select Variant" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Variant Options</SelectLabel>
                <SelectItem value="variant1">Variant 1</SelectItem>
                <SelectItem value="variant2">Variant 2</SelectItem>
                <SelectItem value="variant3">Variant 3</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* For Creativity level -------------------------------------*/}
        <div className="w-full flex flex-col justify-between">
          <Select onValueChange={setCreativity}>
            <p className="text-sm font-bold text-gray-700 dark:text-gray-200">
              Choose Creativity
            </p>
            <SelectTrigger className="my-1 py-6">
              <SelectValue placeholder="Select Creativity" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Creativity Options</SelectLabel>
                <SelectItem value="balanced">Balanced</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* For Language -------------------------------------*/}
        <div className="w-full flex flex-col justify-between">
        <Select onValueChange={setLanguage}>
          <p className="text-sm font-bold text-gray-700 dark:text-gray-200">
            Choose Language
          </p>
          <SelectTrigger className="my-1 py-6">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Language Options</SelectLabel>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="german">German</SelectItem>
              <SelectItem value="chinese">Chinese</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      </div>
    </div>
  );
}
