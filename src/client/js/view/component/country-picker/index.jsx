import React from 'react'
import styles from './index.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeCountry } from 'action/covid.jsx'
import { NativeSelect, FormControl } from '@material-ui/core'
import _ from 'lodash'

const CountryPicker = ({ countries, changeCountry, country }) => {

  return (
    <section className={styles.container}>
      <FormControl className={styles.formControl}>
        <NativeSelect 
          value={country} 
          onChange={(event) => changeCountry(event.target.value)} 
          className={styles.nativeSelect}
        >
          <option value=''>Global</option>
          {_.map(countries, (name, index) => <option key={index} value={name}>{name}</option>)}
        </NativeSelect>
      </FormControl>
    </section>
  )
}

export default connect(
(state) => ({
  countries: state.covid.countries,
  country: state.covid.country
}), 
(dispatch) => ({
  changeCountry: bindActionCreators(changeCountry, dispatch)
}))
(CountryPicker)
