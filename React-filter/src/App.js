import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

const Button = ({ data, text, onClick }) =>
  <button onClick={() => onClick(data)}>
    {text}
  </button>

class App extends Component {
  state = {
    buttons: [
      { id: 0, text: 'Duration ⏲️', criteria: { duration: 4680 } },
      {
        id: 1,
        text: 'Collaborateurs 🤝',
        criteria: { target: 'collaborateur' },
      },
      { id: 2, text: 'Manageurs ‍🕺', criteria: { target: 'manageur' } },
      { id: 3, text: 'Management 👨‍💻', criteria: { theme: 'management' } },
      { id: 4, text: 'Finance 💸', criteria: { theme: 'finance' } },
    ],
    data: [
      {
        id: 0,
        text: 'React : 4680 | Collab | Finance',
        duration: 4680,
        target: 'collaborateur',
        theme: 'finance',
      },
      {
        id: 1,
        text: 'Vue : 3600 | Collab | Management',
        duration: 3600,
        target: 'collaborateur',
        theme: 'management',
      },
      {
        id: 2,
        text: 'Reason : 4680 | Manageur | Finance',
        duration: 4680,
        target: 'manageur',
        theme: 'finance',
      },
      {
        id: 3,
        text: 'Cycle.JS : 5000 : Manageur | Management',
        duration: 5000,
        target: 'manageur',
        theme: 'management',
      },
      {
        id: 4,
        text: 'Happi : 5000 | Collab | Management',
        duration: 5000,
        target: 'collaborateur',
        theme: 'management',
      },
      {
        id: 5,
        text: 'Koa : 5000 | Manageur | Management',
        duration: 5000,
        target: 'manageur',
        theme: 'management',
      },
      {
        id: 6,
        text: 'Express : 5000 | Collab | Finance',
        duration: 5000,
        target: 'collaborateur',
        theme: 'finance',
      },
      {
        id: 7,
        text: 'React Sketch.app : 200 | Manageur | Finance',
        duration: 200,
        target: 'manageur',
        theme: 'finance',
      },
    ],
    filters: {},
    filteredData: [],
  }

  componentWillMount = () =>
    this.setState(state => ({ filteredData: state.data }))

  _handleFilters = criteria => {
    const filter = Object.keys(criteria)[0]
    const filterValue = Object.values(criteria)[0]
    // Check if the current selected filter already exist
    if (
      this.state.filters[filter] &&
      this.state.filters[filter].length &&
      this.state.filters[filter].includes(filterValue)
    ) {
      // Check if the current selected filter as one property or more to remove
      if (this.state.filters[filter].length === 1) {
        // Rename the existing filter into removedFilter and put it aside
        // Take all the remaining filters, and put them back into this.state.filters
        const { [filter]: removedFilter, ...remainingFilters } = this.state.filters

        this.setState(
          state => ({ filters: { ...remainingFilters } }),
          () => this._filterData(),
        )
      }
      // Here we go insed the current selected filter array to only remove the current selected value
      else if (this.state.filters[filter].length > 1) {
        this.setState(
          state => ({
            filters: {
              ...state.filters,
              [filter]: [
                ...state.filters[filter].slice(0,state.filters[filter].indexOf(filterValue)),
                ...state.filters[filter].slice(state.filters[filter].indexOf(filterValue) + 1),
              ],
            },
          }),
          () => this._filterData(),
        )
      }
    }
    // If the current selected filter doesn't exist, we simply add it to this.state.filters
    else {
      // If we don't define is as an array (empty or not), we won't be able to spread it below

      // Vue: existingFilters = this.filters[filter]
      const existingFilters = this.state.filters[filter] || []

      this.setState(
        state => ({
          filters: {
            ...state.filters,
            [filter]:
              (filter === 'theme' || filter === 'anotherSingleValueFilter')
                ? [filterValue]
                : [...existingFilters, filterValue],
          },
        }),
        () => this._filterData(),
      )
    }
  }

  _filterData = (): void => {
    let filteredData = this.state.data.slice()
    Object.keys(this.state.filters).map(filterKey =>
      this.state.filters[filterKey].map(filterValue =>
        this.state.data.map(data =>
          (filteredData = filteredData.filter( item =>
            (filterKey === 'duration' && item.duration && item.duration <= filterValue) ||
            item[filterKey] === filterValue,
        )))
      )
    )
    this.setState(() => ({ filteredData }))
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>State of JS 🤔</h2>
        </div>

        <p className="App-intro">
          {this.state.buttons.map(button =>
            <Button
              data={button.criteria}
              key={button.id}
              onClick={this._handleFilters}
              text={button.text}
            />,
          )}
        </p>

        {/* Vue: this.filterData = this.data = getPosts */}
        {this.state.filteredData.map(framework =>
          <p key={framework.id}>
            • {framework.text}
          </p>,
        )}

        <div className="App-footer">
          🕵️‍♂️ Actived filters 🔍:
          {Object.keys(this.state.filters).map(filterKey =>
            this.state.filters[filterKey].map((filterValue, index) =>
              <span key={index}>
                {' '}{filterKey} = {filterValue} |
              </span>,
            ),
          )}
        </div>
      </div>
    )
  }
}

export default App
