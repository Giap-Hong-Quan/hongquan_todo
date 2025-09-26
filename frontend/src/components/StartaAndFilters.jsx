import { FilterType } from '@/lib/data'
import React from 'react'
import { Button } from './ui/button'
import { Filter } from 'lucide-react'
import { Badge } from './ui/badge'

const StartaAndFilters = ({completedTaskCount=0,activeTaskCount=0,filter="all",onFilterChange}) => {
  return (
    <div className='flex flex-col items-start justify-between sm:flex-row sm:items-center'>
      {/* Phần thống kê */}
      <div className='flex gap-3  '>
        <Badge variant="secondary" className="bg-white/50 text-accent-foreground border-info/20">
          {activeTaskCount} {FilterType.active}
        </Badge>
        <Badge variant="secondary" className="bg-white/50 text-success border-success/20">
          {completedTaskCount} {FilterType.complete}
        </Badge>
        
      </div>
      {/* phần filter */}
      <div className='flex flex-col sm:flex-row gap-2  '>
        {Object.keys(FilterType).map((items)=>(
          <Button key={items} size="sm" className="capitalize" variant={filter === items ? 'gradient' : 'ghost'}  onClick={() => onFilterChange?.(items)}>
          <Filter className='size-4'/> 
            {FilterType[items]}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default StartaAndFilters