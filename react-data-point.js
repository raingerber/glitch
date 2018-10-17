const React = require('react')
const PropTypes = require('prop-types')
const dataPoint = require ('data-point')

/*
const {
  Entry,
  Model,
  Reducer,
  Collection,
  Hash,
  Request,
  Control,
  Schema
} = require('data-point').entities
*/

const BASE_KEYS = [
  'inputType',
  'before',
  'after',
  'outputType',
  'error',
  'params'
]

function pickDefined (keys, source) {
  const result = {}
  for (const key of keys) {
    const value = source[key]
    if (value !== undefined) {
      result[key] = value
    }
  }

  return result
}

class Entity extends React.Component {
  constructor (props) {
    super(props)
    const keys = BASE_KEYS.concat(props.extraKeys)
    const Factory = dataPoint.entities[props.type]
    const spec = pickDefined(keys, this.props)
    this.entity = Factory(spec)
  }
  
  render () {
    return null
  }
}

Entity.propTypes = {
  type: PropTypes.oneOf([
    'Entry',
    'Model',
    'Reducer',
    'Collection',
    'Hash',
    'Request',
    'Control',
    'Schema'
  ]).isRequired,
  extraKeys: PropTypes.arrayOf(
    PropTypes.string
  )
}

Entity.defaultProps = {
  extraKeys: []
}

class Model extends React.Component {
  render (props) {
    return (
      <Entity
        {...props}
        type='Model'
        extraKeys={['value']}
      />
    )
  }
}

module.exports = {
  Entity,
  Model
}