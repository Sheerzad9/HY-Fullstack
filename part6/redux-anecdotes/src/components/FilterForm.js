import { connect } from "react-redux";
import { setFilter, clearFilter } from "../reducers/filterReducer";

const FilterForm = (props) => {
  const handleChange = (e) => {
    e.preventDefault();
    const filterText = e.target.value.trim();
    if (filterText.length === 0) props.clearFilter();

    props.setFilter(filterText);
  };

  return (
    <div>
      filter: <input onChange={handleChange} type="text"></input>
    </div>
  );
};

export default connect(null, { setFilter, clearFilter })(FilterForm);
