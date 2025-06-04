import React from 'react'
import NewsItem from './NewsItem'

export default function () {
  return (
    <div> 
      <div style={{border:'1px solid'}}>
        <h3>News Component</h3>
        <div className="container">
          <div className="row my-3">
            <div className="col-md-4">
              <NewsItem title='Headline 1'/>
            </div>
             <div className="col-md-4">
              <NewsItem title='Headline 2'/>
            </div>
             <div className="col-md-4">
              <NewsItem title='Headline 3'/>
            </div>
          </div>
          <div className="row my-3">
            <div className="col-md-4">
              <NewsItem/>
            </div>
             <div className="col-md-4">
              <NewsItem/>
            </div>
             <div className="col-md-4">
              <NewsItem/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
