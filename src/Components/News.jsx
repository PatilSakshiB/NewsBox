import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)  => {
  
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [prevPages, setPrevPages] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [nextPage, setNextPage] = useState()
  const [error, setError] = useState()
  
  const capitalizeLetter = (string) => {
    if (!string) return ""; // Handle empty or null strings
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const fetchNews = async () => {
    props.setProgress(10);
    setLoading(true)
    setError(null)
    const { country, category, size } = props;
    const url = `https://newsdata.io/api/1/latest?apikey=pub_e293c4a0a3994111acc2dfade6db3835&country=${country}&category=${category}&size=${size}&language=en`;
    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      const data = await response.json();
      const results = Array.isArray(data.results) ? data.results : [];
      setResults(results);
      setNextPage(data.nextPage || null);
      setTotalResults(data.totalResults || results.length)
      setLoading(false);
      props.setProgress(100);
    } catch (error) {
      console.error("Initial fetch failed:", error.message);
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = `${capitalizeLetter(props.category)} - NewsBox`;
   fetchNews();
  }, [])
  

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

  const fetchMoreData = async () => {
    if (!nextPage) return;
    try {
      const url = `https://newsdata.io/api/1/latest?apikey=pub_e293c4a0a3994111acc2dfade6db3835&country=${props.country}&category=${props.category}&size=${props.size}&language=en&page=${nextPage}`;
      const response = await fetch(url);
      const data = await response.json();
      const moreResults = Array.isArray(data.results) ? data.results : [];
      setResults(results.concat(moreResults))
      setNextPage(data.nextPage || null)
      setPrevPages(prev => [...prev, data.nextPage]);
      setTotalResults(data.totalResults)
    } catch (error) {
      console.error("Fetching more data failed:", error.message);
      setError( error.message );
    }
  };

    return (
      <>
        <div className="container mt-4">
          <h3 className="text-center" style={{marginTop:'6%'}}>
            NewsBox : Top {capitalizeLetter(props.category)} Headlines
          </h3>
          {loading && <Spinner />}  {/* Initial Loader */}
          {/* Error Message */}
          {error && (
            <div className="alert alert-danger text-center mt-3">
              {error.includes("429")
                ? "Please wait and try again."
                : error}
            </div>
          )}
          {/* No Results */}
          {!loading && !error && results.length === 0 && (
              <div className="text-center mt-4">
                <p>No news found for the selected category.</p>
              </div>
            )}
           {/* Infinite Scroll only after data is fetched */}
          {!loading && results.length > 0 && (
            <InfiniteScroll
              dataLength={results.length}
              next={fetchMoreData}
              hasMore={nextPage !== null}
              loader={<Spinner />}>
            <div className="container">
              <div className="row">
                {results.map((element, index) => (
                  <div className="col-md-4 my-3" key={index}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 42) : ""}
                      description={ element.description ? element.description.slice(0, 100) : "" }
                      imageUrl={element.image_url}
                      newsUrl={element.link}
                      date={element.pubDate}
                    />
                  </div>
                ))}
              </div>
            </div>
          </InfiniteScroll>
          )}
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

 News.defaultProps = {
    country: "in",
    size: 5,
    category: "top",
  };

  News.propTypes = {
    country: PropTypes.string,
    size: PropTypes.number,
    category: PropTypes.string,
  };

export default News;
