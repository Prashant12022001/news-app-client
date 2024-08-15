import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'

export class News extends Component {
 
  constructor(){
    super();
    this.state ={
      articles:[],
      loading: false,
      page:1
    }
  }

  async componentDidMount(){
    let url = `https://news-app-server-gamma.vercel.app/api/v1/news-list`
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({articles: parsedData.newsList,totalResults: parsedData.newsList.length,loading : false})
  }
  handleNextClick = async ()=>{
    this.setState({
      page:this.state.page + 1
    })
  }

  handlePrevClick = async()=>{
    this.setState({
      page:this.state.page - 1
    })
  
  }

  getCurrentPageArticles = () => {
    const start = this.state.page * this.props.pageSize;
    const end = start + this.props.pageSize;
    return this.state.articles.slice(start, end);
}

  render() {
    const articlesToDisplay = this.getCurrentPageArticles()
    return (
      <div className='container my-3'>
        <h1 className='text-center'>News Monkey -Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className='row'>
          {!this.state.loading && articlesToDisplay.map((element,i)=>{
            return <div className='col-md-4 ' key={i} >
            <NewsItem title={element.title} description={element.description} imageUrl={element.imageUrl} newsUrl={element.url}></NewsItem>
          </div>
          })}
          

        </div>
        <div className="container d-flex justify-content-between">
          <button type='button' disabled={this.state.page<=1} className='btn btn-dark' onClick={this.handlePrevClick}>&larr; Previous</button>
          <button type='button' disabled={this.state.page>=(this.state.articles.length / this.props.pageSize) - 1} className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
      
    )
  }
}

export default News
