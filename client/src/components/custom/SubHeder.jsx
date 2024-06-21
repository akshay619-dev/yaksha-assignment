import React from "react"
import {
    File,
    ListFilter
} from "lucide-react"

import { Button } from "@/components/ui/button"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Tabs,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs"
import Filters from "../Filters"
import SideFilters from "./SideFilters"
  
const SubHeader = () => {
  return (
    <>
    <div className="flex  w-full flex-col bg-muted/40">

      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">

        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">Inventory</TabsTrigger>
             
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
              Select Dealer
              <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Dealer" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectLabel>Select Dealer</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                </SelectContent>
                </Select>
                <Button size="sm" variant="outline" className="h-7 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  <Sheet>
                    <SheetTrigger>Filter Data By</SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                        <SheetTitle>Filter Data By</SheetTitle>
                        <SheetDescription>

                           <SideFilters />

                        </SheetDescription>
                       
                        </SheetHeader>
                    </SheetContent>
                    </Sheet>
                  </span>
                </Button>
                
              </div>
            </div>
          </Tabs>
        </main>
      </div>
    </div>


    </>
  )
}


export default SubHeader