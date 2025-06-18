import React, { Component } from 'react'
import NewsItem from './NewsItem';

export class News extends Component {
   constructor() {
    super();
    this.state = {
      results: [] ,
      loading: false
    };
  }
  
   async componentDidMount(){
    let url = "https://newsdata.io/api/1/latest?apikey=pub_e293c4a0a3994111acc2dfade6db3835&q=all";
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ results: parsedData.results });
  }
  render() {
    return (
      <div> 
      <div>
        <div className="container mt-4">
           <h3 className=''>NewBox : Top HeadLines</h3>
          <div className="row my-3">
              {this.state.results.map((element, index) => {
                return (
                  <div className="col-md-4 my-3" key={index}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 42) : ""}
                      description={element.description ? element.description.slice(0, 100) : ""}
                      imageUrl={element.image_url}
                      newsUrl={element.link}
                    />
                  </div>
                );
              })}
              </div>
        </div>
      </div>
    </div>
    )
  }
}


export default News