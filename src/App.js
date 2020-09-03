import React from "react";
import axios from "axios";
import Movie from "./Movie"
import "./App.css"
class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };
  getMovies = async () => {
    const {
      data: {
        data: { movies }
      }
    } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    this.setState({ movies, isLoading: false }); //url에 있는 무비 다 가져옴
    console.log(movies);
  }
  componentDidMount() {
    this.getMovies(); 

  }

  render() {
    const { isLoading, movies } = this.state;
    return( 
    <section className="container"> 
      {isLoading ? ( //로딩중이면 isLoading이 true니까 "Loading" 띄우고
      <div className="loader">
        <span className="loader__text">Loading...</span>
      </div>
      ): ( //다 끝나서 componentDidMount가 실행되서 setState통해 isLoading이 false로 바뀌면
    <div className="movies">
      {movies.map(movie => ( //Movie 컴포넌트 실행
        <Movie 
        key={movie.id}
        id={movie.id} 
        year={movie.year} 
        title={movie.title} 
        summary={movie.summary} 
        poster={movie.medium_cover_image} 
        genres={movie.genres}
      />

    ))}
    </div>
    )}
  </section>
  );
  }
}
export default App;
