import React, { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getCovidDataPromise, getDailyCovidDataPromise, getCountryCovidDataPromise } from 'action/covid.jsx'
import { BounceLoader } from 'react-spinners'
import Cards from 'component/cards'
import Chart from 'component/chart'
import CountryPicker from 'component/country-picker'
import styles from './index.scss'

class Home extends Component {
	componentDidMount () {
		const { getCovidDataPromise, getDailyCovidDataPromise, getCountryCovidDataPromise } = this.props
		getCovidDataPromise()
		getDailyCovidDataPromise()
		getCountryCovidDataPromise()
	}

	render() {
		const { spinner } = this.props
		
		return (
			<Fragment>
				<div className={styles.image_container}>
					<img className={styles.image} src='https://i.ibb.co/7QpKsCX/image.png' alt="COVID-19 TRACKER"/>
				</div>
				<div className={styles.container}>
					{!spinner ?
						<Fragment>
							<Cards />
							<CountryPicker />
							<Chart />
						</Fragment>
						:
						<div className={styles.spinner}>
							<BounceLoader />
						</div>	
					}
				</div>
			</Fragment>
		)
	}
}

export default connect((state) => ({
	spinner: state.covid.spinner
}), 
(dispatch) => ({
	getCovidDataPromise: bindActionCreators(getCovidDataPromise, dispatch),
	getDailyCovidDataPromise: bindActionCreators(getDailyCovidDataPromise, dispatch),
	getCountryCovidDataPromise: bindActionCreators(getCountryCovidDataPromise, dispatch)
}))(Home)