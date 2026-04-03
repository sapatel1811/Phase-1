

import React from 'react'
import PropsFunc from './Function/PropsFunc'
import PropsClass from './class/PropsClass'

function MainProps() {
    return (
        <div>
            <h1>Call Component with function component</h1>
            <div className='row p-5'>
                <PropsFunc img="https://nzptsfd.telangana.gov.in/newResources/css/img/DownMenu/1.%20Plain%20Tiger.jpg" />
                <PropsFunc img="https://nzptsfd.telangana.gov.in/newResources/css/img/DownMenu/1.%20Plain%20Tiger.jpg" />               
            </div>
            
            <hr />

            <h1>Call Component with Class component</h1>
            <div className='row p-5'>
                <PropsClass img="https://www.teriin.org/sites/default/files/2020-10/common-tiger-og.jpg" />
                <PropsClass img="https://www.teriin.org/sites/default/files/2020-10/common-tiger-og.jpg" />
                

            </div>
        </div>
    )
}

export default MainProps