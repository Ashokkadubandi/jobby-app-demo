import {Component} from 'react'
import Cookies from 'js-cookie'
import Profile from '../ProfileDetails'
import Filter from '../JobFilters'
import JobsView from '../JobDetailView'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobDetails extends Component {
  state = {jobDetails: []}

  componentDidMount() {
    this.jobDetailApi()
  }

  jobDetailApi = async () => {
    const URL = 'https://apis.ccbp.in/jobs'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const fetching = await fetch(URL, options)
    if (fetching.ok === true) {
      const data = await fetching.json()

      const updatedDetails = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDesc: each.job_description,
        location: each.location,
        packageSalary: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      console.log(updatedDetails)
      this.setState({jobDetails: updatedDetails})
    }
  }

  applyFilters = () => (
    <>
      <Filter
        employmentList={employmentTypesList}
        salaryList={salaryRangesList}
      />
    </>
  )

  jobDetailsView = () => {
    const {jobDetails} = this.state
    return (
      <div className="jobs-detail-ul">
        <ul className="jobs">
          {jobDetails.map(each => (
            <JobsView eachJob={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div className="profile-section">
        <div className="profile-filters">
          <Profile />
          {this.applyFilters()}
        </div>
        {/* Render Job Details here */}
        <h1>{this.jobDetailsView()}</h1>
      </div>
    )
  }
}
export default JobDetails
