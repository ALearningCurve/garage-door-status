import React from 'react'
import DoorHeader from './DoorHeader'
import DoorList from './DoorList'

export default function DoorsView(props) {
    return (
        <div>
            <DoorHeader />
            <DoorList db={props.db} user={props.user}/>
        </div>
    )
}
