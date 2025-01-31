import PropTypes from 'prop-types'
import queryString from 'query-string';
import { useNavigate, useSearchParams } from "react-router-dom";

const CategoryBox = ({ label, icon: Icon }) => {
  const [params] = useSearchParams()
  let category = params.get('category');

  const navigate= useNavigate()
  const handleCheck=()=>{
    let currentQuery={category:label }
    const url= queryString.stringifyUrl({
      url:'/',
      query:currentQuery
    })

    navigate(url)

  }
  return (
    
    <div
    onClick={()=>handleCheck()}
      className={`flex 
  flex-col 
  items-center 
  justify-center 
  gap-2
  p-3
  border-b-2
  hover:text-neutral-800
  transition
  cursor-pointero ${category===label && 'border-b-neutral-500'}`}
    >
      <Icon size={26} />
      <div className='text-sm font-medium'>{label}</div>
    </div>
  )
}

CategoryBox.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.elementType,
}

export default CategoryBox
