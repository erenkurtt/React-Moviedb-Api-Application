import React, { Component } from 'react'
import './navbar.css'
import movies from "../movies";
import series from "../series";
import $ from "jquery";
import axios from "axios";
import linkedin from "./linkedin.png";
import github from "./github.png";
import mail from "./mail.png";



export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.newBtnNumbersLeft = this.newBtnNumbersLeft.bind(this);
        this.newBtnNumbersRight = this.newBtnNumbersRight.bind(this);
        this.detailedInfoMovie =this.detailedInfoMovie.bind(this);
        this.closeDetailed = this.closeDetailed.bind(this);
        this.detailedInfoSerie =this.detailedInfoSerie.bind(this);
        this.isMovieorSerieSearched = this.isMovieorSerieSearched.bind(this);

        this.state = {
            isMovie: {
                display: "none",
                hide: true
            },
            isSerie: {
                display: "none",
                hide: true
            },
            mainpage: {
                display: "block",
                hide: false
            },
            isSearched: {
                display: "none",
                hide: true
            },
            tableMovie: this.props.datasMovie,
            tableSerie: this.props.datasSerie,
            searched: [],
            results: [],
            statusSearch: 1,
            detailedMovie : {
                imgsrc : null,
                name : null,
                date : null,
                minute : null,
                genre : [],
                overview : null,
                score: null,
            },
            detailedSerie : {
                imgsrc : null,
                name : null,
                SE : null,
                date : null,
                genre : [],
                overview : null,
                score: null,
            }

        }
    }

    mainPage = () => {
        $(".searchbar").css('display','none');
        this.setState(
            {
                isMovie: {
                    display: "none",
                    hide: true
                },
                isSerie: {

                    display: "none",
                    hide: true
                },
                mainpage: {
                    display: "block",
                    hide: false
                },
                isSearched: {
                    display: "none",
                    hide: true
                }
            }
        );
    }

    getMovies = () => {
        $(".searchbar").css('display','block');
        $('#find').attr('placeholder', 'Search in Movies');
        this.setState(
            {
                isMovie: {
                    display: "block",
                    hide: false
                },
                isSerie: {

                    display: "none",
                    hide: true
                },
                mainpage: {
                    display: "none",
                    hide: true
                },
                isSearched: {
                    display: "none",
                    hide: true
                }
            }
        );




    }
    getSeries = () => {
        $(".searchbar").css('display','block');
        $('#find').attr('placeholder', 'Search in Series');
        this.setState(
            {
                isMovie: {
                    display: "none",
                    hide: true
                },
                isSerie: {
                    display: "block",
                    hide: false
                },
                mainpage: {
                    display: "none",
                    hide: true
                },
                isSearched: {
                    display: "none",
                    hide: true
                }
            }
        );

    }
    getSearched = () => {
        $(".searchbar").css('display','block');
        this.setState(
            {
                isMovie: {
                    display: "none",
                    hide: true
                },
                isSerie: {
                    display: "none",
                    hide: true
                },
                mainpage: {
                    display: "none",
                    hide: true
                },
                isSearched: {
                    display: "block",
                    hide: false
                }
            }
        );
    }


    search = (e) => {

        var str = document.getElementById("find").value + "";
        document.getElementById("find").value = "";
        str = str.toLowerCase();
        var temp;
        var resultIds = [];
        
        if (str !== "") {
            this.setState({
                searched: []
            });
            if (this.state.isMovie.hide === false) {
                this.setState({ statusSearch: 1 });
                movies.forEach(val => {
                    temp = val.original_title.toLowerCase();
                    if (temp.includes(str)) {

                        resultIds.push(val);
                    }
                });
                resultIds.forEach(data => {
                    axios.get('https://api.themoviedb.org/3/movie/' + data.id + '?api_key=ac99407995cec7c740f931e045bcb06b&language=en-us')
                        .then(({ data }) => {
                            if (data != null && data.poster_path != null) {
                                this.setState(prevState => (
                                    {
                                        searched: [...prevState.searched, data]
                                    }
                                )
                                );
                            }
                            
                        });
                });
                
            }
            else {
                this.setState({ statusSearch: 2 });
                series.forEach(val => {
                    temp = val.original_name.toLowerCase();
                    if (temp.includes(str)) {
                        
                        resultIds.push(val);
                    }
                });
                

                resultIds.forEach(data => {
                    axios.get('https://api.themoviedb.org/3/tv/' + data.id + '?api_key=ac99407995cec7c740f931e045bcb06b&language=en-us')
                        .then(({ data }) => {
                            if (data != null && data.poster_path != null) {
                                this.setState(prevState => (
                                    {
                                        searched: [...prevState.searched, data]
                                    }
                                )
                                );
                            }
                            
                        });
                });
            }

            

            this.getSearched();
        }
        



    }


    newBtnNumbersRight = () => {

        if (this.state.isMovie.hide) {
            for (var i = 0; i < 6; i++) {
                var inner = document.getElementsByClassName("ordered-btn-serie")[i].innerHTML;

                var newInner = parseInt(inner) + 6;
                document.getElementsByClassName("ordered-btn-serie")[i].innerHTML = "" + newInner;

            }
        }
        else {
            for (i = 0; i < 6; i++) {
                var innerS = document.getElementsByClassName("ordered-btn-movie")[i].innerHTML;

                var newInnerS = parseInt(innerS) + 6;
                document.getElementsByClassName("ordered-btn-movie")[i].innerHTML = "" + newInnerS;

            }
        }


    }
    newBtnNumbersLeft = () => {
        if (this.state.isMovie.hide) {
            if (document.getElementsByClassName("ordered-btn-serie")[0].innerHTML >= 6)
                for (var i = 0; i < 6; i++) {
                    var inner = document.getElementsByClassName("ordered-btn-serie")[i].innerHTML;
                    var newInner = parseInt(inner) - 6;
                    document.getElementsByClassName("ordered-btn-serie")[i].innerHTML = "" + newInner;

                }
        }
        else {
            if (document.getElementsByClassName("ordered-btn-movie")[0].innerHTML >= 6)
                for (i = 0; i < 6; i++) {
                    var innerS = document.getElementsByClassName("ordered-btn-movie")[i].innerHTML;
                    var newInnerS = parseInt(innerS) - 6;
                    document.getElementsByClassName("ordered-btn-movie")[i].innerHTML = "" + newInnerS;

                }
        }


    }

    detailedInfoMovie =(e) => 
    {
        var shortDate;
        this.setState({
            detailedMovie : {
                imgsrc : null,
                name : null,
                date : null,
                minute : null,
                genre : [],
                overview : null,
                score: null,
            }
        });
        var itemId = e.target.parentNode.querySelector('span').innerHTML;
        var img = "https://image.tmdb.org/t/p/w500/";
        axios.get('https://api.themoviedb.org/3/movie/' + itemId + '?api_key=ac99407995cec7c740f931e045bcb06b&language=en-us')
                        .then(({ data }) => {
                            shortDate = data.release_date.slice(0,4);
                            console.log(shortDate);
                            this.setState({
                                detailedMovie : {
                                    imgsrc : img + data.poster_path,
                                    name : data.original_title,
                                    date : shortDate,
                                    minute : data.runtime,
                                    genre : data.genres,
                                    overview : data.overview,
                                    score: data.vote_average,
                                }
                            });
                            
                        });
        $(".detailed-movie").css("visibility","visible");
            
    }

    detailedInfoSerie =(e) =>
    {
        var firstDate;
        var lastDate;
        this.setState({
            detailedSerie : {
                imgsrc : null,
                name : null,
                SE : null,
                date : null,
                genre : [],
                overview : null,
                score: null,
            }
        });
        var itemId = e.target.parentNode.querySelector('span').innerHTML;
        var img = "https://image.tmdb.org/t/p/w500/";
        axios.get('https://api.themoviedb.org/3/tv/' + itemId + '?api_key=ac99407995cec7c740f931e045bcb06b&language=en-us')
                        .then(({ data }) => {
                            firstDate =data.first_air_date.slice(0,4);
                            lastDate = data.last_air_date.slice(0,4);
                            this.setState({
                                detailedSerie : {
                                    imgsrc : img + data.poster_path,
                                    name : data.original_name,
                                    SE : data.number_of_seasons +"S " + data.number_of_episodes+"E",
                                    date : firstDate +" - "+ lastDate ,
                                    genre : data.genres,
                                    overview : data.overview,
                                    score: data.vote_average,
                                }
                            });
                            
                        });
        $(".detailed-serie").css("visibility","visible");

    }

    closeDetailed (){
        $(".detailed-movie").css("visibility","hidden");
        $(".detailed-serie").css("visibility","hidden");
    }

    isMovieorSerieSearched =(e) =>{
        if(this.state.statusSearch === 1){
            this.detailedInfoMovie(e);
        }
        else{
            this.detailedInfoSerie(e);
        }
    }

    render() {
        return (

            <div>

                <ul className="nav">
                    <li><button  onClick={this.mainPage} >Main Page </button></li>
                    <li><button  onClick={this.getMovies} >Movies </button></li>
                    <li><button  onClick={this.getSeries}>Tv shows</button></li>

                </ul>

                <div  className="mainmenu" style={this.state.mainpage}>

                    <h1>Welcome to movie database application</h1>
                    <h2>This application have developed with React.js and Jquery by Eren Kurt.</h2>
                    
                    <div className ="menu">
                    <a href="https://www.linkedin.com/in/eren-kurt/" target={"_blank"}> <img src={linkedin} alt="linkedin"  /> </a>
                    <a href="https://github.com/erenkurtt" target={"_blank"}><img src={github}  alt="github"  /></a>
                    <a href = "mailto: eren-kurt@outlook.com"><img src={mail} alt="mail"  /></a>
                    </div>

                </div>

                <div className="searchbar">
                    <h1>Explore thousands of movie and tv shows.</h1>
                    <div className="inputbar">
                        <input id="find" ></input>
                        <i className="fas fa-search" i onClick={this.search.bind(this)} ></i>
                    </div>
                    
                </div>

                <div className="detailed-movie" >
                    <div className ="col-1">
                        <img src ={this.state.detailedMovie.imgsrc} alt="movie"/>
                    </div>
                    
                    <div className ="col-2">
                        <h1>{this.state.detailedMovie.name}</h1>
                        
                            <span>{this.state.detailedMovie.date} </span>
                            <span>{this.state.detailedMovie.genre.map(x => x.name+"  " )}</span>
                            <span>{this.state.detailedMovie.minute} min</span>
                        
                        <p className="parafDetailed">{this.state.detailedMovie.overview}</p>
                        <h4>Score: {this.state.detailedMovie.score}</h4>
                        
                    </div>
                    <i className="fas fa-window-close close" onClick={this.closeDetailed}></i>
                </div>

                <div className="detailed-serie" >
                
                    <div className ="col-1">
                        <img src ={this.state.detailedSerie.imgsrc} alt="serie"></img>
                    </div>
                    <div className ="col-2">
                    
                        <h1>{this.state.detailedSerie.name}</h1>
                        
                            <span>{this.state.detailedSerie.SE}</span>
                            <span>{this.state.detailedSerie.genre.map(x => x.name+"  " )}</span>
                            <span>{this.state.detailedSerie.date}</span>
                                                
                        <p className="parafDetailed">{this.state.detailedSerie.overview}</p>
                        <h4>Score: {this.state.detailedSerie.score}</h4>
                        
                        
                    </div>
                    <i className="fas fa-window-close close" onClick={this.closeDetailed}></i>
                </div>
                
               

                <div className="main">
                    {this.state.searched.map((data) => (<div className="catalog" style={this.state.isSearched}
                    onClick={this.isMovieorSerieSearched} key={data.id}   ><span style={{display:'none'}}>{data.id}</span>
                        <img src={"https://image.tmdb.org/t/p/w500/" + data.poster_path} alt="pic" /> <h3> 
                        {this.state.statusSearch === 1 ? data.original_title : data.original_name}  </h3>
                        <p>{data.genres.map((x) => x.name + " ")}</p> </div>))}

                    {this.props.datasMovie.map((item) => (<div className="catalog" style={this.state.isMovie} key={item.id} onClick={this.detailedInfoMovie}>
                    
                         <img src={"https://image.tmdb.org/t/p/w500/" + item.poster_path} alt="movie"></img> <span style={{display:'none'}}>{item.id}</span>
                        <h3  > {item.original_title} </h3>  <p> {item.genres.map((x) => x.name + " ")}</p> </div>))}

                    {this.props.datasSerie.map((item) => (<div className="catalog" style={this.state.isSerie}  key={item.id} onClick={this.detailedInfoSerie}>
                         <img src={"https://image.tmdb.org/t/p/w500/" + item.poster_path} alt="serie"></img>
                        <h3> {item.original_name}  </h3>  <span style={{display:'none'}}>{item.id}</span>  <p> {item.genres.map((x) => x.name + " ")} </p>  </div>))}
                </div>

                   <div style={this.state.isMovie}  className="counters">
                    <button className="counter-main-left" onClick={this.newBtnNumbersLeft}>BACK</button>
                    <button className="ordered-btn-movie counter-elements" onClick={this.props.nextPageMovie}>1</button>
                    <button className="ordered-btn-movie counter-elements" onClick={this.props.nextPageMovie}>2</button>
                    <button className="ordered-btn-movie counter-elements" onClick={this.props.nextPageMovie}>3</button>
                    <button className="ordered-btn-movie counter-elements" onClick={this.props.nextPageMovie}>4</button>
                    <button className="ordered-btn-movie counter-elements" onClick={this.props.nextPageMovie}>5</button>
                    <button className="ordered-btn-movie counter-elements" onClick={this.props.nextPageMovie}>6</button>
                    <button className="counter-main-right" onClick={this.newBtnNumbersRight}>NEXT</button>
                    </div>
                

                <div style={this.state.isSerie} className="counters" >
                    <button className="counter-main-left" onClick={this.newBtnNumbersLeft}>BACK</button>
                    <button className="ordered-btn-serie counter-elements" onClick={this.props.nextPageSerie}>1</button>
                    <button className="ordered-btn-serie counter-elements" onClick={this.props.nextPageSerie}>2</button>
                    <button className="ordered-btn-serie counter-elements" onClick={this.props.nextPageSerie}>3</button>
                    <button className="ordered-btn-serie counter-elements" onClick={this.props.nextPageSerie}>4</button>
                    <button className="ordered-btn-serie counter-elements" onClick={this.props.nextPageSerie}>5</button>
                    <button className="ordered-btn-serie counter-elements" onClick={this.props.nextPageSerie}>6</button>
                    <button className="counter-main-right" onClick={this.newBtnNumbersRight}>NEXT</button>
                </div>
                


            </div>
        )
    }
}
