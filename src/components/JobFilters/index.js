import './index.css'

const Filter = props => {
  console.log('filters group')

  const renderFiltersGroup = () => {
    const {employmentList} = props

    return (
      <ul className="ul-filters">
        {employmentList.map(each => (
          <li className="filters-list">
            <input
              id={each.employmentTypeId}
              type="checkbox"
              className="emp-inp"
            />
            <label htmlFor={each.employmentTypeId} className="label">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    )
  }

  const renderSalaryGroup = () => {
    const {salaryList} = props

    return (
      <ul className="ul-filters">
        {salaryList.map(each => (
          <li className="filters-list">
            <input id={each.salaryRangeId} type="radio" className="emp-inp" />
            <label htmlFor={each.salaryRangeId} className="label">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <>
      <div className="filters-section">
        <hr />
        <h1 className="filter-type">Type of Employment</h1>
        {renderFiltersGroup()}
        <hr />
        <h1 className="filter-type">Salary Range</h1>
        {renderSalaryGroup()}
      </div>
    </>
  )
}
export default Filter
