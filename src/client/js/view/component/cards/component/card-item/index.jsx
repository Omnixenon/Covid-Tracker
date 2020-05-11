import React from 'react'
import styles from './index.scss'
import { Card, CardContent, Typography, Grid } from '@material-ui/core'
import Countup from 'react-countup'
import moment from 'moment'
import cx from 'classnames'

const CardItem = ({ title, description, data, lastUpdate }) => {
  return (
    <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles[title.toLowerCase()])}>
      <CardContent>
        <Typography color='textSecondary' gutterBottom>{title}</Typography>
        <Typography variant='h5'>
          <Countup 
            start={0}
            end={data}
            duration={2.5}
            separator=','
          />
        </Typography>
        <Typography color='textSecondary'>{moment(lastUpdate).format('LL')}</Typography>
        <Typography variant='body2'>{description}</Typography>
      </CardContent>
    </Grid>
  )
}

export default CardItem
