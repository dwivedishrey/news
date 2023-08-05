import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps={
    country:'in',
    pageSize:5,
    category:'general',
    
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }
  capitalize=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }
  constructor(props){
        super(props);
        this.state= {
            articles:[],
            loading:true,
            page:1,
            totalResults:0,
            }
        document.title=`${this.capitalize(this.props.category)}-News`;
                
        }
  async updateNews(){
    this.props.setProgress(10);
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data=await fetch(url);
    this.props.setProgress(30);
    let parsedData=await data.json();
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})
    this.props.setProgress(100);

  }
  async componentDidMount(){
    //let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3e0c7c3ab2e540949b3c4c17bc2c81b9&page=1&pageSize=${this.props.pageSize}`;
    //this.setState({loading:true});
    //let data=await fetch(url);
    //
    //let parsedData=await data.json();
    //console.log(parsedData);
    //this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})
    this.updateNews();
  }
  handlePrevClick=async ()=>{
   //et url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3e0c7c3ab2e540949b3c4c17bc2c81b9&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
   //his.setState({loading:true});
   //et data=await fetch(url);
   //
   //et parsedData=await data.json()
   //onsole.log(parsedData)
   //his.setState({
   //   articles:parsedData.articles,
   //   page:this.state.page-1,
   //   loading:false
   //)
   this.setState({page:this.state.page-1});
   this.updateNews();


  }
  handleNextClick=async ()=>{
  //f(!(this.state.page+1>Math.ceil(this.state.totalResults/20))){
  //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3e0c7c3ab2e540949b3c4c17bc2c81b9&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading:true});
  //   let data=await fetch(url);
  //   let parsedData=await data.json()
  //   
  //   this.setState({
  //       articles:parsedData.articles,
  //       page:this.state.page+1,
  //       loading:false,
  //   })
  //
  this.setState({page:this.state.page+1});
  this.updateNews();
  //
}
fetchMoreData =async () => {
   
   const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
   this.setState({page:this.state.page+1});
   let data= await fetch(url);

   let parsedData= await data.json();
   console.log(parsedData);
   this.setState({articles:this.state.articles.concat(parsedData.articles),totalResults:parsedData.totalResults,loading:false})
   
   
  };
  render() {
    return (
      <>
        <h1 className="text-center" style={{margin:'35px 0px', marginTop:'90px'}}>
        Top {this.capitalize(this.props.category)} Headlines
        </h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row mx-3">
        {this.state.articles.map((element)=>{
            return  <div className="col-md-4" key={element.url}>
            <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source}/>
            </div>
        }
        
        )}
        </div>
        </div>
        </InfiniteScroll>
        {/*<div className="container d-flex justify-content-between my-3">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark"onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
    </div>*/}
           
            
        
       
      </>
    )
  }
}

export default News
