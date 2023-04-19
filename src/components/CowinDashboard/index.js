// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationCoverage from '../VaccinationCoverage'
import './index.css'

const apiStatusConstants = {
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class CowinDashboard extends Component {
  state = {
    apiStatus: 'INPROGRESS',
    last7DaysVaccinationList: [],
    vaccinationByAgeList: [],
    vaccinationByGenderList: [],
  }

  componentDidMount() {
    this.getVaccinationCharts()
  }

  renderLoading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  getVaccinationCharts = async () => {
    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(vaccinationDataApiUrl)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const last7DaysVaccination = data.last_7_days_vaccination.map(
        eachItem => ({
          vaccineDate: eachItem.vaccine_date,
          dose1: eachItem.dose_1,
          dose2: eachItem.dose_2,
        }),
      )
      const vaccinationByGender = data.vaccination_by_gender.map(eachItem => ({
        count: eachItem.count,
        gender: eachItem.gender,
      }))
      const vaccinationByAge = data.vaccination_by_age.map(eachItem => ({
        age: eachItem.age,
        count: eachItem.count,
      }))
      this.setState({
        last7DaysVaccinationList: last7DaysVaccination,
        vaccinationByGenderList: vaccinationByGender,
        vaccinationByAgeList: vaccinationByAge,
        apiStatus: 'SUCCESS',
      })
    } else {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        className="failure-image"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderVaccinationCharts = () => {
    const {
      last7DaysVaccinationList,
      vaccinationByAgeList,
      vaccinationByGenderList,
    } = this.state
    return (
      <div>
        <VaccinationCoverage
          last7DaysVaccinationList={last7DaysVaccinationList}
        />
        <VaccinationByGender
          vaccinationByGenderList={vaccinationByGenderList}
        />
        <VaccinationByAge vaccinationByAgeList={vaccinationByAgeList} />
      </div>
    )
  }

  renderApiResultView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      case apiStatusConstants.success:
        return this.renderVaccinationCharts()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {
      last7DaysVaccinationList,
      vaccinationByAgeList,
      vaccinationByGenderList,
    } = this.state
    console.log(last7DaysVaccinationList)
    console.log(vaccinationByGenderList)
    console.log(vaccinationByAgeList)
    return (
      <div className="cowin-dash-board-container">
        <div className="website-logo-container">
          <img
            alt="website logo"
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
          />
          <h1 className="website-heading">Co-WIN</h1>
        </div>
        <h1 className="cowin-dash-heading">Cowin Vaccination in India</h1>
        {this.renderApiResultView()}
      </div>
    )
  }
}
export default CowinDashboard
