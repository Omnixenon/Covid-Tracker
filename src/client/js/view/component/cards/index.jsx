import React from 'react'
import styles from './index.scss'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import CardItem from './component/card-item'

const Cards = ({ covid }) => {
  const { confirmed, recovered, deaths, lastUpdate } = covid
  return (
    <section className={styles.container}>
      {covid !== undefined && 
        <Grid container spacing={3} justify='center'> 
          <CardItem title='Infected' description='Number of active cases of Covid-19' data={confirmed.value} lastUpdate={lastUpdate} />
          <CardItem title='Recovered' description='Number of recoveries of Covid-19' data={recovered.value} lastUpdate={lastUpdate} />
          <CardItem title='Deaths' description='Number of deaths from Covid-19' data={deaths.value} lastUpdate={lastUpdate} />
        </Grid>
      }
    </section>
  )
}

export default connect(
(state) => ({
  covid: state.covid.covid
}), 
(dispatch) => ({}))
(Cards)
