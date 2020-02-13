import React from 'react'

/**
 * Percent Chart
 * Loosely borrowed from http://jsfiddle.net/zap4f/1/ which I stubled on from stackoverflow
 * @param percent - the percentage to display
 * @param size - default to "ring" can be a piechart 
 */
const PercentCircle = ({percent, size=30, type='ring'}) => {
  const degrees = Math.ceil(360 * (percent/100))

  const highlight = '#fc9911'
  const fill = degrees >= 360 ? highlight : '#1B95F4'
  const background = '#efefef'

  const updateBg = (i) => {
    let num = i
    if (num > 360) {
      num = 360
    } else if (num < 0) {
      num = 0
    }

    return num<=180 
      ? `linear-gradient(${90+num}deg, transparent 50%, ${background} 50%),linear-gradient(90deg, ${background} 50%, transparent 50%)`
      : `linear-gradient(${num-90}deg, transparent 50%, ${fill} 50%),linear-gradient(90deg, ${background} 50%, transparent 50%)`
  }


  const activeBorderStyle = {
    width: size,
    height: size,
    backgroundImage: updateBg(degrees),
    position: 'relative',
    width: size,
    height: size,
    borderRadius: '100%',
    backgroundColor: fill
  }

  const innerStyle = {
    width: size * .8,
    height: size * .8,
    top: size * .1,
    left: size * .1,
    position: 'relative',
    borderRadius: '100%',
    backgroundColor: type === 'ring' ? '#fff' : null // null is a "pie cut"
  }    

  return (
    <div data-testid="percent-chart" style={activeBorderStyle}>
        <div style={innerStyle} />
    </div>
  )
}

export default PercentCircle