
import './App.css'
import {useEffect, useState} from 'react'



function App() {

  const MOCK_API_URL = 'https://64412ead792fe886a8a09b3d.mockapi.io/wk12API/Song'
  

  //place(state) to save song from our API
  const [songs, setSongs] = useState([{}])
  // console.log(songs); //shows songs before they have ever been updated
  

  //variables for holding new information in State
  const [newSongName, setNewSongName] = useState('')
  const [newSongArtist, setNewSongArtist] = useState('')
  const [newSongCompanyName, setNewSongCompanyName] = useState('')

  const [updatedName, setUpdatedName] = useState('')
  const[updatedSongArtist, setUpdatedSongArtist] = useState('')
  const[updatedCompanyName, setUpdatedCompanyName] = useState('')
  

  function getSongs(){
    fetch(MOCK_API_URL) //network call to get data from mockAPI
    .then(data=> data.json()) //takes the data and makes it readable in json
    // .then(data => console.log(data))
    .then(data => setSongs(data)) // setSongs to the response of that data(updates)
  }

  useEffect(() => {
    //gets the getSongs function whenever component re-renders
    getSongs()
    console.log(songs)
  }, []) // empty array will only run one time

 
  
  function deleteSong(id){
    fetch(`${MOCK_API_URL}/${id}`, {
      method: 'DELETE'
    }).then(() => getSongs()) // will trigger re-render (update songs after deleting song)
  }
  
  
  function postNewSong(e){
    e.preventDefault()


    let data = {
      //key value pairs
      name: newSongName, 
      artist: newSongArtist, 
      companyName: newSongCompanyName, 
    }

    fetch(MOCK_API_URL, {
      method: 'POST',
      headers: {"Content-Type": "application/json"}, //helps back-end read the data
      body: JSON.stringify(data), 

    }).then(() => getSongs())
  }


  function updateSong(e, songObject){
    e.preventDefault()

    //object variable that spreads out existing key value pairs, then updates name with whatever variables are input.
    let updatedSongObject = {
      ...songObject,
      name: updatedName, 
      artist: updatedSongArtist, 
      companyName: updatedCompanyName, 
    }

    fetch(`${MOCK_API_URL}/${songObject.id}`,{
      method: 'PUT',
      body: JSON.stringify({updatedSongObject}),
      headers: {"Content-Type": "application/json"}
    }).then(() => getSongs())
  }

  // connectin to the post & update methods
  return (
    <div className="Song-App">
      <form>
        <div className='song-form'>
            <h3>New Song Form</h3>
            <label>Song</label> <br/>
            <input onChange={(e) => setNewSongName(e.target.value)}></input> <br></br>
            {/* takes an event and setting updated name variable to equal that event */}
            <label>Artist</label> <br/>
            <input onChange={(e) => setNewSongArtist(e.target.value)}></input> <br></br>
            <label className='record-co'>Record Co.</label> <br></br>
            <input onChange={(e) => setNewSongCompanyName(e.target.value)}></input> 
            <button className='submit' onClick={(e) => postNewSong(e)}>Submit</button>
        </div>
      </form>
      
    
      {songs.map((song, index) => (
        <div key={index} className='userContainer'>
          <div className='song-list'>
              Name: {song.name} <br></br>
              Artist: {song.artist}<br></br>
              Record Company Name: {song.companyName}<br></br>
              <button onClick={() => deleteSong(song.id)}>Delete 🗑</button>
          </div> 
          <form>
            <div className='update-form'>
                <h3>Update This Song</h3>
                <label>Update Name of Song</label>
                <input onChange={(e) => setUpdatedName(e.target.value)}></input> <br></br>

                <label>Update Artist</label>
                <input onChange={(e) => setUpdatedSongArtist(e.target.value)}></input> <br></br>

                <label>Update Record Company Name</label>
                <input onChange={(e) => setUpdatedCompanyName(e.target.value)}></input> <br></br>

                <button onClick={(e) => updateSong(e, song)}>Update</button>
                
            </div>
          </form>
        </div>
      ))}
    </div>
  )
}

export default App