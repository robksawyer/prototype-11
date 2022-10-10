/**
 * @file StatsGroup.js
 *
 * A 3-up group of statistics about the current ThreeJS instance
 */
import * as React from 'react'
import PropTypes from 'prop-types'

import { Stats } from '@react-three/drei'

// import styles from './StatsGroup.module.css'

const StatsGroup = (props) => {
  // const { tagName: Tag, className, variant, children } = props

  return (
    <>
      <Stats
        showPanel={0} // Start-up panel (default=0)
        className="" // Optional className to add to the stats container dom element
        // {...props} // All stats.js (https://github.com/mrdoob/stats.js/) props are valid
      />
      <Stats
        showPanel={1} // Start-up panel (default=0)
        className="ml-80" // Optional className to add to the stats container dom element
        // {...props} // All stats.js (https://github.com/mrdoob/stats.js/) props are valid
      />
      <Stats
        showPanel={2} // Start-up panel (default=0)
        className="ml-160" // Optional className to add to the stats container dom element
        // {...props} // All stats.js (https://github.com/mrdoob/stats.js/) props are valid
      />
    </>
  )
}

StatsGroup.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
}

StatsGroup.defaultProps = {
  tagName: 'div',
  className: '',
  variant: 'default',
  children: '',
}

export default StatsGroup
