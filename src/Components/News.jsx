import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

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

  constructor() {
    super();
    this.state = {
      results: [],
      loading: false,
      prevPages: [],
      nextPage: null,
      error: null
    };
  }

  fetchNews = async (page = null) => {
    this.setState({ loading: true, error: null });

    let url = `https://newsdata.io/api/1/latest?apikey=pub_e293c4a0a3994111acc2dfade6db3835&country=${this.props.country}&category=${this.props.category}&size=${this.props.size}&language=en`;
    if (page) {
      url += `&page=${page}`;
    }

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const results = Array.isArray(data.results) ? data.results : [];

      this.setState((prevState) => ({
        results,
        nextPage: data.nextPage || null,
        prevPages: page ? [...prevState.prevPages, page] : prevState.prevPages,
        loading: false
      }));
    } catch (error) {
      console.error("Fetching failed:", error.message);
      this.setState({ loading: false, results: [], error: error.message });
    }
  };

  componentDidMount() {
    this.fetchNews();
  }

  handlePrevClick = () => {
    const prevStack = [...this.state.prevPages];
    prevStack.pop(); // remove current page
    const previousPage = prevStack.pop(); // get the one before

    if (previousPage) {
      this.setState({ prevPages: prevStack }, () => {
        this.fetchNews(previousPage);
      });
    } else {
      this.setState({ prevPages: [] }, () => this.fetchNews());
    }
  };

  handleNextClick = () => {
    if (this.state.nextPage) {
      this.fetchNews(this.state.nextPage);
    }
  };

  render() {
    return (
      <div>
        <div className="container mt-4">
          <h3 className="">NewsBox : Top Headlines</h3>
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

          <div className="row my-3">
            {!this.state.loading &&
              this.state.results.map((element, index) => (
                <div className="col-md-4 my-3" key={index}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 42) : ""}
                    description={element.description ? element.description.slice(0, 100) : ""}
                    imageUrl={element.image_url}
                    newsUrl={element.link}
                    author={element.creator}
                    date={element.pubDate}
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="container d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
            disabled={this.state.prevPages.length === 0}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
            disabled={!this.state.nextPage}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
