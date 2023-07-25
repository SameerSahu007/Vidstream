import { useEffect, useState } from "react"
function App() {
    const [metadata, setMetadata] = useState([])
    const [curUrl, setCurrURL] = useState('')
    const fetchData = () => {
        fetch("http://localhost:8000/metadata")
            .then(response => {
                return response.json()
            })
            .then(data => {
                const vid = data.videos
                const randomVideo = vid[Math.floor(Math.random() * vid.length)];
                const vidUrl = new URL(`/videoplayer/${randomVideo.id}`, "http://localhost:8000")
                console.log(vidUrl)
                setCurrURL(vidUrl.href)
                setMetadata(data)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
        {/* {console.log(curUrl)} */}
        <video src={curUrl} width="1080px" controls></video>
        </>
    );
}


export default App

