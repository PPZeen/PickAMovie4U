import { useState } from "react";
import "./App.css";

import MovieCard  from "./movieCard";

const API_URL = "http://omdbapi.com?apikey=6786104e";

const App = () => {

  const [movies, setMovies] = useState([]);
  const [inputStatus, setInputStatus] = useState('First');
  const [trendPoint, setTrendPoint] = useState(0)

  const RandomVal = async (idS) => {
    let value = parseFloat(Math.random()*10).toFixed(1);
    let slider = document.getElementById(idS);
    let output = document.getElementById('O_'+idS);
    output.innerHTML = value.toString();

    slider.oninput = function() {output.innerHTML = value.toString();}
    document.getElementById(idS).value = value
  }

  const Slider = async (idS) => {
    var slider = document.getElementById(idS);
    var output = document.getElementById('O_'+idS);
    output.innerHTML = slider.value;

    slider.oninput = function() {output.innerHTML = this.value;}
  }


  const checkBox = async (idS) => {
    let count = 0
    let typeMovie = []
    if(document.getElementById("ch_Action").style.color === 'rgb(253, 110, 110)') {typeMovie.push("Action"); count++}
    if(document.getElementById("ch_War").style.color === 'rgb(253, 110, 110)') {typeMovie.push("War"); count++}
    if(document.getElementById("ch_Adventure").style.color === 'rgb(253, 110, 110)') {typeMovie.push("Adventure"); count++}
    if(document.getElementById("ch_Comedy").style.color === 'rgb(253, 110, 110)') {typeMovie.push("Comedy"); count++}
    if(document.getElementById("ch_Drama").style.color === 'rgb(253, 110, 110)') {typeMovie.push("Drama"); count++}
    if(document.getElementById("ch_Romance").style.color === 'rgb(253, 110, 110)') {typeMovie.push("Romance"); count++}
    if(document.getElementById("ch_SciFi").style.color === 'rgb(253, 110, 110)') {typeMovie.push("SciFi"); count++}
    if(document.getElementById("ch_Fantasy").style.color === 'rgb(253, 110, 110)') {typeMovie.push("Fantasy"); count++}
    if(document.getElementById("ch_Horror").style.color === 'rgb(253, 110, 110)') {typeMovie.push("Horror"); count++}
    if(document.getElementById("ch_Mystery").style.color === 'rgb(253, 110, 110)') {typeMovie.push("Mystery"); count++}
    if(document.getElementById("ch_Crime").style.color === 'rgb(253, 110, 110)') {typeMovie.push("Crime"); count++}
    if(document.getElementById("ch_Animation").style.color === 'rgb(253, 110, 110)') {typeMovie.push("Animation"); count++}
    if(document.getElementById("ch_Documentary").style.color === 'rgb(253, 110, 110)') {typeMovie.push("Documentary"); count++}

    if(count <= 2) {
      if (document.getElementById(idS).style.color !== 'rgb(253, 110, 110)' || document.getElementById(idS).style.color === 'white') {
        if(count < 2) {
          document.getElementById(idS).style.color = 'rgb(253, 110, 110)';
          count += 1;
          typeMovie.push(idS.slice(3))
          if(count === 2) {console.log(typeMovie); trend(typeMovie)}
        }
      } else {document.getElementById(idS).style.color = 'white'; count -= 1; setTrendPoint(0);}
    }

    console.log("count: ",count)
    console.log("trendPoint: ", trendPoint)
  }

  function multiply(a, b) {
    let aNumRows = a.length, aNumCols = a[0].length,
        /*bNumRows = b.length,*/ bNumCols = b[0].length,
        m = new Array(aNumRows);
    for (let r = 0; r < aNumRows; ++r) {
      m[r] = new Array(bNumCols);
      for (let c = 0; c < bNumCols; ++c) {
        m[r][c] = 0;
        for (let i = 0; i < aNumCols; ++i) {
          m[r][c] += a[r][i] * b[i][c];
        }
      }
    }
    return m;
  }

  const trend = async (typeMovie) => {
    const resDbPoint = await fetch("http://localhost:5000/points");
    const pointData = await resDbPoint.json();
    let c = 0
    let actB=0; let warB=0; let advB=0; let comB=0; let draB=0; let romB=0; let sciB=0;
    let fanB=0; let horB=0; let mysB=0; let criB=0; let aniB=0; let docB=0;

    for (let i in pointData) {
      c += 1;
      actB += pointData[i]["Action"]; warB += pointData[i]["War"]; advB += pointData[i]["Adventure"]
      comB += pointData[i]["Comedy"]; draB += pointData[i]["Drama"]; romB += pointData[i]["Romance"]
      sciB += pointData[i]["SciFi"]; fanB += pointData[i]["Fantasy"]; horB += pointData[i]["Horror"]
      mysB += pointData[i]["Mystery"]; criB += pointData[i]["Crime"]; aniB += pointData[i]["Animation"]
      docB += pointData[i]["Documentary"];
    }
    actB/=c; warB/=c; advB/=c; comB/=c; draB/=c; romB/=c; sciB/=c;
    fanB/=c; horB/=c; mysB/=c; criB/=c; aniB/=c; docB/=c;
    
    let array = []
    for (let i in pointData) {
      let arr = []
      arr.push((pointData[i]["Action"] - actB)); arr.push((pointData[i]["War"] - warB));
      arr.push((pointData[i]["Adventure"] - advB)); arr.push((pointData[i]["Comedy"] - comB));
      arr.push((pointData[i]["Drama"] - draB)); arr.push((pointData[i]["Romance"] - romB));
      arr.push((pointData[i]["SciFi"] - sciB)); arr.push((pointData[i]["Fantasy"] - fanB));
      arr.push((pointData[i]["Horror"] - horB)); arr.push((pointData[i]["Mystery"] - mysB));
      arr.push((pointData[i]["Crime"] - criB)); arr.push((pointData[i]["Animation"] - aniB));
      arr.push((pointData[i]["Documentary"] - docB));
      array.push(arr)
    }

    let output = array[0].map((_, colIndex) => array.map(row => row[colIndex]));
    array = multiply(output, array)

    for (let i in array){array[i] = array[i].map(x => x*(1/c))}
    let ans = {
      "Action": {
        "Action" :array[0][0], "War": array[0][1], "Adventure": array[0][2], "Comedy": array[0][3],
        "Drama" :array[0][4], "Romance": array[0][5], "SciFi": array[0][6], "Fantasy": array[0][7],
        "Horror" :array[0][8], "Mystery": array[0][9], "Crime": array[0][10], "Animation": array[0][11], "Documentary": array[0][12] 
      },
      "War": {
        "Action" :array[1][0], "War": array[1][1], "Adventure": array[1][2], "Comedy": array[1][3],
        "Drama" :array[1][4], "Romance": array[1][5], "SciFi": array[1][6], "Fantasy": array[1][7],
        "Horror" :array[1][8], "Mystery": array[1][9], "Crime": array[1][10], "Animation": array[1][11], "Documentary": array[1][12] 
      },
      "Adventure": {
        "Action" :array[2][0], "War": array[2][1], "Adventure": array[2][2], "Comedy": array[2][3],
        "Drama" :array[2][4], "Romance": array[2][5], "SciFi": array[2][6], "Fantasy": array[2][7],
        "Horror" :array[2][8], "Mystery": array[2][9], "Crime": array[2][10], "Animation": array[2][11], "Documentary": array[2][12] 
      },
      "Comedy": {
        "Action" :array[3][0], "War": array[3][1], "Adventure": array[3][2], "Comedy": array[3][3],
        "Drama" :array[3][4], "Romance": array[3][5], "SciFi": array[3][6], "Fantasy": array[3][7],
        "Horror" :array[3][8], "Mystery": array[3][9], "Crime": array[3][10], "Animation": array[3][11], "Documentary": array[3][12] 
      },
      "Drama": {
        "Action" :array[4][0], "War": array[4][1], "Adventure": array[4][2], "Comedy": array[4][3],
        "Drama" :array[4][4], "Romance": array[4][5], "SciFi": array[4][6], "Fantasy": array[4][7],
        "Horror" :array[4][8], "Mystery": array[4][9], "Crime": array[4][10], "Animation": array[4][11], "Documentary": array[4][12] 
      },
      "Romance": {
        "Action" :array[5][0], "War": array[5][1], "Adventure": array[5][2], "Comedy": array[5][3],
        "Drama" :array[5][4], "Romance": array[5][5], "SciFi": array[5][6], "Fantasy": array[5][7],
        "Horror" :array[5][8], "Mystery": array[5][9], "Crime": array[5][10], "Animation": array[5][11], "Documentary": array[5][12] 
      },
      "SciFi": {
        "Action" :array[6][0], "War": array[6][1], "Adventure": array[6][2], "Comedy": array[6][3],
        "Drama" :array[6][4], "Romance": array[6][5], "SciFi": array[6][6], "Fantasy": array[6][7],
        "Horror" :array[6][8], "Mystery": array[6][9], "Crime": array[6][10], "Animation": array[6][11], "Documentary": array[6][12] 
      },
      "Fantasy": {
        "Action" :array[7][0], "War": array[7][1], "Adventure": array[7][2], "Comedy": array[7][3],
        "Drama" :array[7][4], "Romance": array[7][5], "SciFi": array[7][6], "Fantasy": array[7][7],
        "Horror" :array[7][8], "Mystery": array[7][9], "Crime": array[7][10], "Animation": array[7][11], "Documentary": array[7][12] 
      },
      "Horror": {
        "Action" :array[8][0], "War": array[8][1], "Adventure": array[8][2], "Comedy": array[8][3],
        "Drama" :array[8][4], "Romance": array[8][5], "SciFi": array[8][6], "Fantasy": array[8][7],
        "Horror" :array[8][8], "Mystery": array[8][9], "Crime": array[8][10], "Animation": array[8][11], "Documentary": array[8][12] 
      },
      "Mystery": {
        "Action" :array[9][0], "War": array[9][1], "Adventure": array[9][2], "Comedy": array[9][3],
        "Drama" :array[9][4], "Romance": array[9][5], "SciFi": array[9][6], "Fantasy": array[9][7],
        "Horror" :array[9][8], "Mystery": array[9][9], "Crime": array[9][10], "Animation": array[9][11], "Documentary": array[9][12] 
      },
      "Crime": {
        "Action" :array[10][0], "War": array[10][1], "Adventure": array[10][2], "Comedy": array[10][3],
        "Drama" :array[10][4], "Romance": array[10][5], "SciFi": array[10][6], "Fantasy": array[10][7],
        "Horror" :array[10][8], "Mystery": array[10][9], "Crime": array[10][10], "Animation": array[10][11], "Documentary": array[10][12] 
      },
      "Animation": {
        "Action" :array[11][0], "War": array[11][1], "Adventure": array[11][2], "Comedy": array[11][3],
        "Drama" :array[11][4], "Romance": array[11][5], "SciFi": array[11][6], "Fantasy": array[11][7],
        "Horror" :array[11][8], "Mystery": array[11][9], "Crime": array[11][10], "Animation": array[11][11], "Documentary": array[11][12] 
      },
      "Documentary": {
        "Action" :array[12][0], "War": array[12][1], "Adventure": array[12][2], "Comedy": array[12][3],
        "Drama" :array[12][4], "Romance": array[12][5], "SciFi": array[12][6], "Fantasy": array[12][7],
        "Horror" :array[12][8], "Mystery": array[12][9], "Crime": array[12][10], "Animation": array[12][11], "Documentary": array[12][12] 
      }
    }
    console.log(array)
    console.log(ans)
    // console.log(typeMovie, ans[typeMovie[0]][typeMovie[1]])
    // trendPoint = ans[typeMovie[0]][typeMovie[1]]
    setTrendPoint(ans[typeMovie[0]][typeMovie[1]])
    
  }

  const searchMovies = async (Action,War,Adventure,Comedy,Drama,Romance,SciFi,Fantasy,Horror,Mystery,Crime,Animation,Documentary) => {
    
    fetch(`http://localhost:5000/movies/point/${Action.textContent}/${War.textContent}/${Adventure.textContent}/${Comedy.textContent}/${Drama.textContent}/${Romance.textContent}/${SciFi.textContent}/${Fantasy.textContent}/${Horror.textContent}/${Mystery.textContent}/${Crime.textContent}/${Animation.textContent}/${Documentary.textContent}`, {
      method: 'POST'
    })

    const calculate = async (Action,War,Adventure,Comedy,Drama,Romance,SciFi,Fantasy,Horror,Mystery,Crime,Animation,Documentary) => {
      const responseDb = await fetch("http://localhost:5000/movies");
      const moviesData = await responseDb.json();

      const pointInput = {
                          "Action": parseFloat(Action.textContent),
                          "War": parseFloat(War.textContent),
                          "Adventure": parseFloat(Adventure.textContent),
                          "Comedy": parseFloat(Comedy.textContent),
                          "Drama": parseFloat(Drama.textContent),
                          "Romance": parseFloat(Romance.textContent),
                          "SciFi": parseFloat(SciFi.textContent),
                          "Fantasy": parseFloat(Fantasy.textContent),
                          "Horror": parseFloat(Horror.textContent),
                          "Mystery": parseFloat(Mystery.textContent),
                          "Crime": parseFloat(Crime.textContent),
                          "Animation": parseFloat(Animation.textContent),
                          "Documentary": parseFloat(Documentary.textContent)
                         }

      const euclidean = (moviesData, pointInput) => {
        let mv = {}
        for (let i = 0; i < 150; i++) {
          let e = Math.sqrt(((moviesData[i]["Action"] - pointInput["Action"])**2) +
              ((moviesData[i]["War"] - pointInput["War"])**2) +
              ((moviesData[i]["Adventure"] - pointInput["Adventure"])**2) +
              ((moviesData[i]["Comedy"] - pointInput["Comedy"])**2) +
              ((moviesData[i]["Drama"] - pointInput["Drama"])**2) +
              ((moviesData[i]["Romance"] - pointInput["Romance"])**2) +
              ((moviesData[i]["SciFi"] - pointInput["SciFi"])**2) +
              ((moviesData[i]["Fantasy"] - pointInput["Fantasy"])**2) +
              ((moviesData[i]["Horror"] - pointInput["Horror"])**2) +
              ((moviesData[i]["Mystery"] - pointInput["Mystery"])**2) +
              ((moviesData[i]["Crime"] - pointInput["Crime"])**2) +
              ((moviesData[i]["Animation"] - pointInput["Animation"])**2) +
              ((moviesData[i]["Documentary"] - pointInput["Documentary"])**2))

          mv = Object.assign(mv,{[e]:moviesData[i]["Title"]})
        }
        let index = Object.keys(mv).sort()
        return [mv[index[0]], mv[index[1]], mv[index[2]]]
      }

      const pearson = (moviesData, pointInput) => {
        for (let key in pointInput) {if (pointInput[key] === 0) {delete pointInput[key]}}

        let mv = {}
        for (let i = 0; i < 150; i++) {
          let mvD = {"Title": moviesData[i]["Title"]}
          for (let key in pointInput) {if (moviesData[i][key] !== 0){mvD = Object.assign(mvD,{[key]:moviesData[i][key]})}}

          if (Object.keys(mvD).length - 2 !== 0) {

            let vbar = 0; let ubar = 0; let n = 0
            for (let key in mvD){if (key !== "Title"){ vbar += mvD[key]; ubar+= pointInput[key]; n++;}}
            vbar /= n
            ubar /= n

            let over = 0; let underU = 0; let underV = 0;
            for (let key in mvD) {
              if (key !== "Title") {
                over += ((pointInput[key]-ubar)*(mvD[key]-vbar))
                underU += ((pointInput[key]-ubar)**2)
                underV += ((mvD[key]-vbar)**2)
              }
            }
            let pea = over/((Math.sqrt(underU)*Math.sqrt(underV)))
            mv = {...mv, [pea]:mvD["Title"]}
          }
        }
        let index = Object.keys(mv).sort()
        console.log(index)
        return [mv[index[index.length-3]], mv[index[index.length-4]], mv[index[index.length-5]]]
      }
      
      let m1 = euclidean(moviesData, pointInput);
      let m2 = pearson(moviesData, pointInput);
      
      let arrr = []
      for (let key in pointInput) {if (pointInput[key] !== 0) {arrr.push(key)}}
      console.log("Type: ", arrr)
      console.log("Movies result: ", m1, m2)
      
      return m1.concat(m2)
    }

    const titles = calculate(Action,War,Adventure,Comedy,Drama,Romance,SciFi,Fantasy,Horror,Mystery,Crime,Animation,Documentary)
    
    titles.then(async function(result) {
      let check = []
      let movieList = []
      for (let i in result){
        if ((result[i] !== undefined) && (!check.includes(result[i]))) {
          check.push(result[i])
          const response = await fetch(`${API_URL}&s=${result[i]}`);
          const resMovie = await fetch("http://localhost:5000/movies/"+result[i]);
          const movieData = await resMovie.json();
          console.log(movieData);
          let data = await response.json();
          data = data.Search[0]
          try {
            data = Object.assign(data,{"Synopsis":movieData["movie"]["Synopsis"]})
          }catch (err){console.log(movieData["movie"], "Error Synopsis")}
          try {
            data = Object.assign(data,{"Rate":movieData["movie"]["Rate"]})
          }catch (err){console.log(movieData["movie"], "Error Rate")}
          movieList = movieList.concat([data]);
        }
      }
      console.log(movieList);
      setMovies(movieList);
    })
  }

  return (
    <div className="App">
      <div className="bg-img">
        {
          inputStatus === 'First'
          ? (
            
            <div className="bg-text">
              Let's me pickamovie4U
              <button className="bg-button" onClick={() => {setInputStatus('Input')}}>Get Start</button>
            </div>
          ) : (
              inputStatus === 'Input'
              ? (
                <div className="bg-input">
                  Film genres
                  <div className="range">
                  <h2 id="ch_Action" onClick={() => {checkBox("ch_Action")}}>Action</h2>
                    <input type="range" min="0" max="10" id="Action" step="0.1" defaultValue="0" onChange = {(e) => Slider(e.target.id)}/>
                    <span id="O_Action">0</span>
                  </div>

                  <div className="range">
                    <h2 id="ch_War" onClick={() => {checkBox("ch_War")}}>War</h2>
                    <input type="range" min="0" max="10" id="War" step="0.1" defaultValue="0" onChange = {(e) => Slider(e.target.id)}/>
                    <span id="O_War">0</span>
                  </div>

                  <div className="range">
                    <h2 id="ch_Adventure" onClick={() => {checkBox("ch_Adventure")}}>Adventure</h2>
                    <input type="range" min="0" max="10" id="Adventure" step="0.1" defaultValue="0" onChange = {(e) => Slider(e.target.id)}/>
                    <span id="O_Adventure">0</span>
                  </div>

                  <div className="range">
                    <h2 id="ch_Comedy" onClick={() => {checkBox("ch_Comedy")}}>Comedy</h2>
                    <input type="range" min="0" max="10" id="Comedy" step="0.1" defaultValue="0" onChange = {(e) => Slider(e.target.id)}/>
                    <span id="O_Comedy">0</span>
                  </div>

                  <div className="range">
                    <h2 id="ch_Drama" onClick={() => {checkBox("ch_Drama")}}>Drama</h2>
                    <input type="range" min="0" max="10" id="Drama" step="0.1" defaultValue="0" onChange = {(e) => Slider(e.target.id)}/>
                    <span id="O_Drama">0</span>
                  </div>

                  <div className="range">
                    <h2 id="ch_Romance" onClick={() => {checkBox("ch_Romance")}}>Romance</h2>
                    <input type="range" min="0" max="10" id="Romance" step="0.1" defaultValue="0" onChange = {(e) => Slider(e.target.id)}/>
                    <span id="O_Romance">0</span>
                  </div>

                  <div className="range">
                    <h2 id="ch_SciFi" onClick={() => {checkBox("ch_SciFi")}}>Sci-Fi</h2>
                    <input type="range" min="0" max="10" id="Sci-Fi" step="0.1" defaultValue="0" onChange = {(e) => Slider(e.target.id)}/>
                    <span id="O_Sci-Fi">0</span>
                  </div>

                  <div className="range">
                    <h2 id="ch_Fantasy" onClick={() => {checkBox("ch_Fantasy")}}>Fantasy</h2>
                    <input type="range" min="0" max="10" id="Fantasy" step="0.1" defaultValue="0" onChange = {(e) => Slider(e.target.id)}/>
                    <span id="O_Fantasy">0</span>
                  </div>

                  <div className="range">
                    <h2 id="ch_Horror" onClick={() => {checkBox("ch_Horror")}}>Horror</h2>
                    <input type="range" min="0" max="10" id="Horror" step="0.1" defaultValue="0" onChange = {(e) => Slider(e.target.id)}/>
                    <span id="O_Horror">0</span>
                  </div>

                  <div className="range">
                    <h2 id="ch_Mystery" onClick={() => {checkBox("ch_Mystery")}}>Mystery</h2>
                    <input type="range" min="0" max="10" id="Mystery" step="0.1" defaultValue="0" onChange = {(e) => Slider(e.target.id)}/>
                    <span id="O_Mystery">0</span>
                  </div>

                  <div className="range">
                    <h2 id="ch_Crime" onClick={() => {checkBox("ch_Crime")}}>Crime</h2>
                    <input type="range" min="0" max="10" id="Crime" step="0.1" defaultValue="0" onChange = {(e) => Slider(e.target.id)}/>
                    <span id="O_Crime">0</span>
                  </div>

                  <div className="range">
                    <h2 id="ch_Animation" onClick={() => {checkBox("ch_Animation")}}>Animation</h2>
                    <input type="range" min="0" max="10" id="Animation" step="0.1" defaultValue="0" onChange = {(e) => Slider(e.target.id)}/>
                    <span id="O_Animation">0</span>
                  </div>

                  <div className="range">
                    <h2 id="ch_Documentary" onClick={() => {checkBox("ch_Documentary")}}>Documentary</h2>
                    <input type="range" min="0" max="10" id="Documentary" step="0.1" defaultValue="0" onChange = {(e) => Slider(e.target.id)}/>
                    <span id="O_Documentary">0</span>
                  </div>

                  <button className="input-button" onClick={() => {
                    RandomVal("Action"); RandomVal("War"); RandomVal("Adventure"); RandomVal("Comedy");
                    RandomVal("Drama"); RandomVal("Romance"); RandomVal("Sci-Fi"); RandomVal("Fantasy");
                    RandomVal("Horror"); RandomVal("Mystery"); RandomVal("Crime"); RandomVal("Animation"); RandomVal("Documentary");
                  }}>Random</button>

                  <button className="input-button" onClick={() => {
                      searchMovies(document.getElementById("O_Action"), document.getElementById("O_War"), document.getElementById("O_Adventure"),
                                document.getElementById("O_Comedy"), document.getElementById("O_Drama"), document.getElementById("O_Romance"),
                                document.getElementById("O_Sci-Fi"), document.getElementById("O_Fantasy"), document.getElementById("O_Horror"),
                                document.getElementById("O_Mystery"), document.getElementById("O_Crime"), document.getElementById("O_Animation"), document.getElementById("O_Documentary"))
                      setInputStatus('Search')
                      }
                    }>Search
                  </button>
                  {
                    trendPoint === 0 ? console.log("Trend 0") : (trendPoint > 0 ? <div className="arrow"></div>: <div className="rearrow"></div>)
                  }
                </div>
              ) : (
                <div>
                  <button className="home-button" onClick={() => {setInputStatus("Input"); setMovies([]); setTrendPoint(0)}}>Home</button>
                  {
                    movies?.length > 0
                      ? (
                        <div className="container">
                          {movies.map((movie) => (
                            <MovieCard movie={movie}/>
                          ))}
                        </div>
                      ) : (
                        <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>                        
                      )
                  }
                </div>
            )
          )
        }
      </div>
    </div>
  )
};

export default App;
