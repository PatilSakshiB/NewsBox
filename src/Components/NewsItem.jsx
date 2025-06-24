import React, { Component } from 'react'

export class NewsItem extends Component {
 
  render() {
    let {title,description,imageUrl,newsUrl,date} = this.props;
    return (
       
        <div className="card newItemCard m-auto h-100 w-100" >
          <img src={!imageUrl?"https://bloximages.newyork1.vip.townnews.com/journalnow.com/content/tncms/assets/v3/editorial/c/32/c320bcdd-61e7-5ff2-9c42-33046840ca09/68523a40123a4.image.jpg?resize=300%2C225":imageUrl}
             className='card-img-top newItemImg' alt="" />
          <div className="card-body">
            <h5 className="card-title text-body-secondary">{title}...</h5>
            <p className="card-text">{description}...</p>
             <p className="card-text"><small className="text-body-secondary"> {date ? new Date(date).toLocaleString() : "N/A"}</small></p>
            <a href={newsUrl} target='_blank' className='btn btn-sm btn-dark'>Read More</a>
          </div>
        </div>
    
    )
  }
}

export default NewsItem