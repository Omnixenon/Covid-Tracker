import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Line, Bar } from 'react-chartjs-2'
import styles from './index.scss'
import _ from 'lodash'

const Chart = ({ dailyCovid, country, covid }) => {
  const { confirmed, deaths, recovered } = covid

  const lineChart = (
    <Line 
      data={{ 
        labels: _.map(dailyCovid, ({date}) => date),
        datasets: [{
          data: _.map(dailyCovid, ({confirmed}) => confirmed),
          label: 'Infected',
          borderColor: '#3333ff',
          fill: true
        }, {
          data: _.map(dailyCovid, ({deaths}) => deaths),
          label: 'Deaths',
          borderColor: '#3333ff',
          backgroundColor: 'rgba(255, 0, 0, 0.5)',
          fill: true
        }]
      }}
    />
  )

  const barChart = (
    <Bar 
      data={{ 
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [{
          label: 'People',
          backgroundColor: [
            'rgba(255, 0, 0, 0.5)',
            'rgba(0, 255, 0, 0.5)',
            'rgba(0, 0, 255, 0.5)',
          ],
          data: [
            confirmed.value,
            deaths.value,
            recovered.value
          ]
        }]
      }}
      options={{
        legend: {display: false},
        title: {display: true, text: `Current state in ${country}`}
      }}
    />
  )

  return (
    <section className={styles.container}>
      {country ? barChart : lineChart}
    </section>
  )
}
export default connect(
(state) => ({
  covid: state.covid.covid,
  dailyCovid: state.covid.dailyCovid,
  country: state.covid.country
}), 
(dispatch) => ({}))
(Chart)
