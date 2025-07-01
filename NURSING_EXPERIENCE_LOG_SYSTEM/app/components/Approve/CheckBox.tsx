export const Checkbox = ({ isChecked, Subskill, checkHandler, index ,Place,Ward,Date} : any) => {
    return (
      <div className="flex border-2 p-3 rounded-md">
        <input
         className="w-6 "
          type="checkbox"
          id={`checkbox-${index}`}
          checked={isChecked}
          onChange={checkHandler}
        />
        <div className="p-2">
            <div><label htmlFor={`checkbox-${index}`}>{Subskill}</label></div>
            <div><label htmlFor={`checkbox-${index}`}>{Date}</label></div>
            <div><label htmlFor={`checkbox-${index}`}>{Place}</label></div>
            <div><label htmlFor={`checkbox-${index}`}>{Ward}</label></div>
        </div>
        
        
      </div>
    )
  }