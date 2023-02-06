import React from 'react'
import { Page } from '../../components'
import { Week, YearView } from '../../components'
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from 'react-icons/md'
import { AiOutlineReload } from 'react-icons/ai'
import { BiUpArrowAlt, BiDownArrowAlt } from 'react-icons/bi'
import { useContext,useEffect,useState} from 'react'
import { CalendarContext } from '../../contexts'
import { RoomContainer } from '../../components'
import MoonLoader from "react-spinners/MoonLoader";


export const CalendarPage = () => {

  const { add, substract, reload } = useContext(CalendarContext);
  const [loading,setloading]=useState(false);
  useEffect(() => {
    setloading(true)

    setTimeout(() => {
        setloading(false)
    }, 3000);
   
}, []);
  
  return (
    <Page>

 <>{loading?<MoonLoader className="spinner"
        color="#c48604"
        loading={loading}
        cssOverride={{}}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />:  <><div className='flex justify-start items-center mx-4 w-100 select-none'>
          
          <div className='flex'>
            <a onClick={ () => reload() }           href='#' className='hidden sm:block p-2 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-full transition-colors dark:text-slate-50'> <AiOutlineReload /> </a>
            <a onClick={ () => substract(1, 'd') } href='#'  className='hidden sm:block p-2 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-full transition-colors dark:text-slate-50'> <MdOutlineNavigateBefore /> </a>
          </div>

          <div className='flex flex-col h-auto sm:flex-row justify-center items-center'>
            <a onClick={ () => substract(1, 'd') } className='sm:hidden hover:bg-slate-300 dark:hover:bg-slate-600 rounded-full transition-colors dark:text-slate-50 p-2' href='#'><BiUpArrowAlt /></a>
            <div className='flex items-center'>
              <YearView /> 
              <a onClick={ () => reload() } href='#' className='sm:hidden p-2 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-full transition-colors dark:text-slate-50'> <AiOutlineReload /> </a>
            </div>
            <Week />
              <a onClick={ () => add(1, 'd') } className='sm:hidden hover:bg-slate-300 dark:hover:bg-slate-600 rounded-full transition-colors dark:text-slate-50 p-2' href='#'><BiDownArrowAlt /></a>
          </div>


          <a onClick={ () => add(1, 'd') } href='#' className='p-2 hidden sm:block hover:bg-slate-300 dark:hover:bg-slate-600 rounded-full transition-colors dark:text-slate-50'> <MdOutlineNavigateNext /> </a>
      </div>

      <RoomContainer /></>}</>
    

    </Page>
  )
}

export default CalendarPage