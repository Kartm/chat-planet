import React, { Component } from 'react'
import Banner from './Banner/Banner'
import Description from './Description/Description'

class Start extends Component {
    state = { clickedJoin: false }
    render() {
        return (
            <React.Fragment>
                <Banner
                    clickedJoin={this.state.clickedJoin}
                    setUsers={this.props.setUsers}
                    onClick={() => {
                        this.setState({ clickedJoin: true })
                    }}
                />
                <Description />
            </React.Fragment>
        )
    }
}

export default Start
