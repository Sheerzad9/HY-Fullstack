import { useDispatch } from "react-redux";
import { setFilter, clearFilter } from "../reducers/filterReducer";

const FilterForm = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    const filterText = e.target.value.trim();
    if (filterText.length === 0) dispatch(clearFilter());

    dispatch(setFilter(filterText));
    // console.log("Value: ", e.target.value);
    // console.log("Trimmed empty length: ", e.target.value.trim().length);
  };

  return (
    <div>
      filter: <input onChange={handleChange} type="text"></input>
    </div>
  );
};

export default FilterForm;
