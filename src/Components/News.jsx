import React, { Component } from 'react'
import NewsItem from './NewsItem';

export class News extends Component {
   constructor() {
    super();
    this.state = {
      results: [] ,
      loading: false,
      prevPages: [],
      nextPage: null

    };
  }
  
  fetchNews = async(page = null) =>{
     let url = "https://newsdata.io/api/1/latest?apikey=pub_e293c4a0a3994111acc2dfade6db3835&q=all";
     if(page){
      url += `&page=${page}`;
     }
     const response = await fetch(url);
     const data = await response.json();

     this.setState((prevState) =>({
      results : data.results || [],
      nextPage : data.nextPage || null,
      prevPages : page ? [...prevState.prevPages, page] : prevState.prevPages,
     }));
  }
  componentDidMount(){
    this.fetchNews();
  }

  handlePrevClick = () =>{
    console.log("Previous")
    const prevStack = [...this.state.prevPages];
    prevStack.pop(); // remove current page
    const previousPage = prevStack.pop(); // get the one before

    if (previousPage) {
      this.setState({ prevPages: prevStack }, () => {
        this.fetchNews(previousPage);
      });
    } else {
      // If no previous, go back to first page
      this.setState({ prevPages: [] }, () => this.fetchNews());
    }
  }
   handleNextClick = () =>{
    console.log("Next")
    if(this.state.nextPage){
      this.fetchNews(this.state.nextPage);
    }
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
      <div className="container d-flex justify-content-between">
        <button type="button" className="btn btn-dark" onClick={this.handlePrevClick} disabled={this.state.prevPages.length===0}>&larr; Previous</button>
        <button type="button" className="btn btn-dark" onClick={this.handleNextClick} disabled={!this.state.nextPage}>Next &rarr;</button>
      </div>
    </div>
    )
  }
}


export default News