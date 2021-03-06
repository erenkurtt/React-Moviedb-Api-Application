import React, { Component } from 'react'
import axios from 'axios';
import Navbar from "./Components/Navbar";
import movies from "./movies";
import series from "./series";
//import $ from "jquery";


export default class App extends Component {

constructor(props){
  super(props);

  this.nextPageMovie = this.nextPageMovie.bind(this);
  this.nextPageSerie = this.nextPageSerie.bind(this);

  this.state={
    tableMovie: [],
    tableSerie: [],
    movieIds : movies,
    serieIds : series,
    pageNumb : 1,
    pageCount :0
  }
}

 

nextPageMovie= (e) => {

  
  var nextNumb = e.target.innerHTML;
  var numb = parseInt(nextNumb);
  console.log(nextNumb);
  var numbFirst = numb*10-10
  this.setState({
    tableMovie :[]
  });

  for(var i=numbFirst; i<10 *numb  +2 ; i++){
    axios.get('https://api.themoviedb.org/3/movie/'+ this.state.movieIds[i].id +'?api_key=ac99407995cec7c740f931e045bcb06b&language=en-us')
    .then(({data}) => {
      if(data != null && data.poster_path != null){
        this.setState( prevState => (
          {
            tableMovie : [...prevState.tableMovie , data],
            
          }
        )
        );
      }
      
    })
    
   }
}

nextPageSerie= (e) => {

  var nextNumb = e.target.innerHTML;
  var numb = parseInt(nextNumb);
  console.log(nextNumb);
  var numbFirst = numb*10-10
  this.setState({
    tableSerie : []
  });

  for(var i=numbFirst; i<10 *numb  +2  ; i++){
    axios.get('https://api.themoviedb.org/3/tv/'+ this.state.serieIds[i].id +'?api_key=ac99407995cec7c740f931e045bcb06b&language=en-us')
    .then(({data}) => {
      if(data != null && data.poster_path != null){
        this.setState( prevState => (
          {
            tableSerie : [...prevState.tableSerie , data],
            
          }
        )
        );
      }
      
    })
    
   }
}



componentDidMount() {
  
  for(var i=this.state.pageCount; i<10 *this.state.pageNumb +2 ; i++){
    axios.get('https://api.themoviedb.org/3/movie/'+ this.state.movieIds[i].id +'?api_key=ac99407995cec7c740f931e045bcb06b&language=en-us')
    .then(({data}) => {
      if(data != null){
        this.setState( prevState => (
          {
            tableMovie : [...prevState.tableMovie , data],
            
          }
        )
        );
      }
      console.log(data);
    })
    
   }

   
   for(var j=this.state.pageCount; j<=10 * this.state.pageNumb  +2 ; j++){
    axios.get('https://api.themoviedb.org/3/tv/'+ this.state.serieIds[j].id +'?api_key=ac99407995cec7c740f931e045bcb06b&language=en-us')
    .then(({data}) => {
      if(data != null && data.poster_path != null){
        this.setState( prevState => (
          {
            tableSerie : [...prevState.tableSerie , data]
          }
        )
        );
      }
      console.log(data);
    })
    
   }
   
  
}

  
  render() {
    
    
    return (
      
      <div>
        
        <Navbar nextPageMovie={this.nextPageMovie} nextPageSerie = {this.nextPageSerie}
        datasMovie={this.state.tableMovie} datasSerie={this.state.tableSerie}/>
        
                
       
      </div>
    )
  }
}

