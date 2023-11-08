import React, { Component } from 'react'
import NewsItem from './NewsItem'
import { Spinner } from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    articles = [];
    static defaultProps = {
        pageSize: 6,
        country: "in",
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    constructor(props) {
        super(props)
        this.state = {
            article: [],
            loading: false,
            page: 1,
            totalResults: 0,
            hasMore: true
        }
        console.log("It is constructor");
        document.title = `"Daily-Dose" - ${this.capitalize(this.props.category)}`;
    }
    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // articles = []

    UpdateNews = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.props.setProgress(10);
        this.setState({ loading: true });
        this.props.setProgress(30);
        let data = await fetch(url);
        let parsedData = await data.json();
        this.props.setProgress(70);
        console.log(parsedData.articles);
        this.setState({
            article: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
        this.props.setProgress(100);

    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData.articles);
        this.setState({
            article: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
    }


    handleNext = () => {
        // if(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)){
        // }
        // else{
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=79c14f59865041d28509aaf697d464a8&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        //     this.setState({loading:true});
        //     let data = await fetch(url);
        //     let parsedData= await data.json();
        //     this.setState({article:parsedData.articles})

        //     this.setState({
        //         page:this.state.page+1,
        //         article:parsedData.articles,
        //         loading:false
        //     })
        // }
        this.setState({ page: this.state.page + 1 });
        this.UpdateNews();
    }

    handlePrev = () => {
        this.setState({ page: this.state.page - 1 });
        this.UpdateNews();
    }

    fetchMoreData = async () => {
        if (this.state.article.length === this.state.totalResults) {
            this.setState({ hasMore: false });
        }
        else {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
            this.setState({ page: this.state.page + 1 });
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                article: this.state.article.concat(parsedData.articles),
                totalResults: parsedData.totalResults,
                loading: false
            });
        }
    };

    render() {
        return (
            <div className='container my-4' style={{padding:"50px 0"}}>
                <h2 className='text-center my-4'>Daily-Dose - Top Headlines from {this.capitalize(this.props.category)}</h2>
                {/* it is a shorthand for wether loading is true or false */}
                {this.state.loading && <Spinner />}



                <InfiniteScroll
                    dataLength={this.state.article.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.article.length !== this.state.totalResults}
                    loader={<h4>Loading...</h4>}
                >
                    <div className="container">

                        <div className="row">
                            {this.state.article.map((element) => {
                                return (
                                    <div className="col-md-4 my-3" key={element.url}>
                                        <NewsItem title={element.title ? element.title.slice(0, 50) : ""} description={element.description ? element.description.slice(0, 80) : ""} newsUrl={element.url} imgUrl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name} />
                                    </div>
                                );
                            })}

                        </div>
                    </div>
                </InfiniteScroll>

                {/* <div className="container d-flex justify-content-around">
            <button disabled={this.state.page<=1}  className="btn btn-dark" type='button' onClick={this.handlePrev}>&larr; Previous</button>
            <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type='button' className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
        </div> */}
            </div>
        )
    }
}

export default News