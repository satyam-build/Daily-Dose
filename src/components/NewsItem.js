import React, { Component } from 'react'
// import PropTypes from 'prop-types';
export class NewsItem extends Component {
    
  render() {
   let  {title,description,imgUrl,newsUrl,author,date,source} = this.props;
    return (
      <div className="my3 mx3">
        <div className="card" >
          <div  style={{display:"flex",justifyContent:"flex-end",position:"absolute",right:0}}>
        <span className="p-2 bg-danger badge rounded-pill">
        {source}
        </span>        
          </div>
        <img src={!imgUrl?"https://images.cnbctv18.com/wp-content/uploads/2023/06/Untitled-design-13-1019x573.png":imgUrl} style={{height:"180px"}} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text"><small className="text-body-secondary">{author?author:"Unkown"}</small></p>
          <p className="card-text">{description}...</p>
          <p className="card-text"><small className="text-body-secondary">Published on {new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-sm btn-primary">Read More ...</a>
        </div>
      </div>
      </div>
    )
  } 
}

export default NewsItem;