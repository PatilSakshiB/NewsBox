import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: 'in',
    size: 5,
    category: 'top'
  };

  static propTypes = {
    country: PropTypes.string,
    size: PropTypes.number,
    category: PropTypes.string
  };

  capitalizeLetter(string) {
  if (!string) return ''; // Handle empty or null strings
  return string.charAt(0).toUpperCase() + string.slice(1);
}
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      loading: true,
      prevPages: [],
      nextPage: null,
      error: null,
      totalResults: 0
    };
    document.title = `${this.capitalizeLetter(this.props.category)} - NewsBox`
  }

  fetchNews = async () => {
    this.props.setProgress(10);
    this.setState({ loading: true, error: null });
    const { country, category, size } = this.props;
    const url = `https://newsdata.io/api/1/latest?apikey=pub_e293c4a0a3994111acc2dfade6db3835&country=${country}&category=${category}&size=${size}&language=en`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
      const data = await response.json();
      const results = Array.isArray(data.results) ? data.results : [];
      this.setState({
        results,
        nextPage: data.nextPage || null,
        totalResults: data.totalResults || results.length,
        loading: false
      });
       this.props.setProgress(100);
    } catch (error) {
      console.error("Initial fetch failed:", error.message);
      this.setState({ loading: false, error: error.message });
    }
  };

  componentDidMount() {
    this.fetchNews();
  }

  // handlePrevClick = () => {
  //   const prevStack = [...this.state.prevPages];
  //   prevStack.pop(); // remove current page
  //   const previousPage = prevStack.pop(); // get one before
  //   if (previousPage) {
  //     this.setState({ prevPages: prevStack }, () => {
  //       this.fetchNews(previousPage);
  //     });
  //   } else {
  //     this.setState({ prevPages: [] }, () => this.fetchNews());
  //   }
  // };
  // handleNextClick = () => {
  //   if (this.state.nextPage) {
  //     this.fetchNews(this.state.nextPage);
  //   }
  // };

  fetchMoreData = async () => {
  if (!this.state.nextPage) return;

  try {
    const url = `https://newsdata.io/api/1/latest?apikey=pub_e293c4a0a3994111acc2dfade6db3835&country=${this.props.country}&category=${this.props.category}&size=${this.props.size}&language=en&page=${this.state.nextPage}`;
    const response = await fetch(url);
    const data = await response.json();
    const moreResults = Array.isArray(data.results) ? data.results : [];

    this.setState((prevState) => ({
      results: prevState.results.concat(moreResults),
      nextPage: data.nextPage || null,
      prevPages: [...prevState.prevPages, data.nextPage],
      totalResults: data.totalResults,
    }));
  } catch (error) {
    console.error("Fetching more data failed:", error.message);
    this.setState({ error: error.message });
  }
};



  render() {
    return (
      <>
        <div className="container mt-4">
          <h3 className="">NewsBox : Top {this.capitalizeLetter(this.props.category)} Headlines</h3>
          {this.state.loading && <Spinner />}

          {this.state.error && (
            <div className="alert alert-danger text-center mt-3">
              {this.state.error.includes("429") ? "Please wait and try again." : this.state.error}
            </div>
          )}

          {!this.state.loading && !this.state.error && this.state.results.length === 0 && (
            <div className="text-center mt-4">
              <p>No news found for the selected category.</p>
            </div>
          )}

          <InfiniteScroll
          dataLength={this.state.results.length}
          next={this.fetchMoreData}
          hasMore={this.state.nextPage !== null}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className=" row my-3">
            {this.state.results.map((element, index) => (
                <div className="col-md-4 my-3" key={index}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 42) : ""}
                    description={element.description ? element.description.slice(0, 100) : ""}
                    imageUrl={element.image_url}
                    newsUrl={element.link}
                    date={element.pubDate}
                  />
                </div>
              ))}
          </div>
          </div>
          </InfiniteScroll>
        </div>

        {/* //Previous & Next button Logic
         <div className="container d-flex justify-content-between">
          <button type="button" className="btn btn-dark" onClick={this.handlePrevClick}
            disabled={this.state.prevPages.length === 0}  >
            &larr; Previous
          </button>
          <button type="button" className="btn btn-dark" onClick={this.handleNextClick}
            disabled={!this.state.nextPage} >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}

export default News;
